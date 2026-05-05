import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Filter, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

interface LogEntry {
  id: string;
  reference: string;
  type: string;
  picked: string;
  correct: string;
  whyMissed: string;
  correctDid: string;
  noticeNext: string;
  confidence: string;
  redoLater: boolean;
}

export default function ReviewLog() {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('lsatReviewLogs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newLog, setNewLog] = useState<Partial<LogEntry>>({ type: 'Flaw', confidence: 'Medium', redoLater: false });
  const [filterType, setFilterType] = useState('All');
  const [filterRedo, setFilterRedo] = useState(false);

  useEffect(() => {
    localStorage.setItem('lsatReviewLogs', JSON.stringify(logs));
  }, [logs]);

  const handleAdd = () => {
    if (!newLog.reference) return;
    const entry: LogEntry = {
      id: Date.now().toString(),
      reference: newLog.reference || '',
      type: newLog.type || 'Flaw',
      picked: newLog.picked || '',
      correct: newLog.correct || '',
      whyMissed: newLog.whyMissed || '',
      correctDid: newLog.correctDid || '',
      noticeNext: newLog.noticeNext || '',
      confidence: newLog.confidence || 'Medium',
      redoLater: newLog.redoLater || false,
    };
    setLogs([entry, ...logs]);
    setNewLog({ type: 'Flaw', confidence: 'Medium', redoLater: false });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  const filteredLogs = logs.filter(log => {
    if (filterType !== 'All' && log.type !== filterType) return false;
    if (filterRedo && !log.redoLater) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight">Review Log</h2>
          <p className="text-zinc-400">Track your missed questions and build pattern recognition.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : <><Plus size={16} className="mr-2" /> Add Entry</>}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-zinc-900 border border-emerald-900/50 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">Question Reference</label>
              <input 
                placeholder="e.g. PT 127 S3 Q17" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={newLog.reference || ''}
                onChange={e => setNewLog({...newLog, reference: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">Question Type</label>
              <select 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={newLog.type || 'Flaw'}
                onChange={e => setNewLog({...newLog, type: e.target.value})}
              >
                <option>Flaw</option>
                <option>Principle</option>
                <option>Parallel Flaw</option>
                <option>Other LR</option>
                <option>Reading Comp</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">Confidence</label>
              <select 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={newLog.confidence || 'Medium'}
                onChange={e => setNewLog({...newLog, confidence: e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">My Answer</label>
              <input 
                placeholder="A" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={newLog.picked || ''}
                onChange={e => setNewLog({...newLog, picked: e.target.value})}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">Correct Answer</label>
              <input 
                placeholder="C" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={newLog.correct || ''}
                onChange={e => setNewLog({...newLog, correct: e.target.value})}
              />
            </div>
            <div className="col-span-2 flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                  checked={newLog.redoLater || false}
                  onChange={e => setNewLog({...newLog, redoLater: e.target.checked})}
                />
                <span className="text-sm font-medium text-red-300">Needs Redo</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">Why I chose my answer / Why it was wrong</label>
            <textarea 
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={newLog.whyMissed || ''}
              onChange={e => setNewLog({...newLog, whyMissed: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">What the correct answer did</label>
            <textarea 
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={newLog.correctDid || ''}
              onChange={e => setNewLog({...newLog, correctDid: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-emerald-500 uppercase tracking-wider mb-1">Pattern to remember</label>
            <textarea 
              rows={2}
              className="w-full bg-zinc-950 border border-emerald-900/50 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={newLog.noticeNext || ''}
              onChange={e => setNewLog({...newLog, noticeNext: e.target.value})}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleAdd} disabled={!newLog.reference}>Save Entry</Button>
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-sm">
          <Filter size={16} className="text-zinc-500 ml-1" />
          <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-800 overflow-x-auto custom-scrollbar">
            {['All', 'Flaw', 'Principle', 'Parallel Flaw', 'Other LR', 'Reading Comp'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${filterType === type ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 pl-4 cursor-pointer sm:ml-auto">
            <input 
              type="checkbox" 
              checked={filterRedo}
              onChange={(e) => setFilterRedo(e.target.checked)}
              className="rounded border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
            />
            <span className="text-zinc-300 font-medium">Needs Redo</span>
          </label>
        </div>
      )}

      {filteredLogs.length === 0 && !isAdding ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 border-dashed rounded-xl">
          <BookOpen className="mx-auto text-zinc-700 mb-4" size={48} />
          <h3 className="text-zinc-400 font-medium">No reviews found</h3>
          <p className="text-zinc-500 text-sm mt-1">{logs.length === 0 ? "Add a missed question to start building your pattern recognition" : "Try changing your filters"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 relative group">
              <button 
                onClick={() => handleDelete(log.id)}
                className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-900/30 px-2.5 py-0.5 rounded text-sm font-medium">{log.reference}</span>
                <span className="text-zinc-400 text-xs uppercase tracking-wider">{log.type}</span>
                {log.redoLater && (
                  <span className="text-red-400 text-xs uppercase tracking-wider font-medium bg-red-950/30 px-2 py-0.5 rounded ml-2">Needs Redo</span>
                )}
                <span className={`text-xs ml-auto font-medium px-2.5 py-1 rounded-full ${log.confidence === 'High' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/50' : log.confidence === 'Medium' ? 'bg-amber-900/20 text-amber-400 border border-amber-900/50' : 'bg-red-900/20 text-red-400 border border-red-900/50'}`}>
                  {log.confidence} Confidence
                </span>
              </div>
              
              <div className="flex gap-6 mb-6 text-sm bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                <div><span className="text-zinc-500">My Answer:</span> <span className="text-red-400 font-medium ml-2">{log.picked}</span></div>
                <div><span className="text-zinc-500">Correct:</span> <span className="text-emerald-500 font-medium ml-2">{log.correct}</span></div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-zinc-500 text-[10px] uppercase tracking-wider mb-2">Why chosen / Why wrong</span>
                  <p className="text-zinc-300 leading-relaxed">{log.whyMissed}</p>
                </div>
                {log.correctDid && (
                  <div>
                    <span className="block text-zinc-500 text-[10px] uppercase tracking-wider mb-2">What correct answer did</span>
                    <p className="text-zinc-300 leading-relaxed">{log.correctDid}</p>
                  </div>
                )}
                <div className="bg-emerald-950/10 p-4 rounded-lg border border-emerald-900/20">
                  <span className="block text-emerald-600 text-[10px] uppercase tracking-wider mb-2">Pattern to remember</span>
                  <p className="text-emerald-300/90 font-medium leading-relaxed">{log.noticeNext}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
