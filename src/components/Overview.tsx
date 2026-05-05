import React from 'react';
import { BookOpen, Calendar, FileText, CheckCircle2, Target, Zap, Search, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { HeroGeometric } from './ui/shape-landing-hero';
import { BentoGrid, BentoItem } from './ui/bento-grid';

export default function Overview({ userName, onStart }: { userName: string, onStart: () => void }) {
  const bentoItems: BentoItem[] = [
    {
      title: "Foundations",
      meta: "Week 01",
      description: "Identify argument components, spot underlying assumptions, and match basic principle frameworks.",
      icon: <Target className="w-5 h-5 text-emerald-500" />,
      status: "Starting",
      tags: ["Identification", "Assumptions"],
      colSpan: 2,
    },
    {
      title: "The Path",
      meta: "Methodology",
      description: "Start with Today View, review notes before drills, and log every mistake with a takeaway.",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-500" />,
      tags: ["Workflow"],
    },
    {
      title: "Daily Schedule",
      meta: "14 Days",
      description: "Your comprehensive roadmap for the next two weeks. Every assignment and review point defined.",
      icon: <Calendar className="w-5 h-5 text-emerald-500" />,
      cta: "Open Today →",
    },
    {
      title: "Advanced Logic",
      meta: "Week 02",
      description: "Principle Conform, Parallel Flaw bridge, and structure mapping. Refine your answer choice precision.",
      icon: <Zap className="w-5 h-5 text-purple-500" />,
      status: "Advanced",
      tags: ["Structure", "Precision"],
      colSpan: 2,
    },
    {
      title: "Flaw Packet",
      meta: "Core Resource",
      description: "Deep-dive worksheets and Progressive Mastery drills designed to expose logical gaps.",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      tags: ["Drills", "Logic"],
    },
    {
      title: "Principle Hub",
      meta: "Core Resource",
      description: "Strengthen Application, Conform work, and the final Parallel Flaw mastery module.",
      icon: <BookOpen className="w-5 h-5 text-purple-500" />,
      tags: ["Application", "Conform"],
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <HeroGeometric 
        badge="Personalized Study Plan"
        title1={`${userName}'s 14-Day`}
        title2="LSAT Mastery Hub"
      />

      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight font-serif italic">The Architecture</h2>
          <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
            A unified environment for your Flaw and Principle training. Use this blueprint to track progress, access resources, and refine your reasoning daily.
          </p>
        </div>

        <BentoGrid items={bentoItems} />

        <div className="pt-12 flex justify-center">
          <Button size="lg" onClick={onStart} className="w-full max-w-sm h-14 text-lg font-medium rounded-full bg-zinc-100 text-zinc-950 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Begin Today's Assignments
          </Button>
        </div>
      </div>
    </div>
  );
}

