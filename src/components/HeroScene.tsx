/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HERO_SNIPPETS } from '../data';
import { 
  Mail, 
  FileText, 
  AlertTriangle, 
  CreditCard, 
  Truck, 
  Plane, 
  Coffee, 
  ShoppingBag, 
  Award, 
  ShieldAlert, 
  Tag, 
  Home,
  CheckCircle,
  HelpCircle,
  X,
  ChevronRight
} from 'lucide-react';

interface HeroSceneProps {
  progress: number;
}

export default function HeroScene({ progress }: HeroSceneProps) {
  const [exploded, setExploded] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [hoveredCTA, setHoveredCTA] = useState(false);

  useEffect(() => {
    // Stage 1 pile up finishes fast, then release/explode
    const timer = setTimeout(() => {
      setExploded(true);
    }, 500); // Trigger released positioning
    return () => clearTimeout(timer);
  }, []);

  // Map icons to categories
  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-4 h-4 text-amber-700" />;
      case 'employment': return <FileText className="w-4 h-4 text-emerald-700" />;
      case 'alert': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'offer': return <Award className="w-4 h-4 text-blue-600" />;
      case 'delivery': return <Truck className="w-4 h-4 text-neutral-600" />;
      case 'flight': return <Plane className="w-4 h-4 text-cyan-600" />;
      case 'promo': return <Tag className="w-4 h-4 text-red-500" />;
      case 'mugs_note': return <Coffee className="w-4 h-4 text-amber-800" />;
      case 'house_icon_note': return <Home className="w-4 h-4 text-indigo-600" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  // Convert scroll progress (0-600) into opacity and transform values for exits
  // Beyond progress >= 500, we start fading/moving Hero up
  const progressRatio = Math.min(Math.max((progress - 400) / 200, 0), 1);
  const opacity = 1 - progressRatio;
  const translateY = -progressRatio * 100; // Slide up

  if (opacity <= 0) return null;

  return (
    <div 
      className="absolute inset-0 z-10 overflow-hidden pointer-events-none transition-transform duration-300 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="hero-scene-container"
    >
      {/* Scattered background paper cards */}
      {HERO_SNIPPETS.map((card) => {
        // Calculations for original pile -> release exploded positioning
        const originX = '50%';
        const originY = '50%';
        
        // When exploded is true, use card.left & card.top. When false, use center pile
        const currentStyle: React.CSSProperties = exploded ? {
          left: card.left,
          top: card.top,
          opacity: 1,
          transform: `translate(-50%, -50%) rotate(${card.rotation}deg) scale(1)`,
          transition: `all 0.9s cubic-bezier(0.19, 1, 0.22, 1) ${card.delay}s`,
        } : {
          left: originX,
          top: originY,
          opacity: 0.3,
          transform: `translate(-50%, -50%) rotate(0deg) scale(0.3)`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        };

        return (
          <div
            key={card.id}
            className={`absolute flex flex-col p-3 rounded-md shadow-sm border border-neutral-200/50 bg-paper transition-all animate-orbit-hover-slow max-md:hidden`}
            style={{
              ...currentStyle,
              width: card.width,
              backgroundColor: card.color,
              boxShadow: '2px 4px 12px var(--color-paper-shadow)',
              // Staggered infinite orbit offset
              animationDelay: `${card.delay * 2}s`
            }}
          >
            {/* Tiny staple aesthetic on some cards */}
            {parseInt(card.id.replace('s', '')) % 3 === 0 && (
              <div className="staple top-[-4px] left-[40%]" />
            )}

            <div className="flex items-center justify-between mb-1.5 border-b border-neutral-100 pb-1">
              <span className="font-mono text-[9px] text-ink-muted tracking-wider uppercase font-semibold">
                {card.title}
              </span>
              {getIcon(card.type)}
            </div>

            {card.meta && (
              <div className="font-mono text-[9px] text-zinc-500 font-medium mb-1 truncate leading-tight">
                {card.meta}
              </div>
            )}

            {card.body && (
              <div className="font-serif text-[11px] text-zinc-700 leading-normal italic line-clamp-2">
                "{card.body}"
              </div>
            )}

            {card.badge && (
              <div className="absolute right-2 bottom-1.5 px-1 bg-neutral-100 border border-neutral-200 rounded font-mono text-[8px] text-neutral-600 scale-90">
                {card.badge}
              </div>
            )}

            {card.stamp && (
              <div 
                className="absolute right-4 bottom-2 text-[10px] font-bold tracking-widest uppercase border border-dashed rounded px-1.5 py-0.5"
                style={{
                  color: card.stampColor || '#7c2d12',
                  borderColor: card.stampColor || '#7c2d12',
                  transform: 'rotate(-12deg) scale(0.95)',
                  opacity: 0.8
                }}
              >
                {card.stamp}
              </div>
            )}
          </div>
        );
      })}

      {/* Center CTA Anchor Area */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 w-[420px] max-w-[90vw]"
        id="hero-cta-pivot"
      >
        {/* Decorative background Feather outline */}
        <div 
          className="absolute opacity-15 w-80 h-80 text-ink/20 pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            transform: hoveredCTA ? 'scale(1.15) rotate(15deg)' : 'scale(1) rotate(0deg)'
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-[0.75] fill-none" stroke="currentColor">
            <path d="M100 20 C100 20, 150 70, 150 110 C150 150, 110 180, 100 180 C90 180, 50 150, 50 110 C50 70, 100 20, 100 20 Z" />
            <path d="M100 20 Q120 80, 100 180" />
            <path d="M100 60 Q135 70, 142 85" />
            <path d="M100 90 Q140 100, 148 115" />
            <path d="M100 120 Q135 130, 140 145" />
            <path d="M100 60 Q65 70, 58 85" />
            <path d="M100 90 Q60 100, 52 115" />
            <path d="M100 120 Q65 130, 60 145" />
          </svg>
        </div>

        {/* Brand visual header */}
        <div className="flex items-center gap-1.5 mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          <span>P O R T F O L I O</span>
          <span>•</span>
          <span>D A N F O R D C H R I S S</span>
        </div>

        {/* Giant cursive center headline */}
        <div 
          className="font-serif text-[46px] max-sm:text-[34px] tracking-tight text-[#111] mb-8 text-center select-text block"
          style={{
            animation: 'text-letter-spread 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both'
          }}
        >
          <span className="inline-block hover:translate-y-[-4px] transition-transform duration-200">P</span>roducts,
          <br />
          <span>systems, and apps that ship.</span>
        </div>

        {/* Immersive UI Styled CTA Button */}
        <button
          onClick={() => setShowProfileCard(true)}
          onMouseEnter={() => setHoveredCTA(true)}
          onMouseLeave={() => setHoveredCTA(false)}
          id="btn-got-mail-cta"
          className="group relative px-10 py-5 bg-[#F9F7F2]/40 hover:bg-[#F9F7F2]/95 transition-all rounded-2xl cursor-pointer active:scale-95"
          style={{
            boxShadow: hoveredCTA ? '0 12px 30px rgba(0,0,0,0.08)' : '0 4px 16px rgba(0,0,0,0.02)',
          }}
        >
          {/* Dashed outer border specified in design HTML */}
          <div className="absolute inset-x-0 inset-y-0 border-2 border-dashed border-black/20 rounded-2xl group-hover:border-black/40 transition-colors"></div>
          
          <span className="relative z-10 flex items-center gap-4 text-lg font-medium tracking-wide text-zinc-800">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
              <span className="font-serif text-xs italic font-bold">d</span>
            </div>
            <span>Open Portfolio</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-zinc-500" />
          </span>
        </button>

        {/* Scroll helper nudge in index style */}
        <div className="mt-10 flex flex-col items-center gap-1 font-mono text-[9px] text-zinc-400 tracking-wider">
          <span>SCROLL THROUGH SELECTED WORK</span>
          <div className="w-[1px] h-6 bg-zinc-300 animate-pulse mt-1" />
        </div>
      </div>

      {/* Portfolio dossier card */}
      {showProfileCard && (
        <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 pointer-events-auto">
          <div 
            className="bg-[#faf8f4] border-[3px] border-double border-zinc-700 rounded-lg p-6 max-w-sm w-full shadow-2xl relative rotate-[-1deg]"
            style={{
              backgroundImage: 'radial-gradient(#e5e0d3 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Ink Stain Decoration */}
            <div className="absolute -top-7 -right-7 w-20 h-20 bg-amber-900/10 rounded-full blur-xl pointer-events-none" />

            <button 
              onClick={() => {
                setShowProfileCard(false);
                setProfileCardOpen(false);
              }}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-neutral-200 text-zinc-500 hover:text-ink cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header stamps */}
            <div className="flex justify-between items-start mb-6">
              <div 
                className="stamp-ink text-[10px] text-stamp-red"
                style={{ transform: 'rotate(-12deg)' }}
              >
                Selected Work
              </div>
              <div className="font-mono text-[9px] text-zinc-500 text-right">
                DOSSIER READY<br />
                PORTFOLIO INDEX
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink mb-1.5">
                Danford Chriss
              </h2>
              <p className="font-serif italic text-sm text-zinc-600">
                "Full stack, DevOps, and mobile engineer building practical products."
              </p>
            </div>

            {/* Portfolio snapshot */}
            <div className="flex flex-col gap-3">
              {profileCardOpen ? (
                <div className="flex flex-col items-center justify-center py-6 text-center animate-pulse">
                  <CheckCircle className="w-9 h-9 text-emerald-600 mb-2" />
                  <span className="text-sm font-semibold text-emerald-800">Portfolio Opened</span>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 max-w-[220px] leading-relaxed">
                    Focus on IPF OS, published mobile apps, and the work history across IPF, freelancing, and startup builds.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setProfileCardOpen(true);
                    setTimeout(() => {
                      setShowProfileCard(false);
                      setProfileCardOpen(false);
                    }, 2400);
                  }}
                  className="group relative w-full flex items-center justify-center gap-4 py-4 px-6 bg-white hover:bg-neutral-50 border-2 border-dashed border-black/15 hover:border-black/35 rounded-xl font-sans text-sm font-semibold text-zinc-700 cursor-pointer transition-all active:scale-95"
                >
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">
                    d
                  </div>
                  <span className="text-sm font-medium tracking-wide">Read profile snapshot</span>
                </button>
              )}

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 my-2">
                <div className="h-[1px] bg-zinc-200 flex-1" />
                <span className="px-2">PORTFOLIO OVERVIEW</span>
                <div className="h-[1px] bg-zinc-200 flex-1" />
              </div>

              <div className="text-[10px] font-mono text-zinc-500 leading-relaxed text-center">
                Current signals: enterprise product delivery, mobile apps in production, web builds, and a career path spanning product, backend, and DevOps work.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 text-center font-serif italic text-xs text-zinc-500">
              Danford Chriss Portfolio
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
