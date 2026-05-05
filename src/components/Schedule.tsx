import React, { useState } from 'react';
import { scheduleData } from '../data';
import { Card, CardContent } from './ui/card';
import { ChevronDown, ChevronRight, Activity, FileCheck } from 'lucide-react';

export default function Schedule() {
  const [expanded, setExpanded] = useState<number[]>([1]);

  const toggle = (day: number) => {
    if (expanded.includes(day)) {
      setExpanded(expanded.filter(d => d !== day));
    } else {
      setExpanded([...expanded, day]);
    }
  };

  const expandAll = () => setExpanded(scheduleData.map(d => d.day));
  const collapseAll = () => setExpanded([]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight">14-Day Schedule</h2>
          <p className="text-zinc-400">Complete roadmap for Flaw and Principle mastery.</p>
        </div>
        <div className="flex gap-2 text-sm print:hidden">
          <button onClick={expandAll} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">Expand All</button>
          <button onClick={collapseAll} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">Collapse All</button>
        </div>
      </div>

      <div className="space-y-3">
        {scheduleData.map((data) => {
          const isExpanded = expanded.includes(data.day);
          return (
            <Card key={data.day} className="bg-zinc-900 border-zinc-800 transition-all duration-200 overflow-hidden">
              <button 
                onClick={() => toggle(data.day)}
                className={`w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 hover:bg-zinc-800/30 transition-colors ${isExpanded ? 'bg-zinc-800/20' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center text-zinc-500 font-medium font-mono text-sm">
                    Day {data.day}
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-200 text-lg">{data.focus}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-zinc-500">{data.title}</p>
                      {data.intensity && (
                        <span className={`text-[10px] uppercase font-medium px-2 py-0.5 rounded-full ${
                          data.intensity === 'High' ? 'bg-red-950/50 text-red-400 border border-red-900/50' : 
                          data.intensity === 'Medium' ? 'bg-amber-950/50 text-amber-400 border border-amber-900/50' : 
                          'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50'
                        }`}>
                          {data.intensity} Intensity
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-zinc-600">
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
              </button>
              
              {isExpanded && (
                <CardContent className="pt-2 pb-6 px-6 sm:pl-20 text-sm print:pl-4 print:pt-4">
                  <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6 pt-4 border-t border-zinc-800/50">
                    <div className="space-y-6">
                      <div>
                        <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px] block mb-1.5 flex items-center gap-1.5">
                          Open Files
                        </span>
                        <p className="text-zinc-300 font-medium"><span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs">{data.open}</span></p>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px] block mb-1.5">
                          Complete
                        </span>
                        <p className="text-zinc-300 leading-relaxed">{data.complete}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-emerald-950/10 border border-emerald-900/30 p-3 rounded-lg">
                        <span className="text-emerald-500 font-medium uppercase tracking-wider text-[10px] block mb-1.5">
                          Review Standard
                        </span>
                        <p className="text-emerald-100/80 leading-relaxed">{data.review}</p>
                      </div>
                      
                      {data.deliverable && (
                        <div className="flex items-start gap-2 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                          <FileCheck size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px] block mb-0.5">Output / Deliverable</span>
                            <p className="text-blue-100/70">{data.deliverable}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
