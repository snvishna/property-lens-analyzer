import * as React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ScenarioManager, type SavedScenario } from '../../lib/scenarioManager';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X, Download, Trash2, FolderOpen } from 'lucide-react';

interface ScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScenariosModal({ isOpen, onClose }: ScenariosModalProps) {
  const [scenarios, setScenarios] = React.useState<SavedScenario[]>([]);
  const [newScenarioName, setNewScenarioName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  
  const appState = useAppStore();

  React.useEffect(() => {
    if (isOpen) {
      const allScenarios = ScenarioManager.getAll();
      setScenarios(allScenarios);
      // Auto-select all on open
      setSelectedIds(new Set(allScenarios.map(s => s.id)));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!newScenarioName.trim()) return;
    ScenarioManager.save(newScenarioName, appState);
    const updated = ScenarioManager.getAll();
    setScenarios(updated);
    
    // Select the newly added scenario automatically
    const newId = updated[0]?.id; // Assuming save unshifts to top
    if (newId) {
      setSelectedIds(prev => new Set([...prev, newId]));
    }
    
    setNewScenarioName('');
    setIsSaving(false);
  };

  const handleLoad = (scenario: SavedScenario) => {
    if (confirm(`Load scenario "${scenario.name}"? This will overwrite your current inputs.`)) {
      appState.updateState(scenario.data);
      onClose();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this scenario?')) {
      ScenarioManager.delete(id);
      setScenarios(ScenarioManager.getAll());
      const next = new Set(selectedIds);
      next.delete(id);
      setSelectedIds(next);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(scenarios.map(s => s.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (ScenarioManager.importFromJson(result)) {
        const updated = ScenarioManager.getAll();
        setScenarios(updated);
        setSelectedIds(new Set(updated.map(s => s.id)));
      } else {
        alert("Failed to parse backup file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Scenarios & Exports</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-500 mb-6">
            Scenarios are saved to your browser's local storage.
          </p>

          <div className="mb-8">
            {isSaving ? (
              <div className="flex gap-2">
                <Input 
                  placeholder="Scenario Name..." 
                  value={newScenarioName} 
                  onChange={(e) => setNewScenarioName(e.target.value)}
                  autoFocus
                />
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setIsSaving(false)}>Cancel</Button>
              </div>
            ) : (
              <Button onClick={() => setIsSaving(true)} className="w-full">
                Save Current as New Scenario
              </Button>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800">Saved Scenarios</h3>
              {scenarios.length > 0 && (
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    checked={scenarios.length > 0 && selectedIds.size === scenarios.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  Select All
                </label>
              )}
            </div>
            
            {scenarios.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No saved scenarios yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {scenarios.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg group hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        checked={selectedIds.has(s.id)}
                        onChange={() => toggleSelect(s.id)}
                      />
                      <div>
                        <p className="font-medium text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleLoad(s)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Load Scenario"
                      >
                        <FolderOpen className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Scenario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col gap-6">
          
          <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
            Backup <span className="text-slate-500 font-normal cursor-help bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center text-[11px]" title="Export/Import all your scenarios as a JSON file backup">?</span> : 
            <label className="text-blue-600 hover:underline cursor-pointer ml-1 font-medium">
              Import Scenarios
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>
            <span className="mx-1 font-normal text-slate-400">|</span>
            <button onClick={() => ScenarioManager.exportToJson()} className="text-blue-600 hover:underline font-medium">
              Export All Scenarios
            </button>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => {
                const selectedScenarios = scenarios.filter(s => selectedIds.has(s.id));
                import('../../lib/exportExcel').then(m => m.exportScenariosToExcel(selectedScenarios));
              }}
              disabled={selectedIds.size === 0}
              className="px-5 py-2.5 bg-[#1e7e34] text-white rounded-md font-bold text-sm hover:bg-[#155724] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
            >
              Export Selected ({selectedIds.size}) to XLSX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
