/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ROOM_ROWS } from '../data';
import { 
  Building2, 
  Sparkles, 
  BarChart2, 
  List, 
  ArrowRight, 
  Layers, 
  Users, 
  DollarSign, 
  PieChart,
  Grid
} from 'lucide-react';

interface RoomSceneProps {
  progress: number;
}

type TabType = 'Job Application' | 'Fundraising Progress' | 'Customer Conversation';
type ModeType = 'Table' | 'Insight';

export default function RoomScene({ progress }: RoomSceneProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Job Application');
  const [activeMode, setActiveMode] = useState<ModeType>('Table');
  const [interviewStatus, setInterviewStatus] = useState<string | null>(null);

  // Sync state cleanly with the scroll progress in real-time
  React.useEffect(() => {
    if (progress >= 1400 && progress <= 3150) {
      const step = (3150 - 1400) / 6;
      const relative = progress - 1400;
      const phase = Math.min(5, Math.floor(relative / step));

      if (phase === 0) {
        setActiveTab('Job Application');
        setActiveMode('Table');
      } else if (phase === 1) {
        setActiveTab('Job Application');
        setActiveMode('Insight');
      } else if (phase === 2) {
        setActiveTab('Fundraising Progress');
        setActiveMode('Table');
      } else if (phase === 3) {
        setActiveTab('Fundraising Progress');
        setActiveMode('Insight');
      } else if (phase === 4) {
        setActiveTab('Customer Conversation');
        setActiveMode('Table');
      } else if (phase === 5) {
        setActiveTab('Customer Conversation');
        setActiveMode('Insight');
      }
    }
  }, [progress]);

  // Visibility tracking
  const isVisible = progress >= 1200 && progress <= 3500;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150;

  if (progress >= 1200 && progress < 1400) {
    // Coming In
    const ratio = (progress - 1200) / 200;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 1400 && progress <= 3150) {
    // Active
    opacity = 1;
    translateY = 0;
  } else if (progress > 3150 && progress <= 3500) {
    // Going Out towards Search
    const ratio = (progress - 3150) / 350;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  // Define Insights contents
  const renderJobInsight = () => (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      <div className="flex-1">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-3 block">
          Status Breakdown
        </h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#f0faf5] border border-emerald-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-emerald-800">ACCEPTED</span>
            <span className="font-serif text-3xl font-semibold text-emerald-950 mt-1">1</span>
          </div>
          <div className="bg-[#f0f6ff] border border-blue-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-blue-800">INTERVIEWS</span>
            <span className="font-serif text-3xl font-semibold text-blue-950 mt-1">2</span>
          </div>
          <div className="bg-yellow-50/50 border border-yellow-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-yellow-800 font-semibold">APPLIED</span>
            <span className="font-serif text-3xl font-semibold text-yellow-950 mt-1">1</span>
          </div>
          <div className="bg-rose-50/50 border border-rose-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-rose-800">REJECTED</span>
            <span className="font-serif text-3xl font-semibold text-rose-950 mt-1">1</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-zinc-200 pl-0 md:pl-6 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
            Active Application momentum
          </h4>
          <p className="font-serif text-[13px] text-zinc-700 italic leading-relaxed mb-4">
            "Candidate pipeline shows consistent engagement. Interviews at Linear App and Supabase indicate great valuation matching. Re-routing technical assessment parameters looks optimal."
          </p>
        </div>
        <div className="p-3 bg-paper rounded border border-zinc-200/60 font-mono text-[10px] text-zinc-500">
          📍 Nudge: 1 follow-up pending
        </div>
      </div>
    </div>
  );

  const renderFundraisingInsight = () => (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      <div className="flex-1">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
          Total Amount of Funding Raised
        </h4>
        <div className="font-serif text-4xl font-semibold text-zinc-900 tracking-tight flex items-center mb-1">
          <span className="text-zinc-400 font-sans mr-1">$</span>4,750,000
          <span className="font-mono text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-3 font-normal uppercase tracking-wider">
            Seed Concentrated
          </span>
        </div>
        <p className="font-serif italic text-xs text-zinc-500 mb-4">
          Target round target threshold: $5.0M
        </p>

        <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-700 mb-2 border-b border-zinc-200 pb-1 flex items-center gap-1">
          Recent Activities
        </h4>
        <div className="flex flex-col gap-2.5 font-sans text-xs">
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-zinc-400 w-16">Jun 20</span>
            <div className="flex-1">
              <span className="font-semibold text-zinc-800">Scott Adams</span> approved Slide 12 financials.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-zinc-400 w-16">Jun 15</span>
            <div className="flex-1">
              Term sheet parsed and committed with <span className="font-semibold">Founders Circle Series Seed</span>.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-zinc-400 w-16">May 28</span>
            <div className="flex-1">
              Opening valuation finalized with general counsel legal counsel.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-zinc-200 pl-0 md:pl-6">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
          Cap-table Highlights
        </h4>
        <div className="space-y-2 font-mono text-[10px] text-zinc-600">
          <div className="flex justify-between">
            <span>Founders Common:</span>
            <span className="text-zinc-900">76.4%</span>
          </div>
          <div className="flex justify-between">
            <span>Option Pool Reserved:</span>
            <span className="text-zinc-900">12.0%</span>
          </div>
          <div className="flex justify-between">
            <span>Founders Circle VC:</span>
            <span className="text-emerald-700 font-semibold">11.6%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerInsight = () => (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      <div className="flex-1">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-3">
          Conversation Topics Curation
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-mono text-[10px] bg-[#fffbf0] text-amber-800 border border-amber-200 px-2.5 py-1 rounded">
            💬 Drawer slip ejection flow
          </span>
          <span className="font-mono text-[10px] bg-[#f0faf5] text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded">
            ⚙️ Chrome mobile touch intercept
          </span>
          <span className="font-mono text-[10px] bg-[#f0f6ff] text-blue-800 border border-blue-200 px-2.5 py-1 rounded">
            ✉️ Gmail/Outlook OAuth syncer
          </span>
          <span className="font-mono text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded">
            🎨 Handmade paper textures
          </span>
        </div>

        <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-700 mb-2 border-b border-zinc-200 pb-1">
          Top Enterprise Customers
        </h4>
        <div className="space-y-2 font-mono text-[10px] text-zinc-600">
          <div className="flex justify-between border-b border-zinc-100 pb-1">
            <span className="font-semibold text-zinc-900">Linear App Corp</span>
            <span>42 licenses active</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-1">
            <span className="font-semibold text-zinc-900">Vercel Research Lounge</span>
            <span>18 licenses active</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-900">Supabase, Inc.</span>
            <span>25 licenses active</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-zinc-200 pl-0 md:pl-6 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">
            Active Support queue
          </h4>
          <p className="font-serif text-[12.5px] italic text-zinc-600 leading-normal">
            "Request spike on mobile inertia transitions has been handled inside client-side virtual wheel listeners successfully."
          </p>
        </div>
        <div className="p-2 bg-yellow-50/50 rounded border border-yellow-200 font-mono text-[9px] text-yellow-800 mt-4 text-center">
          ⚡ 100% SLA Response Rate
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="absolute inset-0 z-15 flex flex-col justify-start md:justify-center items-center py-12 px-4 md:px-12 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="room-scene-container"
    >
      {/* Callout section text */}
      <div 
        className="text-center mb-10 max-w-xl transition-all duration-500"
        style={{
          opacity: progress >= 1300 ? 1 : 0,
          transform: progress >= 1300 ? 'translateY(0)' : 'translateY(12px)'
        }}
      >
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">Room</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">A self maintained workspace.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          Built for your needs and aligned with your projects.
        </p>
      </div>

      {/* Main beige desk widget */}
      <div 
        className="relative w-full max-w-4xl bg-white border border-black/5 rounded-xl shadow-xl flex flex-col min-h-[420px]"
        id="room-workspace-widget"
      >
        {/* Coffee cup stain watermark */}
        <div className="absolute top-8 left-1/3 w-28 h-28 coffee-stain pointer-events-none" />

        {/* Tabbed view and mode bar */}
        <div className="border-b border-zinc-300 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#ebe2cf]/50">
          
          {/* Default views tabs */}
          <div className="flex gap-1.5 overflow-x-auto max-sm:pb-1 select-none">
            {(['Job Application', 'Fundraising Progress', 'Customer Conversation'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  let targetProgress = 1545;
                  if (tab === 'Fundraising Progress') targetProgress = 2129;
                  else if (tab === 'Customer Conversation') targetProgress = 2712;
                  window.scrollTo({ top: targetProgress, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider cursor-pointer whitespace-nowrap transition-all border ${
                  activeTab === tab
                    ? 'bg-paper shadow-sm border-zinc-300 font-semibold text-ink'
                    : 'bg-[#faf8f4]/20 hover:bg-[#faf8f4]/60 border-transparent text-zinc-500'
                }`}
              >
                {tab === 'Job Application' && '👔 Job Application'}
                {tab === 'Fundraising Progress' && '📈 Fundraising Progress'}
                {tab === 'Customer Conversation' && '💬 Customer Conversations'}
              </button>
            ))}
          </div>

          {/* Secondary Mode view toggle: Table vs Insight */}
          <div className="flex items-center gap-1 bg-[#ded4bf] p-1 rounded border border-[#d2c7b1] self-end sm:self-auto">
            {(['Table', 'Insight'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  let targetProgress = window.scrollY;
                  if (activeTab === 'Job Application') {
                    targetProgress = mode === 'Table' ? 1545 : 1837;
                  } else if (activeTab === 'Fundraising Progress') {
                    targetProgress = mode === 'Table' ? 2129 : 2420;
                  } else if (activeTab === 'Customer Conversation') {
                    targetProgress = mode === 'Table' ? 2712 : 3004;
                  }
                  window.scrollTo({ top: targetProgress, behavior: 'smooth' });
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase cursor-pointer transition-all flex items-center gap-1 ${
                  activeMode === mode
                    ? 'bg-paper text-ink shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-ink'
                }`}
              >
                {mode === 'Table' ? <List className="w-3 h-3" /> : <BarChart2 className="w-3 h-3" />}
                {mode}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Inner contents space */}
        <div className="flex-1 bg-paper/95 rounded-b-lg overflow-x-auto allowed-scroll">
          {activeMode === 'Table' ? (
            
            /* General database grid styled as nice stationery rows */
            <div className="min-w-[680px]">
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-zinc-200 bg-paper-dark/40 font-mono text-[9px] text-[#867c69] uppercase tracking-widest">
                    <th className="py-2.5 px-4 font-semibold">Sources</th>
                    <th className="py-2.5 px-4 font-semibold">Job Title / Focus</th>
                    <th className="py-2.5 px-4 font-semibold">Compensation Cap</th>
                    <th className="py-2.5 px-4 font-semibold">Company / Partner</th>
                    <th className="py-2.5 px-4 font-semibold">Status Tag</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ROOM_ROWS.map((row) => (
                    <tr 
                      key={row.id}
                      onClick={() => setInterviewStatus(row.jobTitle)}
                      className="border-b border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors"
                    >
                      {/* Source */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
                          {row.source}
                        </span>
                      </td>

                      {/* Job Title */}
                      <td className="py-3 px-4">
                        <span className="font-serif text-[13px] text-zinc-900 font-medium">
                          {row.jobTitle}
                        </span>
                      </td>

                      {/* Compensation */}
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-600">
                        {row.compensation}
                      </td>

                      {/* Company */}
                      <td className="py-3 px-4 font-serif text-[13px] italic text-zinc-700">
                        {row.company}
                      </td>

                      {/* Status tag */}
                      <td className="py-3 px-4">
                        <span 
                          className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded inline-block ${
                            row.status === 'Accepted' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            row.status === 'Interview' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            row.status === 'Applied' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          ● {row.status.toUpperCase()}
                        </span>
                      </td>

                      {/* View Button */}
                      <td className="py-3 px-4 text-center">
                        <button 
                          className="px-2.5 py-0.5 bg-paper-dark hover:bg-zinc-200 text-zinc-700 border border-zinc-300 rounded font-mono text-[9px] cursor-pointer"
                        >
                          View Pill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Informative ledger footer notice */}
              <div className="p-3 bg-zinc-50 border-t border-zinc-200 text-center font-mono text-[9px] text-zinc-400">
                DATABASE RECORDS SYNCED WITH OUTBOUND DRAWER INDEXER SECURELY
              </div>
            </div>

          ) : (
            
            /* Render active tab insight */
            <div>
              <div className="border-b border-zinc-100 bg-[#fbfdfa]/50 px-4 py-2.5 flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GEN AI ENGINE AUTOMATICALLY MAINTAINED METRICS</span>
              </div>
              
              {activeTab === 'Job Application' && renderJobInsight()}
              {activeTab === 'Fundraising Progress' && renderFundraisingInsight()}
              {activeTab === 'Customer Conversation' && renderCustomerInsight()}
            </div>

          )}
        </div>

      </div>

      {/* Row detail dialog overlay when clicking database row items */}
      {interviewStatus && (
        <div className="fixed inset-0 bg-ink/25 z-40 flex items-center justify-center p-4 pointer-events-auto">
          <div className="bg-[#fffdfa] border-2 border-zinc-600 rounded p-6 max-w-sm w-full shadow-2xl relative">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
              Candidate Dossier
            </h3>
            <p className="font-mono text-[10px] text-zinc-400 mb-4 uppercase">
              RE: {interviewStatus}
            </p>
            <p className="font-serif text-sm italic text-zinc-600 mb-5">
              "This entry is managed inside the active room. All background documents, emails and flight tickers associated are linked inside sorting drawers."
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setInterviewStatus(null)}
                className="px-4 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded font-mono text-xs cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
