import React, { useState, useEffect } from 'react';
import { questionBank, practiceSets, QuestionRef, PracticeSet, flashcards } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, ListChecks, HelpCircle, Zap, BookOpen, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

function QuestionRow({ 
  q, 
  status, 
  isRedo, 
  onToggleStatus, 
  onToggleRedo 
}: { 
  q: QuestionRef, 
  status: 'correct' | 'missed' | 'none',
  isRedo: boolean,
  onToggleStatus: (status: 'correct' | 'missed') => void,
  onToggleRedo: () => void
}) {
  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${status === 'correct' ? 'bg-emerald-500/[0.03] border-emerald-500/20' : status === 'missed' ? 'bg-rose-500/[0.03] border-rose-500/20' : 'bg-zinc-900/10 border-white/[0.03] hover:border-white/10'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-zinc-950 border border-white/5 shadow-inner">
             <span className="text-[10px] text-zinc-600 font-bold leading-none mb-1">PT</span>
             <span className="text-sm text-zinc-200 font-mono font-bold leading-none">{q.pt}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Section {q.section} • Q{q.question}</span>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${q.topic.includes('Principle') ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{q.topic}</span>
            </div>
            <p className="text-xs text-zinc-400 font-light italic leading-snug">{q.instructions}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStatus('correct')}
            className={`px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${status === 'correct' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-transparent text-zinc-600 border-zinc-800 hover:text-emerald-500 hover:border-emerald-500/30'}`}
          >
            Correct
          </button>
          <button
            onClick={() => onToggleStatus('missed')}
            className={`px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${status === 'missed' ? 'bg-rose-500 text-white border-rose-500' : 'bg-transparent text-zinc-600 border-zinc-800 hover:text-rose-500 hover:border-rose-500/30'}`}
          >
            Review
          </button>
          <button
            onClick={() => onToggleRedo()}
            className={`p-2 rounded-xl border transition-all ${isRedo ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-transparent text-zinc-700 border-zinc-800 hover:text-amber-500'}`}
            title="Add to Redo Queue"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      {status === 'missed' && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-4 pt-4 border-t border-rose-500/10"
        >
          <div className="flex items-start gap-3 bg-rose-500/[0.02] p-3 rounded-xl border border-rose-500/5">
             <AlertCircle size={14} className="text-rose-500 mt-0.5" />
             <p className="text-[11px] text-rose-300 leading-relaxed"><span className="font-bold uppercase tracking-widest text-[9px] mr-2">Review Prompt:</span> {q.reviewPrompt}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Practice({ currentDay, onOpenResource }: { currentDay: number, onOpenResource: (r: any) => void }) {
  const [view, setView] = useState<'sets' | 'redo'>('sets');
  
  const [qStatus, setQStatus] = useState<Record<string, 'correct' | 'missed' | 'none'>>(() => {
    const saved = localStorage.getItem('lsatQuestionStatus');
    return saved ? JSON.parse(saved) : {};
  });

  const [redoQueue, setRedoQueue] = useState<string[]>(() => {
    const saved = localStorage.getItem('lsatRedoQueue');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lsatQuestionStatus', JSON.stringify(qStatus));
  }, [qStatus]);

  useEffect(() => {
    localStorage.setItem('lsatRedoQueue', JSON.stringify(redoQueue));
  }, [redoQueue]);

  const toggleStatus = (id: string, status: 'correct' | 'missed') => {
    setQStatus(prev => {
      const current = prev[id];
      if (current === status) return { ...prev, [id]: 'none' };
      return { ...prev, [id]: status };
    });
  };

  const toggleRedo = (id: string) => {
    setRedoQueue(prev => {
      if (prev.includes(id)) return prev.filter(qId => qId !== id);
      return [...prev, id];
    });
  };

  const SetView = () => (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 gap-12">
        {practiceSets.map((set) => (
          <section key={set.id} className="space-y-6">
            <div className="flex items-end justify-between border-b border-zinc-900/50 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">{set.stage}</span>
                   <div className="w-1 h-1 rounded-full bg-zinc-800" />
                   <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{set.whenToDo}</span>
                </div>
                <h3 className="text-3xl font-serif italic text-white leading-tight">{set.title}</h3>
                <p className="text-zinc-500 text-sm font-light italic">{set.purpose}</p>
              </div>
              <div className="hidden sm:block text-right">
                 <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest block mb-1">Pass Criteria</span>
                 <div className="flex gap-1 justify-end">
                    {set.completionCriteria.map((c, i) => (
                      <span key={i} className="text-[9px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded bg-zinc-950/50">{c}</span>
                    ))}
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-3">
                  {set.questions.length > 0 ? (
                    set.questions.map(qId => {
                      const q = questionBank.find(qb => qb.id === qId);
                      return q ? (
                        <QuestionRow 
                          key={qId} 
                          q={q} 
                          status={qStatus[q.id] || 'none'}
                          isRedo={redoQueue.includes(q.id)}
                          onToggleStatus={(s) => toggleStatus(q.id, s)}
                          onToggleRedo={() => toggleRedo(q.id)}
                        />
                      ) : null;
                    })
                  ) : (
                    <div className="p-12 rounded-[32px] border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center space-y-4">
                       <Zap size={32} className="text-zinc-800" />
                       <div>
                         <p className="text-zinc-400 font-serif italic">Refer to physical resource/PDF for this drill.</p>
                         <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">{set.purpose}</p>
                       </div>
                    </div>
                  )}
               </div>

               <div className="space-y-6">
                  <div className="bg-zinc-900/20 rounded-[28px] border border-white/[0.03] p-6 space-y-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <ListChecks size={14} /> Section Focus
                      </span>
                      <ul className="space-y-3">
                        {set.beforeYouStart.map((item, i) => (
                          <li key={i} className="flex gap-3 text-xs text-zinc-400 font-light leading-relaxed italic">
                            <div className="w-1 h-1 rounded-full bg-emerald-500/40 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="h-px bg-zinc-800/50" />

                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen size={14} /> Review Protocol
                      </span>
                      <ul className="space-y-3">
                        {set.reviewInstructions.map((item, i) => (
                          <li key={i} className="flex gap-3 text-xs text-zinc-400 font-light leading-relaxed italic">
                            <div className="w-1 h-1 rounded-full bg-rose-500/40 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  const RedoQueueView = () => {
    const redoQuestions = redoQueue.map(id => questionBank.find(q => q.id === id)).filter(Boolean) as QuestionRef[];

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
           <h3 className="text-3xl font-serif italic text-white">Redo Queue</h3>
           <p className="text-zinc-500 text-sm font-light italic">Mistakes happen. Forgetting them is the error.</p>
        </div>

        {redoQuestions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {redoQuestions.map(q => (
              <QuestionRow 
                key={q.id} 
                q={q} 
                status={qStatus[q.id] || 'none'}
                isRedo={redoQueue.includes(q.id)}
                onToggleStatus={(s) => toggleStatus(q.id, s)}
                onToggleRedo={() => toggleRedo(q.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-20 rounded-[40px] border border-dashed border-zinc-900 bg-zinc-900/5 flex flex-col items-center justify-center text-center space-y-6">
             <div className="w-16 h-16 rounded-full bg-emerald-500/5 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={32} />
             </div>
             <div>
                <p className="text-xl font-serif italic text-zinc-300">Your queue is clear.</p>
                <p className="text-xs text-zinc-600 uppercase tracking-widest mt-2">Every redo completed is a permanent win.</p>
             </div>
          </div>
        )}

        <div className="bg-zinc-900/20 rounded-[32px] border border-white/[0.03] p-8 max-w-2xl">
           <div className="flex items-start gap-4">
              <Clock size={20} className="text-zinc-600 mt-1" />
              <div className="space-y-3">
                 <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">The 24-Hour Rule</h4>
                 <p className="text-xs text-zinc-500 font-light leading-relaxed italic">
                   Wait at least 24 hours before re-doing a question you missed. If you do it immediately, you're just using your short-term memory. You want to test your logical retrieval, not your recollection of the answer key.
                 </p>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-serif italic text-white tracking-tight">Active Work</h2>
          <p className="text-zinc-500 mt-2 italic font-light">Precision over speed. Accuracy over volume.</p>
        </div>
        
        <div className="flex gap-2 bg-zinc-900/40 p-1.5 rounded-2xl border border-white/[0.03] self-start sm:self-auto">
           <button 
             onClick={() => setView('sets')}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'sets' ? 'bg-zinc-100 text-zinc-950 shadow-lg shadow-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
             <Target size={14} /> Practice Sets
           </button>
           <button 
             onClick={() => setView('redo')}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'redo' ? 'bg-zinc-100 text-zinc-950 shadow-lg shadow-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
             <RotateCcw size={14} /> Redo Queue 
             {redoQueue.length > 0 && <span className="bg-amber-500 text-zinc-950 px-1.5 rounded-full text-[8px] font-black">{redoQueue.length}</span>}
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'sets' ? <SetView key="sets" /> : <RedoQueueView key="redo" />}
      </AnimatePresence>
    </div>
  );
}

