import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Target, FileSearch, Sparkles, MoveRight } from 'lucide-react';
import { scheduleData } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default function TodayView({ userName, day, setDay }: { userName: string, day: number, setDay: (d: number) => void }) {
  const data = scheduleData.find(d => d.day === day) || scheduleData[0];
  
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('lsatCompletedDays');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dailyChecklists, setDailyChecklists] = useState<Record<number, Record<string, boolean>>>(() => {
    try {
      const saved = localStorage.getItem('lsatDailyChecklists');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-zinc-900/50">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Sparkles size={14} className="animate-pulse" />
            <span className="font-semibold text-[10px] uppercase tracking-[0.2em]">Daily Mission for {userName}</span>
          </div>
          <h2 className="text-4xl font-serif italic text-white tracking-tight">Today's Focus</h2>
        </div>
        
        <div className="flex items-center gap-3 bg-zinc-900/30 p-2 rounded-2xl border border-white/[0.03]">
          <select 
            value={day} 
            onChange={(e) => setDay(Number(e.target.value))}
            className="bg-transparent text-xs font-medium px-4 py-2 text-zinc-400 focus:outline-none appearance-none cursor-pointer hover:text-white transition-colors"
          >
            {scheduleData.map(d => (
              <option key={d.day} value={d.day} className="bg-zinc-950 text-zinc-300">Day {d.day}: {d.title}</option>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0" />
            
            <CardHeader className="pb-8 pt-10">
              <div className="flex justify-between items-start">
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{data.title}</span>
                  </div>
                  <CardTitle className="text-4xl font-serif italic text-zinc-100 leading-tight">
                    {data.focus}
                  </CardTitle>
                </div>
                <button 
                  onClick={toggleDayComplete}
                  className="p-3 rounded-2xl bg-zinc-950/50 border border-white/[0.05] hover:border-emerald-500/50 transition-all group/btn"
                  title="Mark day as complete"
                >
                  {isComplete ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Circle className="text-zinc-700 group-hover/btn:text-emerald-900" size={24} />}
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-10 pb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/[0.05] flex items-center justify-center">
                      <FileSearch size={16} className="text-emerald-500" />
                    </div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-500">Materials for Review</h4>
                  </div>
                  <div className="pl-11">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/[0.03] rounded-xl text-sm text-zinc-300 font-medium hover:border-white/10 transition-all cursor-default">
                      {data.open}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/[0.05] flex items-center justify-center">
                      <Target size={16} className="text-emerald-500" />
                    </div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-500">Practice Intent</h4>
                  </div>
                  <div className="pl-11 text-zinc-400 leading-relaxed text-sm">
                    {data.complete}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/40 p-6 rounded-2xl border border-emerald-900/20 relative overflow-hidden group-hover:bg-zinc-950/60 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-500/80">Review Standard</h4>
                    <p className="text-zinc-300 leading-relaxed text-sm font-light italic">
                      "{data.review}"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 h-full">
            <CardHeader className="pb-6 border-b border-zinc-900/50">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1 block">Progress Check</span>
              <CardTitle className="text-xl font-serif italic text-zinc-200">Daily Rituals</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-4">
              <ChecklistItem label="Curated notes reviewed" checked={!!dayTasks['notes']} onChange={() => toggleChecklistItem('notes')} />
              <ChecklistItem label="Homework drills completed" checked={!!dayTasks['hw']} onChange={() => toggleChecklistItem('hw')} />
              <ChecklistItem label="Missed questions analyzed" checked={!!dayTasks['missed']} onChange={() => toggleChecklistItem('missed')} />
              <ChecklistItem label="Redo questions processed" checked={!!dayTasks['redo']} onChange={() => toggleChecklistItem('redo')} />
              <ChecklistItem label="Key takeaway logged" checked={!!dayTasks['log']} onChange={() => toggleChecklistItem('log')} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChecklistItem({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800/50 transition-colors cursor-pointer group">
      <div className="mt-0.5 text-zinc-500 group-hover:text-emerald-500">
        {checked ? <CheckCircle2 className="text-emerald-500" size={18} /> : <Circle size={18} />}
      </div>
      <span className={`text-sm ${checked ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
        {label}
      </span>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
  );
}
