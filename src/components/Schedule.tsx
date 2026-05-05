import React, { useState } from 'react';
import { scheduleData } from '../data';
import { Card, CardContent } from './ui/card';
import { ChevronDown, Calendar, Clock, Target, FileSearch, BookOpen, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function Schedule() {
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (day: number, taskIndex: number, section: string) => {
    const key = `${day}-${section}-${taskIndex}`;
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isTaskDone = (day: number, taskIndex: number, section: string) => {
    return !!completedTasks[`${day}-${section}-${taskIndex}`];
  };

  const toggle = (day: number) => {
    if (expanded.includes(day)) {
      setExpanded(expanded.filter(d => d !== day));
    } else {
      setExpanded([day]); 
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="pb-4 border-b border-zinc-900/50">
        <div className="flex items-center gap-2 text-emerald-500 mb-2">
          <Calendar size={14} className="animate-pulse" />
          <span className="font-bold text-[10px] uppercase tracking-[0.2em]">The Roadmap</span>
        </div>
        <h2 className="text-4xl font-serif italic text-white tracking-tight">Your Path</h2>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {scheduleData.map((data) => {
          const isExpanded = expanded.includes(data.day);
          return (
            <Card key={data.day} className={`group relative bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 transition-all duration-500 overflow-hidden ${
              isExpanded ? 'border-zinc-700 bg-zinc-900/40 shadow-2xl shadow-zinc-950/50' : 'hover:border-zinc-700'
            }`}>
              {/* Intensity Sidebar Indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${
                data.intensity === 'High' ? 'bg-rose-500' : 
                data.intensity === 'Medium' ? 'bg-amber-500' : 
                'bg-emerald-500'
              } ${isExpanded ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`} />

              <button 
                onClick={() => toggle(data.day)}
                className={`w-full flex items-center justify-between p-6 pl-8 text-left focus:outline-none transition-all duration-500 ${isExpanded ? 'pb-2' : ''}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 border overflow-hidden relative ${
                    isExpanded 
                      ? 'bg-zinc-100 text-zinc-950 border-white shadow-xl' 
                      : 'bg-zinc-950/50 border-white/[0.03] text-zinc-500 group-hover:border-white/10'
                  }`}>
                    {/* Subtle Intensity Tint on Badge */}
                    <div className={`absolute inset-0 opacity-10 ${
                      data.intensity === 'High' ? 'bg-rose-500' : 
                      data.intensity === 'Medium' ? 'bg-amber-500' : 
                      'bg-emerald-500'
                    }`} />
                    
                    <span className="text-[10px] uppercase font-bold tracking-tighter mb-1 relative z-10">Day</span>
                    <span className="text-xl font-serif italic relative z-10">{data.day}</span>
                  </div>
                  <div>
                    <h3 className={`font-serif italic text-xl tracking-tight transition-colors duration-500 ${isExpanded ? 'text-zinc-100' : 'text-zinc-200 group-hover:text-white'}`}>
                      {data.focus}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 px-0.5 overflow-hidden">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 whitespace-nowrap">{data.label}</span>
                      <div className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span className="text-xs text-zinc-500 font-light line-clamp-1">{data.plainGoal}</span>
                      
                      {data.intensity && (
                        <div className={`flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full border transition-colors ${
                          data.intensity === 'High' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 
                          data.intensity === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
                          'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                        }`}>
                          <div className={`w-1 h-1 rounded-full animate-pulse ${
                            data.intensity === 'High' ? 'bg-rose-500' : 
                            data.intensity === 'Medium' ? 'bg-amber-500' : 
                            'bg-emerald-500'
                          }`} />
                          <span className="text-[8px] font-bold tracking-[0.2em] uppercase">
                            {data.intensity} Intensity
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`transition-all duration-500 ${isExpanded ? 'rotate-180 text-zinc-100' : 'text-zinc-700 group-hover:text-zinc-400'}`}>
                  <ChevronDown size={20} strokeWidth={1.5} />
                </div>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <CardContent className="pt-4 pb-8 px-6 sm:pl-24 text-sm print:pl-4 print:pt-4">
                      <TooltipProvider>
                        <div className="mb-10 p-8 rounded-3xl bg-zinc-950/50 border border-white/[0.03] relative overflow-hidden group/focus shadow-2xl shadow-emerald-500/5">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.03] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/[0.02] blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                          
                          <div className="flex flex-col gap-3 relative">
                            <div className="flex items-center gap-2">
                               <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Core Focus</span>
                            </div>
                            <h4 className="text-3xl md:text-4xl font-serif italic text-white group-hover/focus:text-emerald-400 transition-colors duration-700 leading-tight">
                               {data.focus}
                            </h4>
                            <p className="text-zinc-400 font-light text-sm max-w-xl leading-relaxed">
                              {data.plainGoal}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/[0.03]">
                          {/* STEP 1: OPEN */}
                          <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                            data.open.every((_, i) => isTaskDone(data.day, i, 'open')) 
                            ? 'bg-zinc-900/10 border-zinc-800 opacity-50' 
                            : 'bg-zinc-950/30 border-white/[0.03] hover:border-white/10'
                          }`}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-zinc-500 cursor-help w-fit mb-4">
                                  <FileSearch size={14} />
                                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Step 1: Open</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Get these documents ready before you start.</p>
                              </TooltipContent>
                            </Tooltip>
                            <ul className="space-y-3">
                               {data.open.map((item, i) => (
                                 <li key={i} 
                                   onClick={() => toggleTask(data.day, i, 'open')}
                                   className="group/task flex gap-3 text-sm cursor-pointer items-start leading-snug"
                                 >
                                   <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                     isTaskDone(data.day, i, 'open') ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700 group-hover/task:border-zinc-500'
                                   }`}>
                                     {isTaskDone(data.day, i, 'open') && <Check size={10} className="text-white" />}
                                   </div>
                                   <span className={`transition-colors ${isTaskDone(data.day, i, 'open') ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                                     {item}
                                   </span>
                                 </li>
                               ))}
                            </ul>
                          </div>

                          {/* STEP 2: READ */}
                          <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                            data.read.every((_, i) => isTaskDone(data.day, i, 'read')) 
                            ? 'bg-zinc-900/10 border-zinc-800 opacity-50' 
                            : 'bg-emerald-500/[0.02] border-emerald-500/10 hover:border-emerald-500/30'
                          }`}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-emerald-500 cursor-help w-fit mb-4">
                                  <BookOpen size={14} />
                                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Step 2: Read</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Core conceptual knowledge for today.</p>
                              </TooltipContent>
                            </Tooltip>
                            <ul className="space-y-3">
                               {data.read.map((item, i) => (
                                 <li key={i} 
                                   onClick={() => toggleTask(data.day, i, 'read')}
                                   className="group/task flex gap-3 text-sm cursor-pointer items-start leading-snug"
                                 >
                                   <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                     isTaskDone(data.day, i, 'read') ? 'bg-emerald-500 border-emerald-500' : 'border-emerald-500/20 group-hover/task:border-emerald-500/40'
                                   }`}>
                                     {isTaskDone(data.day, i, 'read') && <Check size={10} className="text-white" />}
                                   </div>
                                   <span className={`transition-colors ${isTaskDone(data.day, i, 'read') ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                                     {item}
                                   </span>
                                 </li>
                               ))}
                            </ul>
                          </div>
                          
                          {/* STEP 3: DO */}
                          <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                            data.do.every((_, i) => isTaskDone(data.day, i, 'do')) 
                            ? 'bg-zinc-900/10 border-zinc-800 opacity-50' 
                            : 'bg-purple-500/[0.02] border-purple-500/10 hover:border-purple-500/30'
                          }`}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-purple-500 cursor-help w-fit mb-4">
                                  <Target size={14} />
                                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Step 3: Do</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Active practice: worksheets and drills.</p>
                              </TooltipContent>
                            </Tooltip>
                            <ul className="space-y-3">
                               {data.do.map((item, i) => (
                                 <li key={i} 
                                   onClick={() => toggleTask(data.day, i, 'do')}
                                   className="group/task flex gap-3 text-sm cursor-pointer items-start leading-snug"
                                 >
                                   <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                     isTaskDone(data.day, i, 'do') ? 'bg-purple-500 border-purple-500' : 'border-purple-500/20 group-hover/task:border-purple-500/40'
                                   }`}>
                                     {isTaskDone(data.day, i, 'do') && <Check size={10} className="text-white" />}
                                   </div>
                                   <span className={`transition-colors ${isTaskDone(data.day, i, 'do') ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                                     {item}
                                   </span>
                                 </li>
                               ))}
                            </ul>
                          </div>

                          {/* STEP 4: WRITE & DONE */}
                          <div className="flex flex-col gap-4">
                            <div className={`p-5 rounded-2xl border transition-all duration-300 flex-1 ${
                              data.review.every((_, i) => isTaskDone(data.day, i, 'review')) 
                              ? 'bg-zinc-900/10 border-zinc-800 opacity-50' 
                              : 'bg-amber-500/[0.02] border-amber-500/10 hover:border-amber-500/30'
                            }`}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2 text-amber-500 cursor-help w-fit mb-4">
                                    <Clock size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Step 4: Think</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>What to look for while you grade your work.</p>
                                </TooltipContent>
                              </Tooltip>
                              <ul className="space-y-3">
                                 {data.review.map((item, i) => (
                                   <li key={i} 
                                     onClick={() => toggleTask(data.day, i, 'review')}
                                     className="group/task flex gap-3 text-sm cursor-pointer items-start leading-snug"
                                   >
                                     <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                       isTaskDone(data.day, i, 'review') ? 'bg-amber-500 border-amber-500' : 'border-amber-500/20 group-hover/task:border-amber-500/40'
                                     }`}>
                                       {isTaskDone(data.day, i, 'review') && <Check size={10} className="text-white" />}
                                     </div>
                                     <span className={`transition-colors ${isTaskDone(data.day, i, 'review') ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                                       {item}
                                     </span>
                                   </li>
                                 ))}
                              </ul>
                            </div>

                            <div className="bg-emerald-500 p-4 rounded-2xl group/done transition-all hover:bg-emerald-400 active:scale-95 cursor-pointer shadow-xl shadow-emerald-500/20">
                               <div className="flex items-center justify-between">
                                 <div className="flex flex-col">
                                   <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-950/60">Final Step</span>
                                   <span className="text-emerald-950 font-bold text-sm">Log Your Progress</span>
                                 </div>
                                 <div className="w-8 h-8 rounded-full bg-emerald-950/10 flex items-center justify-center">
                                   <ArrowRight size={16} className="text-emerald-950" />
                                 </div>
                               </div>
                            </div>

                            <div className="bg-zinc-950/50 p-4 rounded-2xl border border-white/[0.03] group/deliverable">
                              <div className="flex items-center gap-2 text-rose-500 mb-1.5">
                                <AlertCircle size={12} />
                                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Deliverable</span>
                              </div>
                              <p className="text-zinc-400 text-[11px] leading-snug">{data.deliverable}</p>
                            </div>
                          </div>
                        </div>
                      </TooltipProvider>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
