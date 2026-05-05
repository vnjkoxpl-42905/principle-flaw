import React, { useState } from 'react';
import { scheduleData } from '../data';
import { Card, CardContent } from './ui/card';
import { ChevronDown, Calendar, Clock, Target, FileSearch, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function Schedule() {
  const [expanded, setExpanded] = useState<number[]>([1]);

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
        <h2 className="text-4xl font-serif italic text-white tracking-tight">Full 14-Day Schedule</h2>
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
                          {/* Open Packets */}
                          <div className="bg-zinc-950/30 p-5 rounded-2xl border border-white/[0.03] space-y-4 hover:border-white/10 transition-colors">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-zinc-500 cursor-help w-fit">
                                  <FileSearch size={14} />
                                  <span className="text-[9px] font-bold uppercase tracking-widest">Open Packets</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Packets and secondary documents needed for today's lesson.</p>
                              </TooltipContent>
                            </Tooltip>
                            <ul className="space-y-2">
                               {data.open.map((item, i) => (
                                 <li key={i} className="flex gap-2 text-sm text-zinc-300 font-light items-start leading-snug">
                                   <div className="w-1 h-1 rounded-full bg-zinc-700 mt-1.5 flex-shrink-0" />
                                   {item}
                                 </li>
                               ))}
                            </ul>
                          </div>

                          {/* Required Reading */}
                          <div className="bg-emerald-500/[0.02] p-5 rounded-2xl border border-emerald-500/10 space-y-4 hover:border-emerald-500/30 transition-colors">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-emerald-500 cursor-help w-fit">
                                  <BookOpen size={14} />
                                  <span className="text-[9px] font-bold uppercase tracking-widest">Required Reading</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Essential reading: notes, strategy guides, and reviews.</p>
                              </TooltipContent>
                            </Tooltip>
                            <ul className="space-y-2">
                               {data.read.map((item, i) => (
                                 <li key={i} className="flex gap-2 text-sm text-zinc-300 font-light items-start leading-snug">
                                   <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                   {item}
                                 </li>
                               ))}
                            </ul>
                          </div>
                          
                          {/* Homework Drills */}
                          <div className="bg-purple-500/[0.02] p-5 rounded-2xl border border-purple-500/10 space-y-4 hover:border-purple-500/30 transition-colors">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-purple-500 cursor-help w-fit">
                                  <Target size={14} />
                                  <span className="text-[9px] font-bold uppercase tracking-widest">Homework Drills</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Primary practice: worksheets, drills, and timed sections.</p>
                              </TooltipContent>
                            </Tooltip>
                            <ul className="space-y-2">
                               {data.do.map((item, i) => (
                                 <li key={i} className="flex gap-2 text-sm text-zinc-300 font-light items-start leading-snug">
                                   <div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                                   {item}
                                 </li>
                               ))}
                            </ul>
                          </div>

                          {/* Review & Deliverable */}
                          <div className="flex flex-col gap-6">
                            <div className="bg-amber-500/[0.02] p-5 rounded-2xl border border-amber-500/10 space-y-4 hover:border-amber-500/30 transition-colors flex-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2 text-amber-500 cursor-help w-fit">
                                    <Clock size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Review Points</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Mistake analysis: exactly what to explain for missed questions.</p>
                                </TooltipContent>
                              </Tooltip>
                              <ul className="space-y-2">
                                 {data.review.map((item, i) => (
                                   <li key={i} className="flex gap-2 text-sm text-zinc-300 font-light items-start leading-snug">
                                     <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                                     {item}
                                   </li>
                                 ))}
                              </ul>
                            </div>

                            <div className="bg-rose-500/[0.02] p-4 rounded-2xl border border-rose-500/10 group/deliverable transition-colors hover:bg-rose-500/[0.04]">
                              <div className="flex items-center gap-2 text-rose-500 mb-2">
                                <AlertCircle size={14} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Deliverable</span>
                              </div>
                              <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover/deliverable:text-zinc-400 transition-colors">{data.deliverable}</p>
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
