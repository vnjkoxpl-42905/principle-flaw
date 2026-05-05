/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, CheckSquare, FileText, LayoutDashboard, Printer, User, Target } from 'lucide-react';
import Overview from './components/Overview';
import TodayView from './components/TodayView';
import Schedule from './components/Schedule';
import Learn from './components/Learn';
import Practice from './components/Practice';
import ReviewLog from './components/ReviewLog';
import WelcomeScreen from './components/WelcomeScreen';
import Profile from './components/Profile';

import { ElegantShape } from './components/ui/shape-landing-hero';

export type Tab = 'start' | 'today' | 'schedule' | 'learn' | 'practice' | 'review' | 'profile';

export default function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('lsatStudentName');
    if (savedName) {
      setUserName(savedName);
    }
    const savedDay = localStorage.getItem('lsatCurrentDay');
    if (savedDay) {
      const parsedDay = parseInt(savedDay, 10);
      if (!isNaN(parsedDay) && parsedDay >= 1 && parsedDay <= 14) {
        setCurrentDay(parsedDay);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSaveName = (name: string) => {
    localStorage.setItem('lsatStudentName', name);
    setUserName(name);
  };

  const handleSetDay = (day: number) => {
    setCurrentDay(day);
    localStorage.setItem('lsatCurrentDay', day.toString());
  };

  const startToday = () => {
    setActiveTab('today');
  };

  const setTabAndScroll = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    localStorage.removeItem('lsatStudentName');
    localStorage.removeItem('lsatCurrentDay');
    localStorage.removeItem('lsatReviewLogs');
    localStorage.removeItem('lsatCompletedDays');
    localStorage.removeItem('lsatDailyChecklists');
    setUserName(null);
    setCurrentDay(1);
    setActiveTab('today');
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#030303]"></div>;

  if (!userName) {
    return <WelcomeScreen onSaveName={handleSaveName} />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-emerald-900 selection:text-white overflow-hidden relative">
      {/* Global Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        <ElegantShape
          delay={1}
          width={400}
          height={80}
          rotate={-15}
          gradient="from-indigo-500/[0.1]"
          className="left-[-5%] top-[10%]"
        />
        <ElegantShape
          delay={1.5}
          width={300}
          height={60}
          rotate={10}
          gradient="from-emerald-500/[0.1]"
          className="right-[-5%] bottom-[15%]"
        />
      </div>

      <div className="flex h-screen relative z-10 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-900 bg-black/40 backdrop-blur-md flex-shrink-0 lg:flex flex-col hidden">
          <div className="h-20 flex flex-col justify-center px-6 border-b border-zinc-900/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">LSAT Mastery</span>
            <h1 className="text-sm font-serif italic text-zinc-200 tracking-tight">{userName}</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            <div className="pb-3 px-3">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Plan</span>
            </div>
            <NavItem icon={<LayoutDashboard size={16} />} label="Start Here" active={activeTab === 'start'} onClick={() => setTabAndScroll('start')} />
            <NavItem icon={<CheckSquare size={16} />} label="Today" active={activeTab === 'today'} onClick={() => setTabAndScroll('today')} />
            <NavItem icon={<Calendar size={16} />} label="Schedule" active={activeTab === 'schedule'} onClick={() => setTabAndScroll('schedule')} />
            
            <div className="pt-8 pb-3 px-3">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Training</span>
            </div>
            <NavItem icon={<FileText size={16} />} label="Learn" active={activeTab === 'learn'} onClick={() => setTabAndScroll('learn')} />
            <NavItem icon={<Target size={16} />} label="Practice" active={activeTab === 'practice'} onClick={() => setTabAndScroll('practice')} />
            <NavItem icon={<BookOpen size={16} />} label="Review Log" active={activeTab === 'review'} onClick={() => setTabAndScroll('review')} />
          </nav>

          <div className="p-4 border-t border-zinc-900/50 space-y-1">
            <button
              onClick={() => setTabAndScroll('profile')}
              className={`flex items-center gap-3 w-full px-3 py-2 text-xs rounded-lg transition-all duration-300 ${
                activeTab === 'profile' 
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-lg shadow-white/5' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <User size={16} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-3 w-full px-3 py-2 text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50 rounded-lg transition-all"
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-screen overflow-y-auto bg-transparent print:bg-white print:text-black custom-scrollbar">
          {/* Mobile Header */}
          <div className="lg:hidden h-16 border-b border-zinc-900 bg-black/60 backdrop-blur-lg flex items-center justify-between px-6 sticky top-0 z-50 print:hidden">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">LSAT Mastery</span>
              <h1 className="text-sm font-serif italic text-zinc-100 tracking-tight">{userName}</h1>
            </div>
            <select 
              value={activeTab}
              onChange={(e) => setTabAndScroll(e.target.value as Tab)}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs px-3 py-1.5 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            >
              <optgroup label="Plan">
                <option value="start">Start Here</option>
                <option value="today">Today</option>
                <option value="schedule">Schedule</option>
              </optgroup>
              <optgroup label="Training">
                <option value="learn">Learn</option>
                <option value="practice">Practice</option>
                <option value="review">Review Log</option>
              </optgroup>
              <optgroup label="Settings">
                <option value="profile">Profile</option>
              </optgroup>
            </select>
          </div>

          <div className="p-6 sm:p-10 md:p-16 max-w-6xl mx-auto print:max-w-none print:p-0 relative">
            {activeTab === 'start' && <Overview userName={userName} onStart={startToday} />}
            {activeTab === 'today' && <TodayView userName={userName} day={currentDay} setDay={handleSetDay} />}
            {activeTab === 'schedule' && <Schedule />}
            {activeTab === 'learn' && <Learn />}
            {activeTab === 'practice' && <Practice currentDay={currentDay} />}
            {activeTab === 'review' && <ReviewLog />}
            {activeTab === 'profile' && <Profile currentName={userName} onUpdateName={handleSaveName} onReset={handleReset} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
        active 
          ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-lg shadow-white/5' 
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
      }`}
    >
      <span className={active ? 'text-zinc-950' : 'text-zinc-600'}>{icon}</span>
      <span className="truncate">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTabIndicator" 
          className="ml-auto w-1 h-4 bg-zinc-950 rounded-full" 
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}
