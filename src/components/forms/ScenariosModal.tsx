import * as React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ScenarioManager, type SavedScenario } from '../../lib/scenarioManager';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TooltipIcon } from '../ui/TooltipIcon';
import { X, Download, Trash2, FolderOpen } from 'lucide-react';

interface ScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScenariosModal({ isOpen, onClose }: ScenariosModalProps) {
  const [scenarios, setScenarios] = React.useState<SavedScenario[]>([]);
  const [newScenarioName, setNewScenarioName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  
  const appState = useAppStore();

  React.useEffect(() => {
    if (isOpen) {
      setScenarios(ScenarioManager.getAll());
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
    }
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
            <h3 className="font-semibold text-slate-800 mb-4">Saved Scenarios</h3>
            {scenarios.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No saved scenarios yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {scenarios.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg group">
                    <div>
                      <p className="font-medium text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleDateString()}</p>
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

        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Backup <TooltipIcon content="Export/Import all your scenarios as a JSON file backup" /> : 
            </span>
            <button 
              onClick={() => ScenarioManager.exportToCsv()}
              className="text-blue-600 font-medium flex items-center hover:underline"
            >
              <Download className="w-4 h-4 mr-1" />
              Export to CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
