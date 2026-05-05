import React from 'react';
import { BookOpen, Calendar, FileText, CheckCircle2, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { HeroGeometric } from './ui/shape-landing-hero';

export default function Overview({ userName, onStart }: { userName: string, onStart: () => void }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <HeroGeometric 
        badge="Personalized Study Plan"
        title1={`${userName}'s 14-Day`}
        title2="LSAT Mastery Hub"
      />

      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight font-serif italic">Your Strategy</h2>
          <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
            This hub combines your Schedule, Flaw Packet, and Principle Packet into one clean, interactive workflow. Use this dashboard daily to track instructions, study smartly, and log your review points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-zinc-900/40 backdrop-blur-sm border-zinc-800 hover:border-emerald-900/50 transition-all duration-500 overflow-hidden group">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 text-emerald-500 mb-2 transition-transform duration-500 group-hover:translate-x-1">
                <Target size={24} />
                <CardTitle className="text-2xl font-serif italic">This Week's Focus</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative pl-4 border-l-2 border-emerald-900/30">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-2">Week 1: Foundations</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Identifying argument components, spotting assumptions, and matching basic principle frameworks.</p>
              </div>
              <div className="relative pl-4 border-l-2 border-emerald-900/30">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-2">Week 2: Advanced Logic</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Principle Conform, mixed review, and the Parallel Flaw bridge. Refining precision and structure mapping.</p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50">
                <p className="text-xs text-zinc-500 italic">Alternating Flaw and Principle prevents burnout while attacking the same underlying relationship-tracking skillset.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/40 backdrop-blur-sm border-zinc-800 hover:border-blue-900/50 transition-all duration-500 overflow-hidden group">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 text-blue-500 mb-2 transition-transform duration-500 group-hover:translate-x-1">
                <CheckCircle2 size={24} />
                <CardTitle className="text-2xl font-serif italic">The Path Forward</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-zinc-400">
                {[
                  { title: "Start with Today View", desc: "Identify your exact assignments for the current day." },
                  { title: "Review Before Drill", desc: "Always read recap notes before starting homework." },
                  { title: "Complete & Log", desc: "Do not move on until you've logged mistakes and takeaways." },
                  { title: "Tutoring Prep", desc: "Mark questions that remain unclear after self-review." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start group/item">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 mt-0.5 group-hover/item:bg-blue-900 group-hover/item:text-blue-100 transition-colors">
                      {i + 1}
                    </span>
                    <div>
                      <strong className="text-zinc-200 block mb-0.5">{item.title}</strong>
                      <span className="text-zinc-400 text-xs">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "Schedule", colorClass: "bg-emerald-950/30", iconClass: "text-emerald-500", borderClass: "border-emerald-900/30", desc: "Your daily roadmap. Tells you what to open, complete, and review." },
            { icon: FileText, title: "Flaw Packet", colorClass: "bg-blue-950/30", iconClass: "text-blue-500", borderClass: "border-blue-900/30", desc: "Notes, worksheets, and Progressive Mastery drills in one place." },
            { icon: BookOpen, title: "Principle Hub", colorClass: "bg-purple-950/30", iconClass: "text-purple-500", borderClass: "border-purple-900/30", desc: "Recaps, homework, Application, Conform, and Parallel bridge." }
          ].map((item, i) => (
            <Card key={i} className="bg-zinc-900/20 backdrop-blur-none border-zinc-800/50 hover:bg-zinc-900/40 transition-colors duration-300">
              <CardHeader className="p-5">
                <div className={`w-12 h-12 rounded-xl ${item.colorClass} flex items-center justify-center mb-4 border ${item.borderClass}`}>
                  <item.icon className={item.iconClass} size={24} />
                </div>
                <CardTitle className="font-serif italic text-xl">{item.title}</CardTitle>
                <CardDescription className="text-zinc-500 leading-relaxed text-xs">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="pt-12 flex justify-center">
          <Button size="lg" onClick={onStart} className="w-full max-w-sm h-14 text-lg font-medium rounded-full bg-zinc-100 text-zinc-950 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Go to My Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
