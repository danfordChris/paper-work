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

const SCENE_COMPONENTS = {
  hero: HeroScene,
  brief: BriefScene,
  room: RoomScene,
  search: SearchScene,
  people: PeopleScene,
  sorting: SortingScene,
  drawers: DrawersScene,
  footer: FooterScene,
} as const;

export default function App() {
  const [progress, setProgress] = useState(0);
  const [easedProgress, setEasedProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState<SceneId>('hero');

  const progressRef = useRef(0);
  const easedProgressRef = useRef(0);
  const isLoopingRef = useRef(false);

  // Easing interpolation loop for ultra-smooth animations
  useEffect(() => {
    const lerpSpeed = 0.055; // ultra-smooth premium damping multiplier
    const snapDistance = 900;
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

      if (Math.abs(scrollTop - easedProgressRef.current) > snapDistance) {
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        easedProgressRef.current = scrollTop;
        setEasedProgress(scrollTop);
        isLoopingRef.current = false;
        return;
      }

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
      isLoopingRef.current = false;
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
      className="relative w-full bg-paper select-none"
    >
      {/* Global Header Bar following the Immersive UI design */}
      <header className="fixed top-0 left-0 w-full h-14 flex items-center justify-between px-8 z-50 bg-[#F9F7F2]/80 backdrop-blur-sm border-b border-black/5 pointer-events-auto">
        
        {/* Brand Logo and Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center font-serif text-xs italic font-bold text-white">
            d
          </div>
          <span className="font-sans font-semibold tracking-tight text-lg text-black">
            danfordchris<span className="text-[#cc4539]/80 font-serif italic text-sm">.portfolio</span>
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
            Back to Top
          </button>
        </div>

      </header>

      {/* Stacked document sections so browser scrolling moves through real page flow */}
      <main className="relative z-10 dot-grid pt-14 pb-10" id="staged-scenes-canvas">
        {SCENE_BOUNDS.map((scene) => {
          const SceneComponent = SCENE_COMPONENTS[scene.id];
          const sectionHeight = scene.end - scene.start;

          return (
            <section
              key={scene.id}
              id={`scene-${scene.id}`}
              className="relative w-full"
              style={{ height: `${sectionHeight}px` }}
            >
              <div className="sticky top-0 h-screen overflow-hidden">
                <div className="relative h-full w-full">
                  <SceneComponent progress={easedProgress} />
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Immersive UI Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 w-full h-10 px-8 flex items-center justify-between bg-[#F9F7F2]/95 border-t border-black/5 z-40 text-[10px] font-mono text-black/55 select-none pointer-events-none">
        <div className="flex gap-6 uppercase tracking-widest">
          <span>Local // 127.0.0.1</span>
          <span>Secure Mode</span>
        </div>
        <div className="flex gap-6 uppercase tracking-widest max-sm:hidden">
          <span>Scene: {currentScene.toUpperCase()}</span>
          <span>Portfolio Status: LIVE</span>
        </div>
      </div>

    </div>
  );
}
