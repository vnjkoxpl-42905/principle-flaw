import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Filter, BookOpen, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

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
    const saved = localStorage.getItem('lsatReviewLogs');
    return saved ? JSON.parse(saved) : [];
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

  const templates: Record<string, string> = {
    'Flaw': 'Premise: [Fact]\nConclusion: [Goal]\nAssumption: [Gap]\nWhy Wrong: [Why picked]',
    'Principle': 'Stimulus Rule: [If... then]\nSituation: [Case]\nCorrect Answer: [Bridges gap]',
    'Parallel Flaw': 'Original Pattern: [Flaw type]\nCorrect Answer: [Matching logical structure]'
  };

  const applyTemplate = (type: string) => {
    setNewLog({ ...newLog, type, whyMissed: templates[type] || '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900/50 pb-6">
        <div>
          <h2 className="text-4xl font-serif italic text-white tracking-tight">Review Log</h2>
          <p className="text-zinc-500 mt-1">Don't just record mistakes—solve them.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="rounded-xl h-12 px-6">
          {isAdding ? "Cancel" : <><Plus size={18} className="mr-2" /> Log a Mistake</>}
        </Button>
      </div>

      {!isAdding && logs.length === 0 && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-emerald-500">
                <HelpCircle size={20} />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">How to review a question</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Don't look at the correct answer yet.",
                  "Try to find the flaw yourself first.",
                  "Write down exactly why your answer choice was tempting.",
                  "Identify the 'Trap Language' in the wrong answer.",
                  "State the 'Magic Word' in the right answer that makes it work."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-zinc-900/30 rounded-xl border border-white/[0.03]">
                    <span className="text-zinc-600 font-bold">{i+1}</span>
                    <p className="text-sm text-zinc-300 font-light">{step}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-blue-500">
                <BookOpen size={20} />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Templates</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  When you log a question, try to follow these frameworks to ensure you're actually analyzing the logic, not just the story.
                </p>
                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/[0.03] space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1">Flaw Framework</span>
                    <p className="text-xs font-mono text-zinc-400">Premise & Conclusion → Assumption → Why it fails</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1">Principle Framework</span>
                    <p className="text-xs font-mono text-zinc-400">Trigger → Outcome → Match stimulus to rule</p>
                  </div>
                </div>
              </div>
            </section>
         </div>
      )}

      {isAdding && (
        <div className="bg-zinc-900/40 border border-emerald-500/20 rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Question Reference</label>
              <input 
                placeholder="e.g. PT 104 S2 Q15" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                value={newLog.reference || ''}
                onChange={e => setNewLog({...newLog, reference: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Question Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Flaw', 'Principle', 'Parallel'].map(t => (
                  <button 
                    key={t}
                    onClick={() => applyTemplate(t)}
                    className={`text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl border transition-all ${newLog.type === t ? 'bg-zinc-100 text-zinc-950 border-zinc-100' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Confidence</label>
              <select 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
                value={newLog.confidence || 'Medium'}
                onChange={e => setNewLog({...newLog, confidence: e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">My Answer</label>
              <input 
                placeholder="A" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 text-center focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-bold"
                maxLength={1}
                value={newLog.picked || ''}
                onChange={e => setNewLog({...newLog, picked: e.target.value.toUpperCase()})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Correct Answer</label>
              <input 
                placeholder="C" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 text-center focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-bold"
                maxLength={1}
                value={newLog.correct || ''}
                onChange={e => setNewLog({...newLog, correct: e.target.value.toUpperCase()})}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <label className="flex items-center gap-3 cursor-pointer group bg-zinc-950/50 p-3 rounded-xl border border-white/[0.03] w-full">
                <input 
                  type="checkbox" 
                  className="rounded border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500 h-5 w-5"
                  checked={newLog.redoLater || false}
                  onChange={e => setNewLog({...newLog, redoLater: e.target.checked})}
                />
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200 transition-colors">Mark for re-do later</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Detailed Analysis</label>
            <textarea 
              rows={4}
              placeholder="Use a template or describe exactly why the correct answer is correct and why yours was tempting."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all leading-relaxed font-light"
              value={newLog.whyMissed || ''}
              onChange={e => setNewLog({...newLog, whyMissed: e.target.value})}
            />
          </div>

          <div>
             <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">One key takeaway for next time</label>
             <input 
               placeholder="If I see 'only if' in the conclusion, I will check for reversal error."
               className="w-full bg-zinc-950 border border-emerald-500/20 rounded-xl px-4 py-4 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all italic"
               value={newLog.noticeNext || ''}
               onChange={e => setNewLog({...newLog, noticeNext: e.target.value})}
             />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
             <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
             <Button onClick={handleAdd} className="px-8 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-white" disabled={!newLog.reference}>Save Review</Button>
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-white/[0.03]">
            <Filter size={18} className="text-zinc-500" />
            <div className="flex gap-2">
              {['All', 'Flaw', 'Principle', 'Parallel'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${filterType === t ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
               <input type="checkbox" checked={filterRedo} onChange={e => setFilterRedo(e.target.checked)} className="rounded border-zinc-800 bg-zinc-950 text-emerald-500" />
               <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Needs Redo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredLogs.map(log => (
              <Card key={log.id} className="bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 group overflow-hidden relative">
                <button onClick={() => handleDelete(log.id)} className="absolute top-6 right-6 text-zinc-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-zinc-100 bg-zinc-950/50 border border-white/5 px-3 py-1 rounded-lg text-sm">{log.reference}</span>
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{log.type}</span>
                    {log.redoLater && <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">Redo Required</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="flex gap-4 items-center bg-zinc-950/30 p-4 rounded-xl border border-white/[0.03]">
                          <div className="text-center">
                            <span className="text-[9px] font-bold text-zinc-600 uppercase block mb-1">Picked</span>
                            <span className="text-rose-500 font-bold text-xl">{log.picked}</span>
                          </div>
                          <div className="w-px h-8 bg-zinc-800" />
                          <div className="text-center">
                            <span className="text-[9px] font-bold text-zinc-600 uppercase block mb-1">Correct</span>
                            <span className="text-emerald-500 font-bold text-xl">{log.correct}</span>
                          </div>
                          <div className="ml-auto">
                             <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${log.confidence === 'High' ? 'text-emerald-500 bg-emerald-500/5' : log.confidence === 'Medium' ? 'text-amber-500 bg-amber-500/5' : 'text-rose-500 bg-rose-500/5'}`}>
                               {log.confidence} Conf
                             </span>
                          </div>
                       </div>
                       <div className="space-y-2">
                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Analysis</span>
                         <pre className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">{log.whyMissed}</pre>
                       </div>
                    </div>
                    
                    <div className="bg-emerald-500/[0.02] p-6 rounded-2xl border border-emerald-500/10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-emerald-500 mb-3">
                         <CheckCircle2 size={16} />
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Key Takeaway</span>
                      </div>
                      <p className="text-zinc-200 italic font-medium leading-relaxed">{log.noticeNext}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
