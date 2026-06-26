/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PEOPLE_CONTACTS } from '../data';
import { 
  Briefcase, 
  Mail, 
  MapPin, 
  BookOpen, 
  MessageSquare, 
  Link2, 
  ArrowLeftRight, 
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { PeopleContact } from '../types';

interface PeopleSceneProps {
  progress: number;
}

export default function PeopleScene({ progress }: PeopleSceneProps) {
  const [rotation, setRotation] = useState(0);
  const [activeContactIndex, setActiveContactIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef<{ x: number; rot: number }>({ x: 0, rot: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const contactsCount = PEOPLE_CONTACTS.length;
  // Spacing between portraits around circle (degrees)
  const angleStep = 360 / contactsCount;

  // Synchronize Contact Index rotation with scroll progress when not dragging!
  useEffect(() => {
    if (!isDragging && progress >= 4100 && progress <= 4650) {
      const angleStepLocal = 360 / contactsCount;
      const progressRatio = (progress - 4100) / 550;
      const rawIdx = Math.floor(progressRatio * contactsCount);
      const index = Math.min(contactsCount - 1, Math.max(0, rawIdx));
      
      const targetRot = (360 - (index * angleStepLocal)) % 360;
      setRotation(targetRot);
      setActiveContactIndex(index);
    }
  }, [progress, isDragging, contactsCount]);

  // Track dragging / touch movement
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    dragStartRef.current = { x: clientX, rot: rotation };
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartRef.current.x;
    // Scale deltaX to degrees of orbit rotation
    const multiplier = 0.4;
    const nextRotation = dragStartRef.current.rot + deltaX * multiplier;
    setRotation(nextRotation);
  };

  const handleEnd = () => {
    setIsDragging(false);
    // Dynamic snap to nearest contact index upon dragging release
    const normalizedRot = ((rotation % 360) + 360) % 360; 
    let closestIndex = 0;
    let minDiff = 360;

    for (let i = 0; i < contactsCount; i++) {
      const targetAngle = (360 - (i * angleStep)) % 360;
      let diff = Math.abs(normalizedRot - targetAngle);
      if (diff > 180) diff = 360 - diff;

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    
    // Smooth snap snap to that exact position
    const snappedRot = (360 - (closestIndex * angleStep)) % 360;
    
    // Resolve which rotation direction is shortest to prevent long flips
    const currentNorm = rotation % 360;
    const baseRot = rotation - currentNorm;
    
    let finalRot = baseRot + snappedRot;
    if (Math.abs(finalRot - rotation) > 180) {
      if (finalRot > rotation) finalRot -= 360;
      else finalRot += 360;
    }

    setRotation(finalRot);
    setActiveContactIndex(closestIndex);
  };

  // Mouse drag listeners
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  // Touch drag listeners for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Global mouse release fallback
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, rotation]);

  // Visibility tracking: bounds are 3800 -> 5000
  const isVisible = progress >= 3800 && progress <= 5000;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150;

  if (progress >= 3800 && progress < 4100) {
    const ratio = (progress - 3800) / 300;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 4100 && progress <= 4650) {
    opacity = 1;
    translateY = 0;
  } else if (progress > 4650 && progress <= 5000) {
    const ratio = (progress - 4650) / 350;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  const activeContact = PEOPLE_CONTACTS[activeContactIndex];

  return (
    <div 
      className="absolute inset-0 z-15 flex flex-col justify-start md:justify-center items-center py-10 px-4 md:px-12 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="people-scene-container"
    >
      {/* Callout top labels */}
      <div className="text-center mb-10 max-w-xl">
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">People Wiki</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">The work behind the work.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          A rotating dossier of roles, chapters, and public signals that shape the portfolio.
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleEnd}
        className={`w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-10 py-4 pointer-events-auto ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        id="people-constellation-workspace"
      >
        
        {/* Left Side: Drag Orbit Area */}
        <div className="relative w-80 h-80 flex-shrink-0 flex items-center justify-center border-2 border-dashed border-[#ebe0ca] rounded-full bg-paper/20">
          
          {/* Subtle center orbital point marker */}
          <div className="absolute w-2 h-2 bg-zinc-400 rounded-full" />
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#e9dcbf]/60 pointer-events-none" />

          {/* Guide labels */}
          <div className="absolute top-2 font-mono text-[7.5px] text-zinc-400 uppercase">
            ◄ DRAG TO ROTATE DECK ►
          </div>

          {/* Render individual portraits rotating around circle */}
          {PEOPLE_CONTACTS.map((contact, index) => {
            // angle computation in radians
            const contactAngle = index * angleStep;
            const absoluteAngle = contactAngle + rotation;
            const rad = (absoluteAngle * Math.PI) / 180;

            const radius = 110; // orbit radius in pixels
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            const isCurrent = index === activeContactIndex;

            return (
              <button
                key={contact.id}
                onClick={() => {
                  setActiveContactIndex(index);
                  // Snap rotation to bring clicked person to the rightmost/top focus point
                  const snappedRot = (360 - (index * angleStep)) % 360;
                  setRotation(snappedRot);
                }}
                className={`absolute w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer shadow-sm select-none border border-zinc-200/80`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) scale(${isCurrent ? 1.3 : 0.85})`,
                  backgroundColor: contact.avatarColor,
                  boxShadow: isCurrent ? '0 8px 16px rgba(28,26,23,0.14)' : '0 2px 6px rgba(28,26,23,0.06)',
                  zIndex: isCurrent ? 30 : 10,
                  transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {/* Monogram or silhouette */}
                <span className="font-mono text-xs font-bold text-zinc-800 uppercase tracking-widest pointer-events-none">
                  {contact.name.split(' ').map(n => n.charAt(0)).join('')}
                </span>

                {isCurrent && (
                  <div className="absolute -bottom-1 bg-zinc-900 text-white rounded font-mono text-[6.5px] px-1 py-0.2 tracking-widest font-semibold">
                    FOCUS
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Stationery Enriched dossiers (Attribute Card Family) */}
        <div 
          className="flex-1 w-full max-w-md bg-[#fffefb] border border-zinc-300 rounded-lg p-5 shadow-xl relative rotate-[0.5deg]"
          style={{
            backgroundImage: 'linear-gradient(rgba(229, 224, 211, 0.15) 1px, transparent 1px)',
            backgroundSize: '100% 18px',
            lineHeight: '18px'
          }}
          id="contact-portfolio-card"
        >
          {/* Tag Staple style header */}
          <div className="staple top-[-5px] left-10" />

          {/* Dossier Title */}
          <div className="flex justify-between items-start mb-4 border-b border-rose-100/60 pb-1 mt-1">
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                {activeContact.name}
              </h3>
              <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                {activeContact.role} • {activeContact.organization}
              </p>
            </div>
            
            <span className="font-mono text-[9px] text-[#cc4539] border border-[#cc4539]/30 bg-rose-50 px-2 py-0.5 rounded italic">
              ENRICHED CONTACT
            </span>
          </div>

          {/* Biography Notes snippet */}
          <div className="mb-4 bg-paper/50 p-3 rounded border border-zinc-200/50">
            <h4 className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Biography Notes
            </h4>
            <p className="font-serif text-xs leading-relaxed text-zinc-700 italic">
              "{activeContact.bio}"
            </p>
          </div>

          {/* Contacts Attributes grid inside ID style tag */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {activeContact.attributes.map((attr, idx) => (
              <div key={idx} className="p-2 border border-zinc-100 bg-[#faf9f5] rounded">
                <span className="font-mono text-[8px] text-zinc-400 block uppercase tracking-wider">
                  {attr.label}
                </span>
                <span className="font-mono text-[11.5px] font-semibold text-zinc-800 truncate block">
                  {attr.value}
                </span>
              </div>
            ))}
          </div>

          {/* Past interactions list items */}
          <div>
            <h4 className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-zinc-100 pb-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              Past Interactions Records
            </h4>
            <div className="space-y-2">
              {activeContact.pastInteractions.map((act, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs font-sans">
                  <span className="font-mono text-[8.5px] text-zinc-400 w-16 flex-shrink-0 mt-0.5">
                    {act.date}
                  </span>
                  <p className="text-zinc-700 leading-normal italic">
                    {act.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive touch tip footer */}
          <div className="mt-5 pt-3 border-t border-dashed border-zinc-200 flex justify-between items-center text-[9px] font-mono text-zinc-400">
            <span>DRAG CONSTELLATION RING TO SWAP</span>
            <span>CONTACT ID #{activeContact.id.toUpperCase()}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
