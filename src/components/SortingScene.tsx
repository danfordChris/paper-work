/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Sparkles, Grid, Layers, Compass, ArrowRightLeft } from 'lucide-react';

interface SortingSceneProps {
  progress: number;
}

export default function SortingScene({ progress }: SortingSceneProps) {
  const [dots, setDots] = useState<{ id: number; r: number; color: string; tag: string; x: number; y: number }[]>([]);

  useEffect(() => {
    // Generate scattered points to sort
    const colors = [
      { color: '#cc4539', tag: 'Important' },
      { color: '#386dbd', tag: 'Meeting' },
      { color: '#378b60', tag: 'Shared File' },
      { color: '#e2ad3c', tag: 'Spending' },
      { color: '#8b5e3c', tag: 'Booking' },
      { color: '#c05621', tag: 'Package' },
    ];

    const initialDots = Array.from({ length: 18 }).map((_, i) => {
      const category = colors[i % colors.length];
      return {
        id: i,
        r: Math.random() * 8 + 4,
        color: category.color,
        tag: category.tag,
        // Relative starting offsets (scattered)
        x: Math.random() * 300 - 150,
        y: Math.random() * 200 - 100
      };
    });
    setDots(initialDots);
  }, []);

  // Boundaries: 4800 -> 5700
  const isVisible = progress >= 4800 && progress <= 5700;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150;

  if (progress >= 4800 && progress < 5000) {
    const ratio = (progress - 4800) / 200;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 5000 && progress <= 5500) {
    opacity = 1;
    translateY = 0;
  } else if (progress > 5500 && progress <= 5700) {
    const ratio = (progress - 5500) / 200;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  // Calculate self-organization ratio towards drawers categories
  // As progress moves from 5000 to 5500, ratio goes from 0 (scattered) to 1 (aligned in stacks)
  const sortRatio = Math.min(Math.max((progress - 5000) / 450, 0), 1);

  return (
    <div 
      className="absolute inset-0 z-15 flex flex-col justify-center items-center py-12 px-4 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`
      }}
      id="sorting-scene-container"
    >
      <div className="text-center mb-10 max-w-xl">
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">Sorting</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">Self organizing records.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          Witnessing individual documents drifting into their corresponding drawer stacks.
        </p>
      </div>

      {/* Visual representation card of sorting automation */}
      <div className="relative w-full max-w-md h-72 border border-black/5 rounded-xl bg-white shadow-lg flex flex-col justify-between p-6">
        
        {/* Decorative corner tag staples */}
        <div className="absolute top-[-5px] left-[45%] staple" />

        <div className="flex justify-between items-center text-zinc-400 font-mono text-[9px] border-b border-zinc-100 pb-2">
          <span className="flex items-center gap-1">
            <ArrowRightLeft className="w-3.5 h-3.5 animate-pulse" />
            AUTOMATED RE-ROUTING SECURELY
          </span>
          <span>STAGE COMPLETION: {Math.round(sortRatio * 100)}%</span>
        </div>

        {/* Portray fluid particles sorting themselves */}
        <div className="flex-1 relative flex items-center justify-center my-4 overflow-hidden bg-zinc-50/40 rounded border border-zinc-100">
          
          <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2 opacity-5 font-mono text-[8px] text-zinc-900 pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-dashed border-zinc-800 rounded flex items-center justify-center">
                DRAWER {i+1}
              </div>
            ))}
          </div>

          {dots.map((dot) => {
            // Un-sorted scattered offset
            const startX = dot.x;
            const startY = dot.y;

            // Target sorted position (aligned in tidy columns based on category tag)
            const categories = ['Important', 'Meeting', 'Shared File', 'Spending', 'Booking', 'Package'];
            const colIndex = categories.indexOf(dot.tag);
            
            // Layout sorted coordinates elegantly on the screen grid
            const targetX = (colIndex - 2.5) * 58;
            const targetY = (dot.id % 3 - 1) * 32;

            const curX = startX + (targetX - startX) * sortRatio;
            const curY = startY + (targetY - startY) * sortRatio;

            return (
              <div 
                key={dot.id}
                className="absolute rounded-full transition-shadow duration-300 flex items-center justify-center"
                style={{
                  width: `${dot.r * 2}px`,
                  height: `${dot.r * 2}px`,
                  backgroundColor: dot.color,
                  transform: `translate(${curX}px, ${curY}px)`,
                  boxShadow: sortRatio > 0.8 ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
                  opacity: 0.9
                }}
              >
                {/* Tiny tags displayed when close to complete */}
                {sortRatio > 0.85 && dot.id % 3 === 0 && (
                  <div className="absolute bottom-[-18px] bg-zinc-900 text-[#faf9f4] text-[6.5px] font-mono px-1.5 py-0.2 rounded whitespace-nowrap shadow-xs uppercase font-medium">
                    {dot.tag}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="font-serif italic text-xs text-zinc-500 leading-normal text-center bg-paper py-2 rounded border border-zinc-200/50">
          "Witnessing individual documents drifting into their corresponding drawers."
        </div>

      </div>

    </div>
  );
}
