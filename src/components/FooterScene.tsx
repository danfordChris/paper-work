/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ArrowUpRight, Compass, Inbox } from 'lucide-react';

interface FooterSceneProps {
  progress: number;
}

export default function FooterScene({ progress }: FooterSceneProps) {
  // Visibility range: 6500 -> 7700
  const isVisible = progress >= 6400;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150;

  if (progress >= 6400 && progress < 6800) {
    const ratio = (progress - 6400) / 400;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else {
    opacity = 1;
    translateY = 0;
  }

  return (
    <div 
      className="absolute inset-0 z-10 flex flex-col justify-between items-center py-16 px-6 md:px-16 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="footer-scene-container"
    >
      
      {/* Top Brand Tag Header (Aesthetic quiet separator) */}
      <div className="w-full max-w-6xl border-t border-zinc-200/80 pt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-1">
            System Terminal Complete
          </span>
          <span className="font-serif italic text-sm text-zinc-600">
            "Your workspace is clean. Rest easy."
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[9px]">
          <span>SERVER ON PORT 3000</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Center Layout: Main Footer Links columns and pink stamp badge card */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start justify-between gap-12 my-auto z-10">
        
        {/* Footnotes Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 flex-1">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-mono text-[9px] text-[#9d8d73] uppercase tracking-widest border-b border-zinc-100 pb-1">
              PRODUCT
            </h4>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors flex items-center gap-0.5">
              Features <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Pricing Details
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Interactive Room
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-mono text-[9px] text-[#9d8d73] uppercase tracking-widest border-b border-zinc-100 pb-1">
              COMPANY
            </h4>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Our Vision
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              The Stationery Lab
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Careers
            </a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-mono text-[9px] text-[#9d8d73] uppercase tracking-widest border-b border-zinc-100 pb-1">
              RESOURCES
            </h4>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Terms of Use
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Privacy Ledger
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Change Log
            </a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-mono text-[9px] text-[#9d8d73] uppercase tracking-widest border-b border-zinc-100 pb-1">
              CHANNELS
            </h4>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors flex items-center gap-0.5">
              X Desktop <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Instagram
            </a>
            <a href="#" className="font-serif text-[13.5px] text-zinc-600 hover:text-ink hover:underline transition-colors">
              Contact Desk
            </a>
          </div>

        </div>

        {/* Small pink stamp-like card on Right Edge */}
        <div 
          className="w-56 bg-rose-50 border border-rose-200 p-4 rounded-lg shadow-md rotate-[-2.5deg] relative flex flex-col justify-between"
          style={{
            backgroundImage: 'radial-gradient(#fcd34d 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            boxShadow: '4px 6px 15px rgba(225,29,72,0.06)'
          }}
          id="pink-stamp-card"
        >
          {/* Poststamp boundary perforated feel */}
          <div className="absolute top-1 left-1 bottom-1 right-1 border border-dashed border-rose-300 rounded pointer-events-none" />

          {/* Cute header layout */}
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[8px] font-bold text-rose-500 uppercase tracking-widest">
              Feather Stamp
            </span>
            <Inbox className="w-3.5 h-3.5 text-rose-400" />
          </div>

          <p className="font-serif italic text-xs leading-normal text-rose-950 mb-3.5">
            "We build beautiful paper computers that feel warm, stationery, and organized."
          </p>

          <span className="font-mono text-[8px] font-bold text-rose-600 bg-rose-100/85 px-1.5 py-0.5 rounded uppercase block text-center border border-rose-200">
            POSTAGE GUARANTEED
          </span>
        </div>

      </div>

      {/* Giant ghosted wordmark text dominating lower half of the footer screen */}
      <div className="w-full text-center relative pointer-events-none select-none overflow-hidden h-32 md:h-44 mt-auto">
        <h1 
          className="font-serif font-bold text-[10vw] max-sm:text-[70px] text-zinc-900/5 select-none tracking-tight leading-none uppercase"
          style={{
            letterSpacing: '0.02em',
          }}
        >
          danfordchris
        </h1>
      </div>

      {/* Absolute Bottom copyright labels */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-zinc-100 pt-5 text-zinc-400 font-mono text-[8.5px]">
        <span>DANFORDCHRIS COMPUTER, INC. © {new Date().getFullYear()}</span>
        <span>RECREATION APPLET • ALL SYSTEM CHECKS SOLID</span>
      </div>

    </div>
  );
}
