import React, { useState } from 'react';
import { flawHubData } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown, ChevronRight, AlertOctagon, Zap, ShieldAlert, FileSearch } from 'lucide-react';

export default function FlawHub() {
  const [expandedSection, setExpandedSection] = useState<string | null>('strategy');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight">Flaw Hub</h2>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Strategy, answer-choice categories, trap patterns, famous flaws, and review method.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Strategy Section */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('strategy')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Zap className="text-emerald-500" size={20} />
              <CardTitle className="text-xl">1. The Mindset</CardTitle>
            </div>
            {expandedSection === 'strategy' ? <ChevronDown className="text-zinc-500" /> : <ChevronRight className="text-zinc-500" />}
          </button>
          
          {expandedSection === 'strategy' && (
            <CardContent className="px-6 pb-6 pt-0 space-y-6">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="text-emerald-500 font-medium mb-2">What a Flaw question is really asking</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  The LSAT is not asking you to dislike the argument. It is asking you to identify the exact reasoning error that makes the evidence fail to prove the conclusion.
                </p>
                <p className="text-zinc-300 text-sm leading-relaxed mt-2 italic">
                  Read actively. Your job is to object: this argument fails because something is missing, mismatched, too broad, or unsupported.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-zinc-400 text-xs uppercase tracking-wider font-medium mb-3">Before answer choices, ask</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>What is the author trying to prove?</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>What evidence is used?</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>What must the author be assuming?</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>Is the conclusion stronger than the evidence?</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-zinc-400 text-xs uppercase tracking-wider font-medium mb-3">Common places the argument breaks</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>A hidden distinction</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>A scope shift</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>A cause/effect jump</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>A conditional reversal</li>
                    <li className="flex gap-2"><span className="text-zinc-600">•</span>A sample-to-population leap</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Answer Choice Styles Section */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('styles')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileSearch className="text-emerald-500" size={20} />
              <CardTitle className="text-xl">2. Three Answer-Choice Styles</CardTitle>
            </div>
            {expandedSection === 'styles' ? <ChevronDown className="text-zinc-500" /> : <ChevronRight className="text-zinc-500" />}
          </button>
          
          {expandedSection === 'styles' && (
            <CardContent className="px-6 pb-6 pt-0">
              <div className="grid gap-4 md:grid-cols-3">
                {flawHubData.styles.map((style, i) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                    <h4 className="text-zinc-200 font-medium mb-3">{style.style}</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Recognition Language</span>
                        <p className="text-zinc-300 italic">"{style.language}"</p>
                      </div>
                      <div>
                        <span className="block text-emerald-600 text-[10px] uppercase tracking-wider mb-1">Test</span>
                        <p className="text-zinc-400">{style.test}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Famous Flaws Section */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('flaws')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertOctagon className="text-emerald-500" size={20} />
              <CardTitle className="text-xl">3. Famous Flaw Map</CardTitle>
            </div>
            {expandedSection === 'flaws' ? <ChevronDown className="text-zinc-500" /> : <ChevronRight className="text-zinc-500" />}
          </button>
          
          {expandedSection === 'flaws' && (
            <CardContent className="px-6 pb-6 pt-0">
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                    <tr>
                      <th className="px-6 py-3 font-medium">Flaw</th>
                      <th className="px-6 py-3 font-medium">Plain-English test</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {flawHubData.famousFlaws.map((flaw, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-zinc-200">{flaw.flaw}</td>
                        <td className="px-6 py-4 text-zinc-400">{flaw.test}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Trap Patterns Section */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('traps')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-emerald-500" size={20} />
              <CardTitle className="text-xl">4. Trap Patterns (Fast Eliminators)</CardTitle>
            </div>
            {expandedSection === 'traps' ? <ChevronDown className="text-zinc-500" /> : <ChevronRight className="text-zinc-500" />}
          </button>
          
          {expandedSection === 'traps' && (
            <CardContent className="px-6 pb-6 pt-0">
              <div className="grid gap-3 sm:grid-cols-2">
                {flawHubData.traps.map((trap, i) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex gap-4">
                    <div className="w-1/3 flex-shrink-0 border-r border-zinc-800 py-1">
                      <span className="font-medium text-sm text-red-300">{trap.trap}</span>
                    </div>
                    <div className="py-1">
                      <p className="text-sm text-zinc-400">{trap.wrong}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      <section className="pt-8 border-t border-zinc-800">
        <h3 className="text-2xl font-medium text-zinc-100 mb-6 tracking-tight">Flaw Progressive Mastery</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(flawHubData.progressMastery).map(([level, questions], index) => (
            <div key={level} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/50">
                <h4 className="text-zinc-200 font-medium tracking-wide">Level {index + 1}</h4>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm">
                  {questions.map((q, i) => (
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
          ))}
        </div>
      </section>

      <section>
        <Card className="bg-emerald-950/10 border-emerald-900/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <CardHeader>
            <CardTitle className="text-emerald-500">Required Review Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300 leading-relaxed font-medium">
              The author concludes <span className="text-emerald-400 border-b border-emerald-900 px-2 mx-1">______</span> because <span className="text-emerald-400 border-b border-emerald-900 px-2 mx-1">______</span>. The problem is that the author assumes <span className="text-emerald-400 border-b border-emerald-900 px-2 mx-1">______</span>. The answer is correct because it describes that exact gap.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
