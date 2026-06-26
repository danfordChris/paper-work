/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ROOM_ROWS } from '../data';
import { BarChart2, List, Sparkles } from 'lucide-react';

interface RoomSceneProps {
  progress: number;
}

type TabType = 'Selected Projects' | 'Experience Timeline' | 'Product Experiments';
type ModeType = 'Table' | 'Insight';

export default function RoomScene({ progress }: RoomSceneProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Selected Projects');
  const [activeMode, setActiveMode] = useState<ModeType>('Table');
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  React.useEffect(() => {
    if (progress >= 1400 && progress <= 3150) {
      const step = (3150 - 1400) / 6;
      const relative = progress - 1400;
      const phase = Math.min(5, Math.floor(relative / step));

      if (phase === 0) {
        setActiveTab('Selected Projects');
        setActiveMode('Table');
      } else if (phase === 1) {
        setActiveTab('Selected Projects');
        setActiveMode('Insight');
      } else if (phase === 2) {
        setActiveTab('Experience Timeline');
        setActiveMode('Table');
      } else if (phase === 3) {
        setActiveTab('Experience Timeline');
        setActiveMode('Insight');
      } else if (phase === 4) {
        setActiveTab('Product Experiments');
        setActiveMode('Table');
      } else if (phase === 5) {
        setActiveTab('Product Experiments');
        setActiveMode('Insight');
      }
    }
  }, [progress]);

  const isVisible = progress >= 1200 && progress <= 3500;
  if (!isVisible) return null;

  let opacity = 0;
  let translateY = 150;

  if (progress >= 1200 && progress < 1400) {
    const ratio = (progress - 1200) / 200;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 1400 && progress <= 3150) {
    opacity = 1;
    translateY = 0;
  } else if (progress > 3150 && progress <= 3500) {
    const ratio = (progress - 3150) / 350;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  const renderProjectsInsight = () => (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      <div className="flex-1">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-3 block">
          Selected Work Breakdown
        </h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#f0faf5] border border-emerald-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-emerald-800">LIVE PRODUCTS</span>
            <span className="font-serif text-3xl font-semibold text-emerald-950 mt-1">3</span>
          </div>
          <div className="bg-[#f0f6ff] border border-blue-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-blue-800">ENTERPRISE SYSTEMS</span>
            <span className="font-serif text-3xl font-semibold text-blue-950 mt-1">1</span>
          </div>
          <div className="bg-yellow-50/50 border border-yellow-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-yellow-800 font-semibold">CASE STUDIES</span>
            <span className="font-serif text-3xl font-semibold text-yellow-950 mt-1">2</span>
          </div>
          <div className="bg-rose-50/50 border border-rose-200 rounded p-3 flex flex-col">
            <span className="font-mono text-[10px] text-rose-800">EXPERIMENTS</span>
            <span className="font-serif text-3xl font-semibold text-rose-950 mt-1">4</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-zinc-200 pl-0 md:pl-6 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
            Strongest portfolio signal
          </h4>
          <p className="font-serif text-[13px] text-zinc-700 italic leading-relaxed mb-4">
            "IPF OS carries the most weight because it shows system design, cross-platform execution, and production-oriented product thinking."
          </p>
        </div>
        <div className="p-3 bg-paper rounded border border-zinc-200/60 font-mono text-[10px] text-zinc-500">
          Highlight first: IPF OS, Bantu Soko, Changisha
        </div>
      </div>
    </div>
  );

  const renderExperienceInsight = () => (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      <div className="flex-1">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
          Career Coverage
        </h4>
        <div className="font-serif text-4xl font-semibold text-zinc-900 tracking-tight flex items-center mb-1">
          5
          <span className="font-mono text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-3 font-normal uppercase tracking-wider">
            distinct chapters
          </span>
        </div>
        <p className="font-serif italic text-xs text-zinc-500 mb-4">
          Product, startup, freelance, backend, and design-adjacent work
        </p>

        <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-700 mb-2 border-b border-zinc-200 pb-1">
          Career timeline
        </h4>
        <div className="flex flex-col gap-2.5 font-sans text-xs">
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-zinc-400 w-16">2025+</span>
            <div className="flex-1">
              <span className="font-semibold text-zinc-800">IPF Software</span> mobile engineering and platform delivery.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-zinc-400 w-16">2023+</span>
            <div className="flex-1">
              <span className="font-semibold text-zinc-800">Freelancing</span> across mobile delivery, QA, and product refinement.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-zinc-400 w-16">2022-25</span>
            <div className="flex-1">
              Ocean Tech Startup, Trilabs, and Finhub broadened product, backend, and web design range.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-zinc-200 pl-0 md:pl-6">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
          Strengths
        </h4>
        <div className="space-y-2 font-mono text-[10px] text-zinc-600">
          <div className="flex justify-between">
            <span>Mobile shipping:</span>
            <span className="text-zinc-900">Strong</span>
          </div>
          <div className="flex justify-between">
            <span>Product breadth:</span>
            <span className="text-zinc-900">Wide</span>
          </div>
          <div className="flex justify-between">
            <span>Systems thinking:</span>
            <span className="text-emerald-700 font-semibold">Proven</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperimentsInsight = () => (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      <div className="flex-1">
        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-3">
          Experiment Themes
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-mono text-[10px] bg-[#fffbf0] text-amber-800 border border-amber-200 px-2.5 py-1 rounded">
            Flutter gameplay loops
          </span>
          <span className="font-mono text-[10px] bg-[#f0faf5] text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded">
            Offline-first records
          </span>
          <span className="font-mono text-[10px] bg-[#f0f6ff] text-blue-800 border border-blue-200 px-2.5 py-1 rounded">
            Commerce workflows
          </span>
          <span className="font-mono text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded">
            Community finance UX
          </span>
        </div>

        <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-700 mb-2 border-b border-zinc-200 pb-1">
          Supporting builds
        </h4>
        <div className="space-y-2 font-mono text-[10px] text-zinc-600">
          <div className="flex justify-between border-b border-zinc-100 pb-1">
            <span className="font-semibold text-zinc-900">Tetris Game</span>
            <span>Playable demo</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-1">
            <span className="font-semibold text-zinc-900">Stock Management</span>
            <span>Prototype</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-900">Vikoba+</span>
            <span>Community utility</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-zinc-200 pl-0 md:pl-6 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">
            Why they matter
          </h4>
          <p className="font-serif text-[12.5px] italic text-zinc-600 leading-normal">
            "These smaller builds show curiosity, iteration speed, and the willingness to learn by shipping."
          </p>
        </div>
        <div className="p-2 bg-yellow-50/50 rounded border border-yellow-200 font-mono text-[9px] text-yellow-800 mt-4 text-center">
          Support the flagship narrative
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
      <div
        className="text-center mb-10 max-w-xl transition-all duration-500"
        style={{
          opacity: progress >= 1300 ? 1 : 0,
          transform: progress >= 1300 ? 'translateY(0)' : 'translateY(12px)'
        }}
      >
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">Room</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">A portfolio you can inspect.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          Project records, work history, and experiments organized as a working desk.
        </p>
      </div>

      <div
        className="relative w-full max-w-4xl bg-white border border-black/5 rounded-xl shadow-xl flex flex-col min-h-[420px]"
        id="room-workspace-widget"
      >
        <div className="absolute top-8 left-1/3 w-28 h-28 coffee-stain pointer-events-none" />

        <div className="border-b border-zinc-300 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#ebe2cf]/50">
          <div className="flex gap-1.5 overflow-x-auto max-sm:pb-1 select-none">
            {(['Selected Projects', 'Experience Timeline', 'Product Experiments'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  let targetProgress = 1545;
                  if (tab === 'Experience Timeline') targetProgress = 2129;
                  else if (tab === 'Product Experiments') targetProgress = 2712;
                  window.scrollTo({ top: targetProgress, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider cursor-pointer whitespace-nowrap transition-all border ${
                  activeTab === tab
                    ? 'bg-paper shadow-sm border-zinc-300 font-semibold text-ink'
                    : 'bg-[#faf8f4]/20 hover:bg-[#faf8f4]/60 border-transparent text-zinc-500'
                }`}
              >
                {tab === 'Selected Projects' && '📦 Selected Projects'}
                {tab === 'Experience Timeline' && '🗂 Experience Timeline'}
                {tab === 'Product Experiments' && '🧪 Product Experiments'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#ded4bf] p-1 rounded border border-[#d2c7b1] self-end sm:self-auto">
            {(['Table', 'Insight'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  let targetProgress = window.scrollY;
                  if (activeTab === 'Selected Projects') {
                    targetProgress = mode === 'Table' ? 1545 : 1837;
                  } else if (activeTab === 'Experience Timeline') {
                    targetProgress = mode === 'Table' ? 2129 : 2420;
                  } else if (activeTab === 'Product Experiments') {
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

        <div className="flex-1 bg-paper/95 rounded-b-lg overflow-x-auto allowed-scroll">
          {activeMode === 'Table' ? (
            <div className="min-w-[680px]">
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-zinc-200 bg-paper-dark/40 font-mono text-[9px] text-[#867c69] uppercase tracking-widest">
                    <th className="py-2.5 px-4 font-semibold">Track</th>
                    <th className="py-2.5 px-4 font-semibold">Project / Chapter</th>
                    <th className="py-2.5 px-4 font-semibold">Stack / Scope</th>
                    <th className="py-2.5 px-4 font-semibold">Context</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ROOM_ROWS.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedEntry(row.jobTitle)}
                      className="border-b border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
                          {row.source}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-[13px] text-zinc-900 font-medium">
                          {row.jobTitle}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-600">
                        {row.compensation}
                      </td>
                      <td className="py-3 px-4 font-serif text-[13px] italic text-zinc-700">
                        {row.company}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded inline-block ${
                            row.status === 'Live' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            row.status === 'Active' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            row.status === 'Case Study' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          ● {row.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="px-2.5 py-0.5 bg-paper-dark hover:bg-zinc-200 text-zinc-700 border border-zinc-300 rounded font-mono text-[9px] cursor-pointer">
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 bg-zinc-50 border-t border-zinc-200 text-center font-mono text-[9px] text-zinc-400">
                PORTFOLIO RECORDS INDEXED FOR FAST READING
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b border-zinc-100 bg-[#fbfdfa]/50 px-4 py-2.5 flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PORTFOLIO SIGNALS AUTOMATICALLY SUMMARIZED</span>
              </div>

              {activeTab === 'Selected Projects' && renderProjectsInsight()}
              {activeTab === 'Experience Timeline' && renderExperienceInsight()}
              {activeTab === 'Product Experiments' && renderExperimentsInsight()}
            </div>
          )}
        </div>
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 bg-ink/25 z-40 flex items-center justify-center p-4 pointer-events-auto">
          <div className="bg-[#fffdfa] border-2 border-zinc-600 rounded p-6 max-w-sm w-full shadow-2xl relative">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
              Portfolio Entry
            </h3>
            <p className="font-mono text-[10px] text-zinc-400 mb-4 uppercase">
              RE: {selectedEntry}
            </p>
            <p className="font-serif text-sm italic text-zinc-600 mb-5">
              "This entry belongs to the active portfolio room. Supporting notes, public links, and project context continue across the surrounding scenes."
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedEntry(null)}
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
