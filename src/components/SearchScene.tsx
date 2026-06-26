/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SEARCH_PROMPTS } from '../data';
import { 
  FileCheck, 
  HelpCircle, 
  Search, 
  Settings, 
  Stamp, 
  ArrowDown, 
  Cpu,
  MailWarning,
  BadgeAlert
} from 'lucide-react';

interface SearchSceneProps {
  progress: number;
}

export default function SearchScene({ progress }: SearchSceneProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [machineState, setMachineState] = useState<'inserted' | 'processing' | 'stamped' | 'released'>('inserted');
  const [typedQuery, setTypedQuery] = useState('');

  // Auto-typing simulator for query prompts
  useEffect(() => {
    const currentPrompt = SEARCH_PROMPTS[promptIndex].query;
    let charIndex = 0;
    setTypedQuery('');
    setMachineState('inserted');

    const timeouts: NodeJS.Timeout[] = [];

    const typingInterval = setInterval(() => {
      if (charIndex < currentPrompt.length) {
        setTypedQuery(prev => prev + currentPrompt.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Completed typing. Wait 0.6s then slide item through processing slot
        const t1 = setTimeout(() => {
          setMachineState('processing');
          
          // Wait 1.1s to stamp the paper inside machine
          const t2 = setTimeout(() => {
            setMachineState('stamped');

            // Wait 1s to release and scatter the stamped output
            const t3 = setTimeout(() => {
              setMachineState('released');

              // Wait 1.5s to rotate to the next query
              const t4 = setTimeout(() => {
                setPromptIndex(prev => (prev + 1) % SEARCH_PROMPTS.length);
              }, 1500);
              timeouts.push(t4);

            }, 1000);
            timeouts.push(t3);

          }, 1100);
          timeouts.push(t2);

        }, 600);
        timeouts.push(t1);
      }
    }, 40); // typing speed

    return () => {
      clearInterval(typingInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [promptIndex]);

  // Visibility Range bounds: 3100 -> 4300
  const isVisible = progress >= 3100 && progress <= 4300;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150;

  if (progress >= 3100 && progress < 3350) {
    const ratio = (progress - 3100) / 250;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 3350 && progress <= 3850) {
    opacity = 1;
    translateY = 0;
  } else if (progress > 3850 && progress <= 4300) {
    const ratio = (progress - 3850) / 450;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  const activePrompt = SEARCH_PROMPTS[promptIndex];

  return (
    <div 
      className="absolute inset-0 z-15 flex flex-col justify-start md:justify-center items-center py-12 px-4 md:px-12 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="search-scene-container"
    >
      {/* Callout section text */}
      <div className="text-center mb-10 max-w-xl">
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">Search</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">Save time and sanity.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          A single query searches your physical cards, envelopes, and records.
        </p>
      </div>

      {/* Outer Workspace holding typewriter prompt and processor device */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        {/* Animated typed typewriter prompts at top */}
        <div className="w-full max-w-lg bg-white border border-black/5 p-4 rounded-xl shadow-md mb-8 flex items-center gap-3">
          <Search className="w-4 h-4 text-zinc-400 flex-shrink-0 animate-pulse" />
          <div className="font-mono text-xs md:text-sm text-zinc-800 flex-1 select-text">
            <span>{typedQuery}</span>
            <span className="w-1.5 h-4 bg-zinc-900 inline-block animate-pulse align-middle ml-0.5" />
          </div>
        </div>

        {/* The receipt processor mechanical machinery widget */}
        <div className="relative w-[320px] h-[340px]" id="search-machine-terminal">
          
          {/* Rounded Gray Shell Back of the Machine */}
          <div className="absolute inset-0 bg-neutral-100 border-x border-b border-zinc-300 rounded-b-2xl shadow-xl z-0" />

          {/* Machine Top Face Overlay with feed slot */}
          <div className="absolute top-0 left-0 right-0 h-14 bg-zinc-200 border-2 border-zinc-300 rounded-t-xl z-30 flex flex-col justify-center px-4 shadow-md">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <Cpu className="w-3 h-3 text-zinc-400" />
                QUERY SLOT-PF3
              </span>
              <div className="flex gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${machineState === 'processing' ? 'bg-amber-500 animate-ping' : 'bg-zinc-400'}`} />
                <div className={`w-1.5 h-1.5 rounded-full ${machineState === 'stamped' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
              </div>
            </div>

            {/* The Actual Deep Ingestion Slot */}
            <div className="w-full h-2 bg-neutral-950 rounded-full mt-1 border border-zinc-100 shadow-inner overflow-hidden" />
          </div>

          {/* Inner frame viewport on the machine body where receipts move and get processed */}
          <div className="absolute top-14 left-4 right-4 bottom-4 bg-[#f1ebd9] rounded-lg border border-zinc-300/80 p-3 overflow-hidden shadow-inner z-10 flex items-center justify-center">
            
            {/* Ambient circuit-like markings inside viewport */}
            <div className="absolute inset-0 opacity-10 font-mono text-[8px] text-zinc-600 p-2 overflow-hidden leading-tight select-none">
              {`0x4821D09A FCB
              SEARCH PATH = /DRAWER/*
              OAUTH CREDENTIALS MATCH
              NATIVE WHEEL DISPATCH
              PROCESSOR CODE-STAGE-4
              STATUS_VALIGN_OK`}
              <div className="w-full h-full border-b border-dashed border-zinc-800/10 mt-1" />
            </div>

            {/* The Moving Receipt Paper Card */}
            <div 
              className="absolute w-60 bg-white border border-neutral-300/80 p-4.5 rounded shadow-lg flex flex-col justify-between transition-all duration-700 select-all"
              style={{
                top: machineState === 'inserted' ? '-110px' : machineState === 'processing' ? '24px' : machineState === 'stamped' ? '28px' : '230px',
                opacity: machineState === 'released' ? 0.35 : 1,
                transform: machineState === 'released' ? 'scale(0.85) rotate(4deg)' : 'scale(1) rotate(0deg)',
                boxShadow: '0 8px 24px var(--color-paper-shadow)',
                height: '140px'
              }}
            >
              {/* Paper tear aesthetic at bottom of receipt */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white to-transparent" />

              <div className="border-b border-zinc-100 pb-1.5">
                <span className="font-mono text-[8px] tracking-wider text-zinc-400 block uppercase">
                  RAW INPUT INGESTED
                </span>
                <span className="font-serif text-[11px] font-semibold text-zinc-800 italic line-clamp-1 mt-0.5">
                  "{activePrompt.query}"
                </span>
              </div>

              {/* Action output contents */}
              <div>
                <span className="font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                  Transformed Output
                </span>
                <span className="font-serif text-sm font-semibold text-ink line-clamp-1">
                  {activePrompt.outputName}
                </span>
                <span className="font-serif text-[10.5px] italic text-zinc-500 line-clamp-1 leading-normal">
                  {activePrompt.outputMeta}
                </span>
              </div>

              {/* Simulated Ink Rubber Stamp overlay */}
              <div 
                className="absolute right-4 bottom-3 transition-all duration-300 ease-out"
                style={{
                  opacity: (machineState === 'stamped' || machineState === 'released') ? 0.85 : 0,
                  transform: (machineState === 'stamped' || machineState === 'released') 
                    ? 'scale(1) rotate(-12deg)' 
                    : 'scale(1.8) rotate(-30deg)',
                  filter: (machineState === 'stamped') ? 'none' : 'blur(1px)'
                }}
              >
                <span className="stamp-ink text-[10px] text-stamp-blue">
                  ✓ RESOLVED
                </span>
              </div>

              {/* Receipt watermark pattern */}
              <div className="absolute left-4 bottom-1 text-[8px] font-mono text-zinc-300">
                TRANSFORMATION #9521
              </div>
            </div>

            {/* Scatter static backup artifacts peeking from behind the main moving card */}
            <div 
              className="absolute w-52 h-20 bg-[#ffffff]/60 border border-neutral-200 rounded p-2 z-0 origin-top-left flex flex-col justify-between transition-opacity duration-300"
              style={{
                top: '50px',
                left: '-20px',
                transform: 'rotate(-20deg)',
                opacity: machineState === 'released' ? 0.75 : 0.15
              }}
            >
              <div className="font-mono text-[7px] text-zinc-400">ARCHIVE DIRECTORY</div>
              <div className="font-serif text-[10px] italic text-zinc-700">kathy_birthday_cake_high_res.png</div>
              <span className="stamp-ink text-[8px] text-emerald-800 self-end scale-75 rotate-15">SAVED</span>
            </div>

            <div 
              className="absolute w-44 h-20 bg-[#ffffff]/60 border border-neutral-200 rounded p-2 z-0 origin-top-right flex flex-col justify-between transition-opacity duration-300"
              style={{
                top: '60px',
                right: '-30px',
                transform: 'rotate(25deg)',
                opacity: machineState === 'released' ? 0.75 : 0.15
              }}
            >
              <div className="font-mono text-[7px] text-zinc-400">EMAIL LOG</div>
              <div className="font-serif text-[10px] italic text-zinc-700">Mailed 42 Accounts</div>
              <span className="stamp-ink text-[8px] text-stamp-red self-end scale-75 rotate-[-5deg]">SENT</span>
            </div>

          </div>

          {/* Front Plate Logo Marks */}
          <div className="absolute bottom-2 left-6 right-6 h-6 border-t border-zinc-200/50 z-20 flex justify-between items-center text-zinc-400 font-mono text-[8px]">
            <span>SERIAL NO: 402-B</span>
            <span>FEATHER CORP © 2026</span>
          </div>

        </div>

      </div>

    </div>
  );
}
