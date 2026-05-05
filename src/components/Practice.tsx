import React, { useState } from 'react';
import { scheduleData, studyResources, StudyResource } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, CheckCircle2, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Practice({ currentDay, onOpenResource }: { currentDay: number, onOpenResource: (r: Partial<StudyResource>) => void }) {
  const dayData = scheduleData[currentDay - 1];
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('lsatPracticeCompletion');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleComplete = (id: string) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem('lsatPracticeCompletion', JSON.stringify(next));
  };

  const resolveResource = (idOrName: string) => {
    return studyResources.find(r => r.id === idOrName) || {
      id: idOrName,
      title: idOrName,
      description: "",
      includedInApp: false
    } as Partial<StudyResource>;
  };

  const PracticeCard = ({ resourceId, title, when, tasks, id, description }: { resourceId?: string, title?: string, when: string, tasks?: string[], id: string, description?: string, key?: any }) => {
    const res = resourceId ? resolveResource(resourceId) : null;
    const displayTitle = title || res?.title || id;
    const isDone = completed[id];

    return (
      <Card className={`bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 group overflow-hidden transition-all duration-500 ${isDone ? 'opacity-60 border-zinc-900' : ''}`}>
        <CardHeader className="pb-4 border-b border-white/[0.03]">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">{when}</span>
              <CardTitle className={`text-xl font-serif italic ${isDone ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{displayTitle}</CardTitle>
            </div>
            <button 
              onClick={() => toggleComplete(id)}
              className={`p-2 rounded-xl border transition-all ${isDone ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-zinc-950/50 border-white/[0.05] text-zinc-700 hover:text-emerald-500/50 hover:text-emerald-500'}`}
            >
              <CheckCircle2 size={24} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {(description || res?.description) && <p className="text-sm text-zinc-400 font-light italic leading-relaxed">{description || res?.description}</p>}
          
          {tasks && tasks.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Scope of work</span>
              <ul className="space-y-2">
                {tasks.map((task, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300 items-start font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 mt-1.5 flex-shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            {res?.includedInApp && (
              <Button 
                onClick={() => onOpenResource(res)}
                size="sm" 
                className="w-full h-10 rounded-xl bg-zinc-100 text-zinc-950 text-[10px] font-bold uppercase tracking-widest gap-2"
              >
                Open Resource <ExternalLink size={12} />
              </Button>
            )}
            <Button variant="ghost" size="sm" className="w-full h-10 rounded-xl border border-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all gap-2">
              <AlertCircle size={14} />
              Log Missed Question
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-zinc-900/50">
        <h2 className="text-4xl font-serif italic text-white tracking-tight">Practice</h2>
        <p className="text-zinc-500 mt-2 italic">Precision over speed. Accuracy over volume.</p>
      </div>

      <section className="space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 mb-1">
            <Target size={14} className="animate-pulse" />
            <span className="font-bold text-[10px] uppercase tracking-[0.3em]">Day {currentDay} Assignment</span>
          </div>
          <h3 className="text-3xl font-serif italic text-white leading-tight">Required Drills</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dayData.do.map((item, idx) => {
            const res = resolveResource(item);
            return (
              <PracticeCard 
                key={idx}
                id={`day-${currentDay}-${idx}`}
                resourceId={res.id}
                when="Assigned Today"
              />
            );
          })}
        </div>
      </section>

      <section className="pt-12 border-t border-zinc-900/50 space-y-8">
        <div className="space-y-2">
           <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Growth Track</span>
           <h3 className="text-2xl font-serif italic text-zinc-300">The Path to Level 4</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PracticeCard id="flaw-pm-1" resourceId="flaw-pm-1" when="Foundations" />
          <PracticeCard id="flaw-pm-2" resourceId="flaw-pm-2" when="Intermediate" />
          <PracticeCard id="flaw-pm-3" resourceId="flaw-pm-3" when="Advanced" />
          <PracticeCard id="prin-strengthen-hw" resourceId="principle-strengthen-hw" when="Core Skills" />
          <PracticeCard id="prin-app-hw" resourceId="strengthen-app-hw" when="Refinement" />
          <PracticeCard id="prin-conform-hw" resourceId="principle-conform-hw" when="Mastery" />
        </div>
      </section>
    </div>
  );
}

