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

  exportToJson() {
    const scenarios = this.getAll();
    if (scenarios.length === 0) return;
    const blob = new Blob([JSON.stringify(scenarios, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "property_lens_backup.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  importFromJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        const existing = this.getAll();
        const merged = [...existing, ...parsed];
        // simple dedupe by id
        const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
        return true;
      }
      return false;
    } catch(e) {
      console.error("Failed to parse JSON backup", e);
      return false;
    }
  }
};
