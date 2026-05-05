import React from 'react';
import { flawHubData } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, Info, Map, Terminal, ListChecks } from 'lucide-react';

export const Section = ({ title, icon: Icon, children, step }: { title: string, icon: any, children: React.ReactNode, step?: string }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          {step && <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{step}</span>}
          <h3 className="text-xl font-serif italic text-zinc-100">{title}</h3>
        </div>
      </div>
      <div className="pl-11 space-y-4">
        {children}
      </div>
    </div>
  );

export default function FlawHub() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Section title="What Flaw asks" icon={Info} step="Introduction">
        <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-2xl">
          The LSAT is not asking if you disagree with the author. It is asking for the <span className="text-zinc-100 font-medium">logical breakdown</span>. Your job is to find the gap between the evidence and the conclusion.
        </p>
        <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20 inline-block">
          <p className="text-xs text-emerald-400 font-medium">Warning: Do not pick an answer just because you think the conclusion is wrong. Pick it because it explains the bad reasoning.</p>
        </div>
      </Section>

      <Section title="The 4-Step Method" icon={ListChecks} step="Core Process">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Conclusion", d: "What is the author trying to prove?", s: "Underline it." },
            { t: "Evidence", d: "What facts are provided?", s: "Identify the 'since' or 'because'." },
            { t: "Assumption", d: "What is the missing link?", s: "Ask: what if this link was broken?" },
            { t: "Flaw", d: "Name the error.", s: "State the gap in plain English." }
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900/40 p-4 rounded-xl border border-white/[0.03]">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1 block">Step {i+1}</span>
              <strong className="text-zinc-100 block mb-1">{item.t}</strong>
              <p className="text-[11px] text-zinc-400 mb-2 leading-tight">{item.d}</p>
              <p className="text-[10px] text-emerald-500 font-bold italic">{item.s}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Answer-choice styles" icon={Terminal} step="Recognition">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flawHubData.styles.map((style, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-sm font-bold text-zinc-200">{style.style}</h4>
              <p className="text-xs text-zinc-500 italic">"{style.language}"</p>
              <div className="p-3 bg-zinc-950/50 rounded-lg border border-white/[0.03]">
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-1">What to do</span>
                <p className="text-[11px] text-zinc-400">{style.test}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Common Traps" icon={AlertCircle} step="Avoid This">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flawHubData.traps.map((trap, i) => (
            <div key={i} className="flex gap-4 p-4 bg-rose-950/5 border border-rose-950/20 rounded-xl">
              <div className="w-1/3 flex-shrink-0 border-r border-rose-950/20 pr-4">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">{trap.trap}</span>
              </div>
              <div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">{trap.wrong}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
          <p className="text-xs text-zinc-500"><span className="text-rose-500 font-bold">Common Mistake:</span> Picking "Wrong Flaw Label" because you recognized a word you learned, even though it doesn't fit the stimulus.</p>
        </div>
      </Section>

      <Section title="Famous Flaw Map" icon={Map} step="Encyclopedia">
        <div className="overflow-hidden rounded-2xl border border-white/[0.03] bg-zinc-900/10">
          <table className="w-full text-left">
            <thead className="bg-zinc-950/50 border-b border-white/[0.03]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Flaw</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Plain-English Test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {flawHubData.famousFlaws.map((flaw, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-zinc-200">{flaw.flaw}</td>
                  <td className="px-6 py-4 text-xs text-zinc-400 font-light">{flaw.test}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Self-Check" icon={CheckCircle2} step="Verification">
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/[0.03] space-y-4">
          <p className="text-sm text-zinc-300">Before moving to practice, can you answer these?</p>
          <ul className="space-y-2">
            {[
              "Can I find the conclusion in under 10 seconds?",
              "Do I know the difference between 'takes for granted' and 'fails to consider'?",
              "Can I explain the argument to a 10-year-old?"
            ].map((q, i) => (
              <li key={i} className="flex gap-3 text-xs text-zinc-400">
                <div className="w-4 h-4 rounded-md border border-zinc-700 mt-0.5" />
                {q}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full rounded-xl border-white/[0.05] text-xs font-bold uppercase tracking-widest">
            Go to Practice
          </Button>
        </div>
      </Section>
    </div>
  );
}
