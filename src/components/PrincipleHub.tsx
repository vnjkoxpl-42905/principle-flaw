import React, { useState } from 'react';
import { principleHubData } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown, ChevronRight, Scale, ShieldAlert, Navigation } from 'lucide-react';

export default function PrincipleHub() {
  const [expandedSection, setExpandedSection] = useState<string | null>('forms');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight">Principle Hub</h2>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          The bridge between Flaw and Structure. Strengthen, Conform, and Parallel reasoning.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Forms Section */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('forms')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Scale className="text-emerald-500" size={20} />
              <CardTitle className="text-xl">1. Five Principle Forms</CardTitle>
            </div>
            {expandedSection === 'forms' ? <ChevronDown className="text-zinc-500" /> : <ChevronRight className="text-zinc-500" />}
          </button>
          
          {expandedSection === 'forms' && (
            <CardContent className="px-6 pb-6 pt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {principleHubData.forms.map((formObj, i) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
                    <div className="bg-zinc-900/80 px-4 py-3 border-b border-zinc-800/50">
                      <h4 className="text-emerald-400 font-medium tracking-wide text-sm">{formObj.form}</h4>
                    </div>
                    <div className="p-4 space-y-4 flex-1">
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase tracking-wider mb-1">It asks</span>
                        <p className="text-zinc-300 text-sm leading-relaxed">{formObj.asks}</p>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Your Move</span>
                        <p className="text-zinc-400 text-sm leading-relaxed">{formObj.move}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Wrong Patterns Section */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('patterns')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-emerald-500" size={20} />
              <CardTitle className="text-xl">2. Trap Patterns (Fast Eliminators)</CardTitle>
            </div>
            {expandedSection === 'patterns' ? <ChevronDown className="text-zinc-500" /> : <ChevronRight className="text-zinc-500" />}
          </button>
          
          {expandedSection === 'patterns' && (
            <CardContent className="px-6 pb-6 pt-0">
              <div className="grid gap-3 sm:grid-cols-2">
                {principleHubData.wrongPatterns.map((trap, i) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex gap-4">
                    <div className="w-1/3 flex-shrink-0 border-r border-zinc-800 py-1 pr-2">
                      <span className="font-medium text-sm text-red-300">{trap.pattern}</span>
                    </div>
                    <div className="py-1">
                      <p className="text-sm text-zinc-400">{trap.catch}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      <section className="pt-8 border-t border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <Navigation className="text-blue-500" size={24} />
          <h3 className="text-2xl font-medium text-zinc-100 tracking-tight">Principle Mastery Drills</h3>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Strengthen Drill */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col">
            <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/50">
              <h4 className="text-zinc-200 font-medium tracking-wide">Strengthen (Drill)</h4>
            </div>
            <div className="p-4 flex-1">
              <ul className="space-y-3 text-sm">
                {principleHubData.strengthenDrill.map((q, i) => (
                  <li key={i} className="flex justify-between items-center group">
                    <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Q{i + 1}</span>
                    <span className="text-zinc-300 font-mono bg-zinc-950 px-2 flex items-center py-1 rounded border border-zinc-800/50">
                      <span className="text-zinc-500 mr-2 text-[10px] uppercase">PT{q.pt} S{q.sec}</span>
                      Q{q.q}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strengthen Timed */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col">
            <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/50">
              <h4 className="text-zinc-200 font-medium tracking-wide">Strengthen (Timed)</h4>
            </div>
            <div className="p-4 flex-1">
              <ul className="space-y-3 text-sm">
                {principleHubData.strengthenTimed.map((q, i) => (
                  <li key={i} className="flex justify-between items-center group">
                    <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Q{i + 1}</span>
                    <span className="text-zinc-300 font-mono bg-zinc-950 px-2 flex items-center py-1 rounded border border-zinc-800/50">
                      <span className="text-zinc-500 mr-2 text-[10px] uppercase">PT{q.pt} S{q.sec}</span>
                      Q{q.q}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Conform Drill */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col">
            <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/50">
              <h4 className="text-zinc-200 font-medium tracking-wide">Conform (Drill)</h4>
            </div>
            <div className="p-4 flex-1">
              <ul className="space-y-3 text-sm">
                {principleHubData.conformDrill.map((q, i) => (
                  <li key={i} className="flex justify-between items-center group">
                    <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Q{i + 1}</span>
                    <span className="text-zinc-300 font-mono bg-zinc-950 px-2 flex items-center py-1 rounded border border-zinc-800/50">
                      <span className="text-zinc-500 mr-2 text-[10px] uppercase">PT{q.pt} S{q.sec}</span>
                      Q{q.q}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Parallel Bridge */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col">
            <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/50">
              <h4 className="text-zinc-200 font-medium tracking-wide">Parallel Bridge</h4>
            </div>
            <div className="p-4 flex-1">
              <ul className="space-y-3 text-sm h-[250px] overflow-y-auto custom-scrollbar pr-2">
                {principleHubData.parallelBridge.map((q, i) => (
                  <li key={i} className="flex justify-between items-center group">
                    <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Q{i + 1}</span>
                    <span className="text-zinc-300 font-mono bg-zinc-950 px-2 flex items-center py-1 rounded border border-zinc-800/50">
                      <span className="text-zinc-500 mr-2 text-[10px] uppercase">PT{q.pt} S{q.sec}</span>
                      Q{q.q}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
      
      <section>
        <Card className="bg-blue-950/10 border-blue-900/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <CardHeader>
            <CardTitle className="text-blue-500">Required Review Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300 leading-relaxed font-medium">
              The author's structure was <span className="text-blue-400 border-b border-blue-900 px-2 mx-1">______</span>. The correct answer matched this because its structure was <span className="text-blue-400 border-b border-blue-900 px-2 mx-1">______</span>. The wrong answer I picked failed because it changed <span className="text-blue-400 border-b border-blue-900 px-2 mx-1">______</span>.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
