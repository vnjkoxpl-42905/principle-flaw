import React from 'react';
import { principleHubData } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, Info, Map, Terminal, ListChecks, Zap, ArrowRightLeft, Target } from 'lucide-react';

const HubSection = ({ title, icon: Icon, children, step }: { title: string, icon: any, children: React.ReactNode, step?: string }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
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

export default function PrincipleHub() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <HubSection title="What Principle asks" icon={Info} step="Introduction">
        <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-2xl">
          Principle questions ask you to work with <span className="text-zinc-100 font-medium">rules</span>. Sometimes the rule is in the stimulus and you apply it to a situation. Sometimes the situation is in the stimulus and you find the rule.
        </p>
        <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-500/20 inline-block">
          <p className="text-xs text-blue-400 font-medium">Core Concept: Principles are general rules that bridge the gap or govern the logic.</p>
        </div>
      </HubSection>

      <HubSection title="Principle is not one type" icon={Zap} step="Classification">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principleHubData.forms.map((form, i) => (
            <div key={i} className="bg-zinc-900/40 p-4 rounded-xl border border-white/[0.03]">
              <strong className="text-zinc-100 block mb-1 text-sm">{form.form}</strong>
              <p className="text-[11px] text-zinc-500 mb-2">{form.asks}</p>
              <div className="p-2 bg-zinc-950/50 rounded-lg">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block mb-0.5">The Move</span>
                <p className="text-[11px] text-zinc-400">{form.move}</p>
              </div>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection title="Rule / Trigger / Application / Outcome" icon={ArrowRightLeft} step="The Framework">
        <p className="text-sm text-zinc-400 font-light">Every principle has four parts. If you miss one, you miss the question.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { t: "Rule", d: "The 'If... then' statement." },
            { t: "Trigger", d: "The condition that starts it." },
            { t: "Application", d: "The specific case provided." },
            { t: "Outcome", d: "The result of the rule." }
          ].map((item, i) => (
            <div key={i} className="text-center p-4 rounded-xl border border-white/5 bg-zinc-950/30">
              <span className="text-xs font-bold text-blue-400 block mb-1">{item.t}</span>
              <p className="text-[10px] text-zinc-500 leading-tight">{item.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
           <p className="text-xs text-zinc-500"><span className="text-rose-500 font-bold">Common Mistake:</span> Outcome Overload. Picking a rule that has the right outcome but the wrong trigger.</p>
        </div>
      </HubSection>

      <HubSection title="Major Types Breakdown" icon={Target} step="Deep Dive">
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-200">Principle Strengthen / Application</h4>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">Find the rule that makes the argument valid. High-force language is usually good here. Look for "any," "all," "never."</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-200">Principle Conform</h4>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">Pick a rule that most closely mirrors the author's reasoning. Do not exceed the power of the argument.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-200">Parallel Flaw Bridge</h4>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">The hardest type. You must identify the flaw pattern AND mirror it in a new situation.</p>
          </div>
        </div>
      </HubSection>

      <HubSection title="Self-Check" icon={CheckCircle2} step="Verification">
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/[0.03] space-y-4">
          <p className="text-sm text-zinc-300">Ready to drill?</p>
          <ul className="space-y-2">
            {[
              "Do I know which side of the arrow the conclusion goes on?",
              "Can I spot 'only if' reversal traps?",
              "Can I map a principle in under 15 seconds?"
            ].map((q, i) => (
              <li key={i} className="flex gap-3 text-xs text-zinc-400">
                <div className="w-4 h-4 rounded-md border border-zinc-700 mt-0.5" />
                {q}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full rounded-xl border-white/[0.05] text-xs font-bold uppercase tracking-widest border-blue-500/20 text-blue-400 hover:bg-blue-500/5">
            Go to Practice
          </Button>
        </div>
      </HubSection>
    </div>
  );
}
