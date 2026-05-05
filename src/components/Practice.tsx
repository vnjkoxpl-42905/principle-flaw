import React, { useState } from 'react';
import { scheduleData } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

export default function Practice({ currentDay }: { currentDay: number }) {
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

  const PracticeCard = ({ title, when, tasks, id, description }: { title: string, when: string, tasks: string[], id: string, description?: string }) => (
    <Card className="bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 group overflow-hidden">
      <CardHeader className="pb-4 border-b border-white/[0.03]">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">{when}</span>
            <CardTitle className="text-xl font-serif italic text-zinc-200">{title}</CardTitle>
          </div>
          <button 
            onClick={() => toggleComplete(id)}
            className={`p-2 rounded-xl border transition-all ${completed[id] ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-zinc-950/50 border-white/[0.05] text-zinc-700 hover:border-zinc-500'}`}
          >
            <CheckCircle2 size={20} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {description && <p className="text-sm text-zinc-400 font-light">{description}</p>}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Tasks to complete</span>
          <ul className="space-y-2">
            {tasks.map((task, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300 items-start">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                {task}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-2">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/5">
            <AlertCircle size={14} />
            Add missed question to log
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="pb-4 border-b border-zinc-900/50">
        <h2 className="text-4xl font-serif italic text-white tracking-tight">Practice</h2>
        <p className="text-zinc-500 mt-2">Drills, worksheets, and timed sections.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-2 text-emerald-500">
          <Target size={18} />
          <h3 className="text-lg font-serif italic">Today's Practice</h3>
        </div>
        <PracticeCard 
          id={`day-${currentDay}`}
          title={`Day ${currentDay} Drills`}
          when="Current Assignment"
          tasks={dayData.do}
          description={dayData.plainGoal}
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h3 className="text-lg font-serif italic text-zinc-300 px-2">Flaw Training</h3>
          <div className="space-y-4">
            <PracticeCard id="flaw-worksheet" title="Flaw Worksheet" when="Foundations" tasks={["Identify Assumption vs Objection wording", "Practice 'Make False' test"]} />
            <PracticeCard id="flaw-pm-1" title="Progressive Mastery L1" when="Introductory" tasks={["5 Questions from PT 104-151", "Log all misses"]} />
            <PracticeCard id="flaw-pm-2" title="Progressive Mastery L2" when="Intermediate" tasks={["5 Questions from PT 105-127", "Label every answer choice"]} />
            <PracticeCard id="flaw-pm-3" title="Progressive Mastery L3" when="Advanced" tasks={["5 Questions from PT 102-155", "Abstract match consistency"]} />
            <PracticeCard id="flaw-pm-4" title="Progressive Mastery L4" when="Mastery" tasks={["5 Questions from PT 106-152", "High-difficulty patterns"]} />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-serif italic text-zinc-300 px-2">Principle Training</h3>
          <div className="space-y-4">
            <PracticeCard id="prin-strengthen-hw" title="Principle Strengthen" when="Foundations" tasks={["Questions 1-5 from Principle Packet", "Rule in answer choices"]} />
            <PracticeCard id="prin-app-hw" title="Strengthen Application" when="Application" tasks={["Questions 1-5 from Principle Packet", "Focus on 'if' conditions"]} />
            <PracticeCard id="prin-conform-hw" title="Principle Conform" when="Advanced" tasks={["Questions 1-8 from Principle Packet", "Fact-to-rule matching"]} />
            <PracticeCard id="prin-parallel-bridge" title="Parallel Flaw Bridge" when="Bridge" tasks={["Selected Parallel Flaw questions", "Pattern matching"]} />
          </div>
        </section>
      </div>
    </div>
  );
}
