import type { AppState } from '../types';
import { decompressState, compressState } from './urlState';

export interface SavedScenario {
  id: string;
  name: string;
  timestamp: number;
  data: Partial<AppState>;
}

const STORAGE_KEY = 'propertyLens_scenarios_v1';

export const ScenarioManager = {
  getAll(): SavedScenario[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading scenarios", e);
      return [];
    }
  },

  save(name: string, currentState: AppState): SavedScenario {
    const scenarios = this.getAll();
    const newScenario: SavedScenario = {
      id: `scenario_${Date.now()}`,
      name,
      timestamp: Date.now(),
      // We don't save functions, but state might have functions attached if not careful
      data: JSON.parse(JSON.stringify(currentState))
    };
    
    // Clean up functions just in case
    delete (newScenario.data as any).updateState;
    delete (newScenario.data as any).resetState;

    scenarios.push(newScenario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
    return newScenario;
  },

  delete(id: string) {
    let scenarios = this.getAll();
    scenarios = scenarios.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
  },

  exportToCsv() {
    const scenarios = this.getAll();
    if (scenarios.length === 0) return;

    // Build headers from first scenario
    const headers = ['Scenario Name', 'Date Saved', ...Object.keys(scenarios[0].data)];
    
    const csvRows = scenarios.map(s => {
      const row = [
        `"${s.name}"`,
        `"${new Date(s.timestamp).toLocaleDateString()}"`
      ];
      Object.values(s.data).forEach(val => {
        let strVal = "";
        if (typeof val === 'object') {
          strVal = JSON.stringify(val).replace(/"/g, '""');
        } else {
          strVal = String(val).replace(/"/g, '""');
        }
        row.push(`"${strVal}"`);
      });
      return row.join(',');
    });

    const csvString = [headers.join(','), ...csvRows].join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "property_lens_scenarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
