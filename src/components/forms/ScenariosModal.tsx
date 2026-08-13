import * as React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ScenarioManager, type SavedScenario } from '../../lib/scenarioManager';
import { exportScenariosToExcel } from '../../lib/exportExcel';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TooltipIcon } from '../ui/TooltipIcon';
import { X, Save, Trash2, FolderOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScenariosModal({ isOpen, onClose }: ScenariosModalProps) {
  const [scenarios, setScenarios] = React.useState<SavedScenario[]>([]);
  const [newScenarioName, setNewScenarioName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set(['current']));
  
  const appState = useAppStore();

  React.useEffect(() => {
    if (isOpen) {
      setScenarios(ScenarioManager.getAll());
      setSelectedIds(new Set(['current']));
      setIsSaving(false);
      setNewScenarioName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!newScenarioName.trim()) return;
    ScenarioManager.save(newScenarioName, appState);
    setScenarios(ScenarioManager.getAll());
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
      if (selectedIds.has(id)) {
        const next = new Set(selectedIds);
        next.delete(id);
        setSelectedIds(next);
      }
    }
  };

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleExportSelected = () => {
    if (selectedIds.size === 0) return;
    const toExport: SavedScenario[] = [];
    
    if (selectedIds.has('current')) {
      toExport.push({
        id: 'current',
        name: 'Current Unsaved Analysis',
        timestamp: Date.now(),
        data: JSON.parse(JSON.stringify(appState)) // deep copy of state without functions
      });
    }

    scenarios.forEach(s => {
      if (selectedIds.has(s.id)) toExport.push(s);
    });

    exportScenariosToExcel(toExport);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Scenarios & Exports</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="font-semibold text-slate-800 mb-1">Save Current Analysis</h3>
            <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
              </svg>
              Scenarios are saved to your browser's local storage, not a server.
            </p>

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
              <button 
                onClick={() => setIsSaving(true)} 
                className="w-full bg-[#2d3748] hover:bg-[#1a202c] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save as New Scenario
              </button>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Load Saved Scenarios</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {/* Current Unsaved Analysis */}
              <div className={cn(
                "flex justify-between items-center p-4 border rounded-lg transition-colors cursor-pointer",
                selectedIds.has('current') ? "bg-blue-50/50 border-blue-200" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              )}
                onClick={() => toggleSelection('current')}
              >
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.has('current')}
                    onChange={() => {}} // handled by parent div
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-800">(Current Unsaved Analysis)</p>
                    <p className="text-sm text-slate-500">The inputs currently on your screen.</p>
                  </div>
                </div>
              </div>

              {scenarios.map(s => (
                <div 
                  key={s.id} 
                  className={cn(
                    "flex justify-between items-center p-4 border rounded-lg group transition-colors cursor-pointer",
                    selectedIds.has(s.id) ? "bg-blue-50/50 border-blue-200" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  )}
                  onClick={() => toggleSelection(s.id)}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(s.id)}
                      onChange={() => {}}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{s.name}</p>
                      <p className="text-sm text-slate-500">Saved: {new Date(s.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => handleLoad(s)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded border border-transparent hover:border-blue-200 transition-all"
                      title="Load Scenario"
                    >
                      <FolderOpen className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(s.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded border border-transparent hover:border-red-200 transition-all"
                      title="Delete Scenario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {scenarios.length === 0 && (
                <div className="text-center py-6 text-sm text-slate-500 italic">
                  No saved scenarios yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
            Backup <TooltipIcon content="Download all scenarios as a JSON file, or restore them later." /> :
            <label className="text-blue-600 hover:underline ml-1 cursor-pointer">
              Import Scenarios (JSON)
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const content = event.target?.result as string;
                    if (ScenarioManager.importFromJson(content)) {
                      setScenarios(ScenarioManager.getAll());
                      alert('Scenarios imported successfully!');
                    } else {
                      alert('Failed to import scenarios. Invalid JSON format.');
                    }
                  };
                  reader.readAsText(file);
                  e.target.value = ''; // reset
                }} 
              />
            </label>
            <span className="text-slate-300">|</span>
            <button onClick={() => ScenarioManager.exportToJson()} className="text-blue-600 hover:underline">Export All Scenarios (JSON)</button>
          </div>
          
          <button 
            onClick={handleExportSelected}
            disabled={selectedIds.size === 0}
            className="bg-[#10a34a] hover:bg-[#16a34a]/90 text-white font-bold py-2.5 px-5 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export Selected ({selectedIds.size}) to XLSX
          </button>
        </div>
      </div>
    </div>
  );
}
