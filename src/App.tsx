/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SceneId, SCENE_BOUNDS } from './types';
import HeroScene from './components/HeroScene';
import BriefScene from './components/BriefScene';
import RoomScene from './components/RoomScene';
import SearchScene from './components/SearchScene';
import PeopleScene from './components/PeopleScene';
import SortingScene from './components/SortingScene';
import DrawersScene from './components/DrawersScene';
import FooterScene from './components/FooterScene';
import { Compass, Sparkles, Sliders, Menu, Layers } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [easedProgress, setEasedProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState<SceneId>('hero');
  const [showRulerTip, setShowRulerTip] = useState(false);

  const progressRef = useRef(0);
  const easedProgressRef = useRef(0);
  const isLoopingRef = useRef(false);

  const SNAP_POINTS = [0, 600, 1350, 3350, 4100, 4900, 5600, 6800, 7700];

  // Easing interpolation loop for ultra-smooth animations
  useEffect(() => {
    const lerpSpeed = 0.055; // ultra-smooth premium damping multiplier
    let animationId: number | null = null;

    const updateEasedProgress = () => {
      const target = progressRef.current;
      const current = easedProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.1) {
        easedProgressRef.current = target;
        setEasedProgress(target);
        isLoopingRef.current = false;
        animationId = null;
        return;
      }

      const next = current + diff * lerpSpeed;
      easedProgressRef.current = next;
      setEasedProgress(next);

      animationId = requestAnimationFrame(updateEasedProgress);
    };

    // Wake function to restart the loop if it was inactive
    const wakeLoop = () => {
      if (!isLoopingRef.current) {
        isLoopingRef.current = true;
        animationId = requestAnimationFrame(updateEasedProgress);
      }
    };

    // Handle standard document-level window scroll events
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      progressRef.current = scrollTop;
      setProgress(scrollTop);
      wakeLoop();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially to capture current view state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Update current active scene label based on actual visual progress
  useEffect(() => {
    const active = SCENE_BOUNDS.find(
      (bound) => easedProgress >= bound.start && easedProgress <= bound.end
    );
    if (active) {
      setCurrentScene(active.id);
    }
  }, [easedProgress]);

  // Jump smoothly to a requested stage using browser API
  const navigateToSceneProgress = (targetProgress: number) => {
    window.scrollTo({
      top: targetProgress,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      id="composition-viewport-container"
      className="relative w-full min-h-screen dot-grid bg-paper select-none"
    >
      {/* Real scrollable element that creates standard browser scroll height */}
      <div style={{ height: '8100px' }} className="w-full pointer-events-none" />

      {/* Global Header Bar following the Immersive UI design */}
      <header className="fixed top-0 left-0 w-full h-14 flex items-center justify-between px-8 z-50 bg-[#F9F7F2]/80 backdrop-blur-sm border-b border-black/5 pointer-events-auto">
        
        {/* Brand Logo and Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center font-serif text-xs italic font-bold text-white">
            d
          </div>
          <span className="font-sans font-semibold tracking-tight text-lg text-black">
            danfordchris<span className="text-[#cc4539]/80 font-serif italic text-sm">.computer</span>
          </span>
        </div>

        {/* Immersive Scene Pill */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] bg-black/5 border border-black/5 text-[#111] px-3 py-1 rounded-full uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-[#cc4539] animate-pulse" />
            {currentScene.toUpperCase()} ZONE
          </span>
        </div>

        {/* Links & Desk Controls */}
        <div className="flex items-center gap-6 text-sm font-medium text-black/60">
          <span className="max-sm:hidden text-xs font-mono opacity-50 uppercase tracking-widest">TRACK: {Math.round(progress)}pt</span>
          <button 
            onClick={() => navigateToSceneProgress(0)}
            className="px-4 py-1.5 bg-black hover:bg-[#222] text-white text-xs font-sans rounded-full cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            Reset Desk
          </button>
        </div>

      </header>

      {/* Layered Viewports Scenes driven by one eased progress parameter */}
      <main className="fixed inset-0 w-full h-full pointer-events-none z-10" id="staged-scenes-canvas">
        <HeroScene progress={easedProgress} />
        <BriefScene progress={easedProgress} />
        <RoomScene progress={easedProgress} />
        <SearchScene progress={easedProgress} />
        <PeopleScene progress={easedProgress} />
        <SortingScene progress={easedProgress} />
        <DrawersScene progress={easedProgress} />
        <FooterScene progress={easedProgress} />
      </main>

      {/* Immersive UI Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 w-full h-10 px-8 flex items-center justify-between bg-[#F9F7F2]/95 border-t border-black/5 z-40 text-[10px] font-mono text-black/55 select-none pointer-events-none">
        <div className="flex gap-6 uppercase tracking-widest">
          <span>Local // 127.0.0.1</span>
          <span>Secure Mode</span>
        </div>
        <div className="flex gap-6 uppercase tracking-widest max-sm:hidden">
          <span>Scene: {currentScene.toUpperCase()}</span>
          <span>Desk Status: IDLE</span>
        </div>
      </div>

    </div>
  );
}
