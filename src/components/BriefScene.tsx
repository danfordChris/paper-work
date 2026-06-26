/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BRIEF_TASKS } from '../data';
import { 
  FileCheck, 
  Paperclip, 
  CornerDownRight, 
  MapPin, 
  Sparkles, 
  Check, 
  Tag, 
  Circle,
  Hash,
  Award
} from 'lucide-react';

interface BriefSceneProps {
  progress: number;
}

export default function BriefScene({ progress }: BriefSceneProps) {
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const [stampedMessage, setStampedMessage] = useState<string | null>(null);
  const [stickers, setStickers] = useState<string[]>(['st1']); // default sticker of follow-up on page
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Interpolation for entrance (600 -> 1350)
  // Visible region: 600 -> 1350
  const isVisible = progress >= 500 && progress <= 1500;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150; // pixels to translate

  if (progress >= 500 && progress < 700) {
    // Coming In
    const ratio = (progress - 500) / 200;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 700 && progress <= 1150) {
    // Fully Stationary Active
    opacity = 1;
    translateY = 0;
  } else if (progress > 1150 && progress <= 1450) {
    // Going Out towards Room
    const ratio = (progress - 1150) / 300;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  const toggleTask = (id: string) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter(item => item !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };

  const handleStampAction = (stamp: string) => {
    setSelectedStamp(stamp);
    setStampedMessage(`STAMPED [ ${stamp} ]`);
  };

  const addSticker = (label: string) => {
    if (stickers.includes(label)) {
      setStickers(stickers.filter(s => s !== label));
    } else {
      setStickers([...stickers, label]);
    }
  };

  return (
    <div 
      className="absolute inset-0 z-15 flex flex-col justify-start md:justify-center items-center py-10 px-4 md:px-12 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="brief-scene-container"
    >
      {/* Callout top labels following Immersive UI */}
      <div className="text-center mb-10 max-w-xl">
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">Brief</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">Keep what matters.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          Removes what’s done, keeps what matters, and nudges what needs you.
        </p>
      </div>

      {/* Main stacked notebook element */}
      <div className="relative w-full max-w-3xl h-[520px] max-md:h-[580px]" id="brief-multi-notebook">
        
        {/* Bottom Page */}
        <div 
          className="absolute inset-0 bg-white shadow-md border border-black/5 rotate-2 translate-x-4 rounded-lg"
        />

        {/* Middle Page */}
        <div 
          className="absolute inset-0 bg-white shadow-md border border-black/5 -rotate-1 -translate-x-2 rounded-lg"
        />

        {/* Front Page */}
        <div 
          className="absolute inset-0 bg-white shadow-xl border border-black/5 flex flex-col overflow-hidden rounded-lg"
        >
          {/* Notebook top header margin with left bind & drifting feather */}
          <div className="h-10 border-b border-zinc-200/80 bg-paper-dark/30 px-4 flex items-center justify-between">
            {/* Left Binding Rings Representation */}
            <div className="flex gap-2.5 items-center">
              {[1, 2, 3, 4, 5].map((ring) => (
                <div key={ring} className="relative flex flex-col items-center">
                  <div className="w-2.5 h-4 rounded-full bg-zinc-400/40 border-r border-zinc-500/30" />
                  <div className="absolute top-1.5 w-1 h-3 bg-zinc-700/60 rounded-full" />
                </div>
              ))}
              <div className="w-[1px] h-6 bg-zinc-300 ml-2" />
              <span className="font-mono text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                INBOUND DESK NOTEBOOK
              </span>
            </div>

            {/* Drifting feather illustration on top-right */}
            <div className="flex items-center gap-1">
              <span className="font-serif italic text-[11px] text-zinc-400 mr-2">danfordchris.computer</span>
              <div className="animate-feather text-[#cc4539] rotate-12">
                <svg className="w-5 h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  <path d="M11 13L15 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Notebook Content split in left side column & main item ledger list */}
          <div className="flex-1 flex flex-row overflow-hidden">
            
            {/* Left bound guideline */}
            <div className="w-4 border-r border-rose-200/60 h-full bg-red-50/10 flex-shrink-0" />

            {/* Scrollable Notebook Workspace */}
            <div className="flex-1 overflow-y-auto allowed-scroll px-6 py-4 flex flex-col md:flex-row gap-6">
              
              {/* Left Column: Tasks / Sections */}
              <div className="flex-1 flex flex-col gap-5">
                
                {/* Sections of the ledger page */}
                {(() => {
                  const sectionsIdx = ['MUST SEE', 'FYI', 'LOW PRIORITY'] as const;
                  let activeSectionIdx = -1;
                  if (progress >= 700 && progress <= 1150) {
                    const step = (1150 - 700) / 3;
                    activeSectionIdx = Math.min(2, Math.floor((progress - 700) / step));
                  }

                  return sectionsIdx.map((sectionLabel, currentSectionIdx) => {
                    const tasks = BRIEF_TASKS.filter(t => t.category === sectionLabel);
                    const isSectionFocused = activeSectionIdx === -1 || activeSectionIdx === currentSectionIdx;

                    return (
                      <div 
                        key={sectionLabel} 
                        className={`flex flex-col gap-2 transition-all duration-300 ${
                          isSectionFocused ? 'opacity-100 scale-[1.01]' : 'opacity-25 scale-100 blur-[0.3px]'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
                          <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-700 flex items-center gap-1.5">
                            <Circle className={`w-2 h-2 transition-colors ${isSectionFocused ? 'fill-red-500 text-red-500 animate-pulse' : 'fill-zinc-400 text-zinc-400'}`} />
                            {sectionLabel}
                          </span>
                          <span className="font-mono text-[9px] bg-zinc-100 text-zinc-500 px-1.5 py-0.2 px-1 text-center rounded">
                            {tasks.length}
                          </span>
                        </div>

                      <div className="flex flex-col gap-2">
                        {tasks.map((task) => (
                          <div 
                            key={task.id}
                            className={`p-3 rounded-md border border-neutral-100 transition-all ${
                              completedTasks.includes(task.id) 
                                ? 'bg-zinc-50/50 opacity-60 border-dashed line-through' 
                                : 'bg-[#fffdfd] hover:bg-neutral-50/80 shadow-xs'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <button 
                                onClick={() => toggleTask(task.id)}
                                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-colors ${
                                  completedTasks.includes(task.id)
                                    ? 'bg-zinc-800 border-zinc-800 text-white'
                                    : 'border-zinc-300 hover:border-zinc-500 bg-white'
                                }`}
                              >
                                {completedTasks.includes(task.id) && <Check className="w-3 h-3 stroke-[3]" />}
                              </button>

                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-0.5">
                                  <span className="font-mono text-[9px] font-medium text-zinc-500">
                                    {task.sender}
                                  </span>
                                  <span className="font-mono text-[8px] text-zinc-400">
                                    {task.time}
                                  </span>
                                </div>

                                <p className="font-serif text-[13px] text-zinc-800 font-medium leading-relaxed">
                                  {task.title}
                                </p>

                                {task.snippet && !completedTasks.includes(task.id) && (
                                  <p className="font-sans text-[11px] text-zinc-500 italic mt-1 bg-paper/50 p-1.5 rounded border border-zinc-100/50">
                                    "{task.snippet}"
                                  </p>
                                )}

                                {/* Attachments */}
                                {task.attachment && !completedTasks.includes(task.id) && (
                                  <div className="flex items-center gap-1.5 mt-2 px-2 py-1 bg-neutral-100 border border-neutral-200 rounded w-fit">
                                    <Paperclip className="w-3.5 h-3.5 text-zinc-500" />
                                    <span className="font-mono text-[9px] text-zinc-600 font-medium">
                                      {task.attachment.name}
                                    </span>
                                    <span className="font-mono text-[8px] text-zinc-400">
                                      {task.attachment.size}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

              {/* Right Column: Interactive Stamps and Stickers Area */}
              <div className="w-full md:w-56 flex flex-col gap-4">
                
                {/* Sticker Area */}
                <div className="p-3 bg-paper-dark border border-zinc-200 rounded-md">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2 border-b border-zinc-300 pb-1 text-center">
                    Desk Draw Drawer Stamps
                  </span>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    <button 
                      onClick={() => handleStampAction('YES')} 
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-stamp-green border border-emerald-300 rounded font-mono text-[9px] font-bold cursor-pointer transition-transform duration-100 hover:scale-105"
                    >
                      [YES] STAMP
                    </button>
                    <button 
                      onClick={() => handleStampAction('NO')} 
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-stamp-red border border-red-300 rounded font-mono text-[9px] font-bold cursor-pointer transition-transform duration-100 hover:scale-105"
                    >
                      [NO] STAMP
                    </button>
                    <button 
                      onClick={() => handleStampAction('MAYBE')} 
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-stamp-blue border border-blue-300 rounded font-mono text-[9px] font-bold cursor-pointer transition-transform duration-100 hover:scale-105"
                    >
                      [MAYBE] STAMP
                    </button>
                  </div>

                  {/* Stamp placement area */}
                  <div className="h-20 bg-white border border-dashed border-zinc-300 rounded relative overflow-hidden flex items-center justify-center">
                    {selectedStamp ? (
                      <div className="animate-stamp transform origin-center">
                        <span 
                          className="stamp-ink text-sm inline-block"
                          style={{
                            color: selectedStamp === 'YES' ? 'var(--color-stamp-green)' : selectedStamp === 'NO' ? 'var(--color-stamp-red)' : 'var(--color-stamp-blue)',
                            borderColor: 'currentColor',
                            transform: 'rotate(-5deg)'
                          }}
                        >
                          {selectedStamp}
                        </span>
                      </div>
                    ) : (
                      <span className="font-mono text-[9px] text-zinc-400">
                        Interactive Stamp Pad
                      </span>
                    )}
                  </div>
                </div>

                {/* Stickers List */}
                <div className="p-3 bg-amber-50/20 border border-zinc-200 rounded-md">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2 border-b border-zinc-300 pb-1 text-center">
                    Document Stickers
                  </span>

                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => addSticker('st1')}
                      className={`px-2 py-1 rounded font-mono text-[8px] cursor-pointer transition-colors ${
                        stickers.includes('st1') ? 'bg-yellow-100 text-yellow-800 font-bold border border-yellow-300' : 'bg-zinc-100 text-zinc-400'
                      }`}
                    >
                      PIN "FOLLOW UP"
                    </button>
                    <button 
                      onClick={() => addSticker('st2')}
                      className={`px-2 py-1 rounded font-mono text-[8px] cursor-pointer transition-colors ${
                        stickers.includes('st2') ? 'bg-rose-100 text-rose-800 font-bold border border-rose-300' : 'bg-zinc-100 text-zinc-400'
                      }`}
                    >
                      PIN "TOP PRIORITY"
                    </button>
                  </div>

                  {/* Stickers representation panel */}
                  <div className="relative mt-2 h-14 bg-[#fffefc] border border-neutral-100 rounded flex items-center justify-center gap-2">
                    {stickers.includes('st1') && (
                      <div className="animate-sticker bg-yellow-200/90 text-[9px] text-yellow-800 px-2 py-0.5 rounded border border-yellow-300 font-mono shadow-xs rotate-[-3deg]">
                        ★ FOLLOW UP
                      </div>
                    )}
                    {stickers.includes('st2') && (
                      <div className="animate-sticker bg-rose-200/90 text-[9px] text-rose-800 px-2 py-0.5 rounded border border-rose-300 font-mono shadow-xs rotate-[4deg]">
                        ✦ TOP PRIORITY
                      </div>
                    )}
                    {stickers.length === 0 && (
                      <span className="font-mono text-[8px] text-zinc-300">
                        No pins placed
                      </span>
                    )}
                  </div>
                </div>

                {/* Counters sticker */}
                <div className="p-2 border border-zinc-200 rounded bg-white">
                  <div className="font-mono text-[8.5px] text-zinc-400 uppercase tracking-widest text-center border-b border-zinc-100 pb-1">
                    System Counters
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[9px] font-mono p-1">
                    <div className="text-zinc-600 flex justify-between">
                      <span>Packages:</span>
                      <span className="font-bold text-zinc-900 bg-zinc-100 px-1 rounded">2</span>
                    </div>
                    <div className="text-zinc-600 flex justify-between">
                      <span>Rent:</span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-1 rounded">1</span>
                    </div>
                    <div className="text-zinc-600 flex justify-between col-span-2">
                      <span>Applicant Count:</span>
                      <span className="font-bold text-indigo-800 bg-indigo-50 px-1 rounded">14</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Subtitle / Attachment notification tag */}
          <div className="h-10 border-t border-zinc-200/80 bg-paper-dark/30 px-6 flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#aa9d8b] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-400" />
              Room linkage connected to "Job Application"
            </span>
            <span className="font-mono text-[9px] text-zinc-400">
              Page 1 of 3
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
