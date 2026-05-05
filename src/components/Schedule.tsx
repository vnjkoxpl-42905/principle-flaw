import React, { useState } from 'react';
import { scheduleData } from '../data';
import { Card, CardContent } from './ui/card';
import { ChevronDown, ChevronRight, Activity, FileCheck, Calendar, Clock, Target, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Schedule() {
  const [expanded, setExpanded] = useState<number[]>([1]);

  const toggle = (day: number) => {
    if (expanded.includes(day)) {
      setExpanded(expanded.filter(d => d !== day));
    } else {
      setExpanded([day]); // Only expand one at a time for cleaner focus
    }
  };

  const expandAll = () => setExpanded(scheduleData.map(d => d.day));
  const collapseAll = () => setExpanded([]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-zinc-900/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Calendar size={14} className="animate-pulse" />
            <span className="font-semibold text-[10px] uppercase tracking-[0.2em]">14-Day Roadmap</span>
          </div>
          <h2 className="text-4xl font-serif italic text-white tracking-tight">Student Schedule</h2>
        </div>
        
        <div className="flex gap-2 text-[10px] uppercase font-bold tracking-widest print:hidden">
          <button onClick={expandAll} className="px-4 py-2 bg-zinc-900/40 border border-white/[0.03] rounded-xl text-zinc-500 hover:text-white hover:border-white/10 transition-all">Expand All</button>
          <button onClick={collapseAll} className="px-4 py-2 bg-zinc-900/40 border border-white/[0.03] rounded-xl text-zinc-500 hover:text-white hover:border-white/10 transition-all">Collapse All</button>
        </div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {scheduleData.map((data) => {
          const isExpanded = expanded.includes(data.day);
          return (
            <Card key={data.day} className={`bg-zinc-900/20 backdrop-blur-sm border-zinc-800/50 transition-all duration-500 overflow-hidden group ${isExpanded ? 'border-zinc-700 bg-zinc-900/40' : 'hover:border-zinc-700'}`}>
              <button 
                onClick={() => toggle(data.day)}
                className={`w-full flex items-center justify-between p-6 text-left focus:outline-none transition-all duration-500 ${isExpanded ? 'pb-2' : ''}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-zinc-100 text-zinc-950 shadow-xl shadow-white/5' : 'bg-zinc-950/50 border border-white/[0.03] text-zinc-500'}`}>
                    <span className="text-[10px] uppercase font-bold tracking-tighter leading-none mb-1">Day</span>
                    <span className="text-xl font-serif italic leading-none">{data.day}</span>
                  </div>
                  <div>
                    <h3 className={`font-serif italic text-xl tracking-tight transition-colors duration-500 ${isExpanded ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {data.focus}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 px-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 group-hover:text-zinc-500 transition-colors uppercase">{data.title}</span>
                      {data.intensity && (
                        <div className="flex items-center gap-1.5 ml-2">
                          <div className={`w-1 h-1 rounded-full ${
                            data.intensity === 'High' ? 'bg-red-500' : 
                            data.intensity === 'Medium' ? 'bg-amber-500' : 
                            'bg-emerald-500'
                          }`} />
                          <span className="text-[8px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
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
                      <div className="grid lg:grid-cols-2 gap-10 pt-6 border-t border-white/[0.03]">
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/[0.05] flex items-center justify-center">
                                <FileSearch size={14} className="text-emerald-500" />
                              </div>
                              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Materials</span>
                            </div>
                            <div className="pl-11">
                                <span className="inline-flex items-center px-3 py-1 bg-black/40 border border-white/[0.03] rounded-lg text-xs text-zinc-400 font-medium">{data.open}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/[0.05] flex items-center justify-center">
                                <Target size={14} className="text-emerald-500" />
                              </div>
                              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Assignments</span>
                            </div>
                            <p className="pl-11 text-zinc-300 leading-relaxed font-light">{data.complete}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-8">
                          <div className="bg-emerald-950/20 border border-emerald-900/30 p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12" />
                            <div className="flex items-start gap-4 h-full relative z-10">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                <Clock size={20} className="text-emerald-500" />
                              </div>
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500/80">Review Standard</span>
                                <p className="text-zinc-300 leading-relaxed text-sm font-light italic">"{data.review}"</p>
                              </div>
                            </div>
                          </div>
                          
                          {data.deliverable && (
                            <div className="flex items-start gap-4 px-6 py-4 bg-zinc-950/40 p-3 rounded-2xl border border-white/[0.03]">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                <FileCheck size={20} className="text-blue-500" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 block">Deliverable</span>
                                <p className="text-zinc-400 text-sm font-light">{data.deliverable}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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

