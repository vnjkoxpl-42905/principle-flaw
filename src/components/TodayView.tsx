import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Target, FileSearch, Sparkles, MoveRight, BookOpen, AlertCircle, MessageSquare } from 'lucide-react';
import { scheduleData } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export default function TodayView({ userName, day, setDay }: { userName: string, day: number, setDay: (d: number) => void }) {
  const data = scheduleData.find(d => d.day === day) || scheduleData[0];
  
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const saved = localStorage.getItem('lsatCompletedDays');
    return saved ? JSON.parse(saved) : [];
  });

  const [dailyChecklists, setDailyChecklists] = useState<Record<number, Record<string, boolean>>>(() => {
    const saved = localStorage.getItem('lsatDailyChecklists');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('lsatCompletedDays', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('lsatDailyChecklists', JSON.stringify(dailyChecklists));
  }, [dailyChecklists]);

  const toggleDayComplete = () => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const toggleChecklistItem = (item: string) => {
    setDailyChecklists(prev => {
      const dayTasks = prev[day] || {};
      return {
        ...prev,
        [day]: {
          ...dayTasks,
          [item]: !dayTasks[item]
        }
      };
    });
  };

  const dayTasks = dailyChecklists[day] || {};
  const isComplete = completedDays.includes(day);

  const StepCard = ({ icon: Icon, title, items, color }: { icon: any, title: string, items: string[], color: string }) => (
    <Card className="bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 group overflow-hidden h-full">
      <div className="p-4 flex items-start gap-4 h-full">
        <div className={`w-10 h-10 rounded-xl bg-zinc-950 border border-white/[0.05] flex items-center justify-center flex-shrink-0 ${color}`}>
          <Icon size={20} />
        </div>
        <div className="space-y-2 uppercase tracking-tighter">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{title}</h4>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="text-sm text-zinc-100 font-light leading-snug">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-900/50">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 mb-1">
            <Sparkles size={14} className="animate-pulse" />
            <span className="font-semibold text-[10px] uppercase tracking-[0.2em]">Welcome back, {userName}</span>
          </div>
          <h2 className="text-4xl font-serif italic text-white tracking-tight">Today</h2>
        </div>
        
        <div className="flex items-center gap-3 bg-zinc-900/30 p-2 rounded-2xl border border-white/[0.03]">
          <select 
            value={day} 
            onChange={(e) => setDay(Number(e.target.value))}
            className="bg-transparent text-xs font-bold uppercase tracking-widest px-4 py-2 text-zinc-400 focus:outline-none appearance-none cursor-pointer hover:text-white transition-colors"
          >
            {scheduleData.map(d => (
              <option key={d.day} value={d.day} className="bg-zinc-950 text-zinc-300">Day {d.day}: {d.label}</option>
            ))}
          </select>
          <div className="w-px h-4 bg-zinc-800" />
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-xl hover:bg-white/5 hover:text-white text-zinc-500"
            disabled={day === 14} 
            onClick={() => setDay(day + 1)}
            title="Next Day"
          >
            <MoveRight size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Today's Goal</span>
              <h3 className="text-2xl font-serif italic text-zinc-100">{data.plainGoal}</h3>
            </div>
            <button 
              onClick={toggleDayComplete}
              className={`p-4 rounded-2xl border transition-all ${isComplete ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-zinc-950/50 border-white/[0.05] text-zinc-700 hover:border-emerald-500/50'}`}
            >
              {isComplete ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StepCard icon={FileSearch} title="Open This" items={data.open} color="text-blue-500" />
            <StepCard icon={BookOpen} title="Read This" items={data.read} color="text-emerald-500" />
            <StepCard icon={Target} title="Do This" items={data.do} color="text-purple-500" />
            <StepCard icon={Clock} title="Review This" items={data.review} color="text-amber-500" />
            <StepCard icon={AlertCircle} title="Bring / Write This" items={data.bring} color="text-rose-500" />
            
            <Card className="bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 h-full">
              <div className="p-4 border-b border-white/[0.03]">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Status Checklist</span>
              </div>
              <div className="p-4 space-y-2">
                <ChecklistItem label="Notes read" checked={!!dayTasks['notes']} onChange={() => toggleChecklistItem('notes')} />
                <ChecklistItem label="Homework done" checked={!!dayTasks['hw']} onChange={() => toggleChecklistItem('hw')} />
                <ChecklistItem label="Missed questions reviewed" checked={!!dayTasks['missed']} onChange={() => toggleChecklistItem('missed')} />
                <ChecklistItem label="Review log updated" checked={!!dayTasks['log']} onChange={() => toggleChecklistItem('log')} />
                <ChecklistItem label="Takeaway written" checked={!!dayTasks['takeaway']} onChange={() => toggleChecklistItem('takeaway')} />
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-8 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900/40 border-zinc-800/50 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16" />
              <div className="flex items-center gap-3 text-emerald-500 mb-4">
                <Target size={18} />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">What's Next?</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {isComplete 
                    ? "Great job finishing today's tasks. Review your takeaway in the log and prepare any questions for your next session." 
                    : "Focus on your 'Read' and 'Do' tasks first. Don't worry about speed today—worry about precision."}
                </p>
                <div className="flex gap-4">
                   <Button variant="outline" className="flex-1 rounded-xl border-white/[0.03] bg-zinc-950/50 h-10 text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:border-emerald-500/20">
                      Tomorrow's Preview
                   </Button>
                   <Button className="flex-1 rounded-xl bg-zinc-100 text-zinc-950 h-10 text-[10px] font-bold uppercase tracking-widest">
                      Go to Review Log
                   </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-full rounded-2xl border-white/[0.03] bg-zinc-950/50 hover:bg-zinc-900 flex flex-col items-center justify-center gap-2 p-4">
                 <FileSearch className="text-blue-500" size={20} />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Learn Flaw</span>
              </Button>
              <Button variant="outline" className="h-full rounded-2xl border-white/[0.03] bg-zinc-950/50 hover:bg-zinc-900 flex flex-col items-center justify-center gap-2 p-4">
                 <BookOpen className="text-emerald-500" size={20} />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Learn Principle</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ChecklistItem({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 py-1 cursor-pointer group">
      <div className={`transition-colors ${checked ? 'text-emerald-500' : 'text-zinc-700 group-hover:text-zinc-500'}`}>
        {checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      </div>
      <span className={`text-[11px] font-medium tracking-tight transition-all ${checked ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
        {label}
      </span>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
  );
}
