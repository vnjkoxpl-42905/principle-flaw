import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronLeft, ChevronRight, RotateCcw, Filter, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { flashcards, Flashcard } from '../data';

export default function FlashcardsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [mastered, setMastered] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('lsatFlashcardMastery');
    return saved ? JSON.parse(saved) : {};
  });

  const filteredCards = flashcards.filter(c => filter === 'All' || c.topic === filter);
  const currentCard = filteredCards[currentIndex];

  useEffect(() => {
    localStorage.setItem('lsatFlashcardMastery', JSON.stringify(mastered));
  }, [mastered]);

  const toggleMastery = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMastered(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  if (filteredCards.length === 0) return <div>No cards found.</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-900/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Zap size={18} className="fill-current" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em]">Knowledge Retrieval</h2>
          </div>
          <h1 className="text-4xl font-serif italic text-white tracking-tight">Active Recall</h1>
          <p className="text-zinc-500 mt-2 font-light">Don't recognize. Recite.</p>
        </div>

        <div className="flex flex-wrap gap-2 bg-zinc-900/30 p-2 rounded-2xl border border-white/[0.03]">
          {['All', 'Flaw', 'Principle', 'Parallel', 'Review'].map(t => (
            <button
              key={t}
              onClick={() => { setFilter(t); setCurrentIndex(0); setIsFlipped(false); }}
              className={`text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all ${filter === t ? 'bg-zinc-100 text-zinc-950 shadow-lg shadow-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-12 py-10">
        <div 
          className="relative w-full max-w-2xl aspect-[4/3] cursor-pointer group"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: '2000px' }}
        >
          <motion.div
            className="w-full h-full relative preserve-3d"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-zinc-900/10 backdrop-blur-md rounded-[32px] border border-white/[0.05] p-12 flex flex-col justify-between shadow-2xl overflow-hidden group-hover:border-white/[0.08] transition-colors">
              <div className="absolute top-0 right-0 p-8">
                <Button 
                   variant="ghost" 
                   className={`rounded-full p-3 h-auto ${mastered[currentCard.id] ? 'bg-emerald-500/10 text-emerald-500' : 'bg-transparent text-zinc-700 hover:text-white'}`}
                   onClick={(e) => toggleMastery(currentCard.id, e)}
                >
                  {mastered[currentCard.id] ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </Button>
              </div>
              <div className="mt-8">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-4">{currentCard.topic} • {currentCard.tag}</span>
                <p className="text-3xl font-serif italic text-white leading-tight">{currentCard.front}</p>
              </div>
              <div className="flex justify-center">
                 <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest animate-pulse">Click to Reveal</span>
              </div>
              
              {/* Subtle background glow */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full" />
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 backface-hidden bg-zinc-100 rounded-[32px] border border-white p-12 flex flex-col justify-center shadow-2xl"
              style={{ transform: 'rotateY(180) translateZ(1px)' }}
            >
              <div className="absolute top-0 right-0 p-8">
                 <span className="text-[10px] font-bold text-zinc-950/20 uppercase tracking-widest font-mono">Answer</span>
              </div>
              <p className="text-xl leading-relaxed text-zinc-900 font-medium">{currentCard.back}</p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-12">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={prevCard} 
            className="w-16 h-16 rounded-full border border-zinc-900/50 hover:bg-zinc-900/50 text-zinc-400 hover:text-white transition-all shadow-xl"
          >
            <ChevronLeft size={32} />
          </Button>

          <div className="flex flex-col items-center gap-4 min-w-[120px]">
             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{currentIndex + 1} / {filteredCards.length}</span>
             <div className="w-full h-1 bg-zinc-900/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                />
             </div>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={nextCard} 
            className="w-16 h-16 rounded-full border border-zinc-900/50 hover:bg-zinc-900/50 text-zinc-400 hover:text-white transition-all shadow-xl"
          >
            <ChevronRight size={32} />
          </Button>
        </div>

        <Button 
          variant="ghost" 
          onClick={handleReset} 
          className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:text-zinc-300 gap-2"
        >
          <RotateCcw size={12} /> Restart Deck
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-zinc-900/50">
        <div className="space-y-4">
           <h3 className="text-sm font-serif italic text-zinc-300 px-2">Mastery Progress</h3>
           <div className="bg-zinc-900/20 rounded-[24px] border border-white/[0.03] p-8 flex items-center justify-between">
              <div>
                 <span className="text-4xl font-bold text-white leading-none">
                    {Object.values(mastered).filter(Boolean).length}
                 </span>
                 <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest ml-3">Cards Learned</span>
              </div>
              <div className="h-12 w-px bg-zinc-800" />
              <div className="text-right">
                 <span className="text-zinc-500 text-sm italic font-light">
                    {Math.round((Object.values(mastered).filter(Boolean).length / flashcards.length) * 100)}% Complete
                 </span>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-serif italic text-zinc-300 px-2">Efficiency Tip</h3>
           <div className="bg-zinc-900/20 rounded-[24px] border border-white/[0.03] p-8">
              <p className="text-xs text-zinc-500 font-light leading-relaxed italic">
                Active recall is the fastest way to solidify your logical tools. If you can't explain a concept in a dark room with no notes, you don't know it yet.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
