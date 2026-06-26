/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DRAWERS_DATA } from '../data';
import { 
  Star, 
  Calendar, 
  FileText, 
  CreditCard, 
  Plane, 
  Package, 
  Bell, 
  BookOpen, 
  Tag,
  Trash2,
  X,
  Plus,
  Compass,
  CheckCircle2,
  Paperclip
} from 'lucide-react';
import { DrawerDetail, DrawerSlip } from '../types';

interface DrawersSceneProps {
  progress: number;
}

export default function DrawersScene({ progress }: DrawersSceneProps) {
  const [selectedDrawerId, setSelectedDrawerId] = useState<string | null>(null);
  const [activeDrawers, setActiveDrawers] = useState<DrawerDetail[]>(DRAWERS_DATA);
  const [clearedDrawerIds, setClearedDrawerIds] = useState<string[]>([]);
  const [ejectingSlipId, setEjectingSlipId] = useState<string | null>(null);

  // Range check: 5600 -> 6800
  const isVisible = progress >= 5400 && progress <= 7000;
  if (!isVisible) return null;

  // Calculate local transition animation state
  let opacity = 0;
  let translateY = 150;

  if (progress >= 5400 && progress < 5600) {
    const ratio = (progress - 5400) / 200;
    opacity = ratio;
    translateY = 150 * (1 - ratio);
  } else if (progress >= 5600 && progress <= 6600) {
    opacity = 1;
    translateY = 0;
  } else if (progress > 6600 && progress <= 7000) {
    const ratio = (progress - 6600) / 400;
    opacity = 1 - ratio;
    translateY = -150 * ratio;
  }

  // Find selected drawer details
  const focusedDrawer = activeDrawers.find(d => d.id === selectedDrawerId) || null;

  // Render matching lucide-react icon
  const renderIcon = (iconName: string, color: string) => {
    const props = { className: "w-5 h-5", style: { color } };
    switch (iconName) {
      case 'Star': return <Star {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'Package': return <Package {...props} />;
      case 'Bell': return <Bell {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Tag': return <Tag {...props} />;
      default: return <FileText {...props} />;
    }
  };

  // Perform clean up paper-ejection animation action
  const handleCleanUpDrawer = (drawerId: string) => {
    // Eject all slips sequentially with high-fidelity transition delay
    const target = activeDrawers.find(d => d.id === drawerId);
    if (!target) return;

    // Simulate ejection on UI
    setEjectingSlipId('all');
    setTimeout(() => {
      setClearedDrawerIds([...clearedDrawerIds, drawerId]);
      
      // Reduce item count inside drawer
      setActiveDrawers(activeDrawers.map(d => {
        if (d.id === drawerId) {
          return { ...d, count: 0, slips: [] };
        }
        return d;
      }));
      setEjectingSlipId(null);
    }, 750); // Eject transition time
  };

  const isCleared = (drawerId: string) => clearedDrawerIds.includes(drawerId);

  return (
    <div 
      className="absolute inset-0 z-15 flex flex-col justify-start md:justify-center items-center py-8 px-4 md:px-12 pointer-events-none transition-transform duration-100 ease-out select-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
      id="drawers-scene-container"
    >
      {/* Callout top labels */}
      <div className="text-center mb-10 max-w-xl">
        <span className="text-xs font-mono tracking-widest uppercase mb-2 block opacity-40">Sorting Drawers</span>
        <h2 className="text-3xl font-serif tracking-tight text-[#111] mb-2">Automate files, effortlessly.</h2>
        <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider">
          Click on any drawer to slide open and browse its categorized index card sheets.
        </p>
      </div>

      {/* Main Container Workspace holds 3x3 Cabinet and Sliding Detail Slips Sheet */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch justify-center gap-8 pointer-events-auto" id="cabinet-flexbox-workspace">
        
        {/* Drawers Cabinet: 3x3 Grid on Desktop, 1-col on Mobile */}
        <div 
          className="flex-1 bg-white border border-black/5 p-5 rounded-2xl shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-4 h-fit relative"
          style={{
            boxShadow: '0 20px 45px rgba(28,26,23,0.06)',
            backgroundImage: 'radial-gradient(#eee 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
          id="cabinet-3x3-surface"
        >
          {/* Wood veneer side accents for stationery desk feelings */}
          <div className="absolute top-0 bottom-0 left-[-8px] w-2 bg-[#d7caaf] border-r border-zinc-400 rounded-l" />
          <div className="absolute top-0 bottom-0 right-[-8px] w-2 bg-[#d7caaf] border-l border-zinc-400 rounded-r" />

          {activeDrawers.map((drawer) => {
            const isFocussed = selectedDrawerId === drawer.id;
            const drawerIsCleared = isCleared(drawer.id);

            // Open parameter controlling drawer physical open offset style
            const openness = isFocussed ? 'translate-y-1 scale-[1.015] shadow-inner border-neutral-400 bg-white/40' : 'bg-[#fffaf0] hover:bg-[#fffff8] shadow-md border-zinc-300';

            return (
              <button
                key={drawer.id}
                onClick={() => {
                  setSelectedDrawerId(isFocussed ? null : drawer.id);
                }}
                className={`relative h-[92px] p-3 rounded border flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer text-left select-none ${openness}`}
                style={{
                  boxShadow: isFocussed 
                    ? 'inset 0 6px 14px rgba(0,0,0,0.12)' 
                    : '2px 4px 10px rgba(28,26,23,0.08)'
                }}
              >
                {/* Paper jump peek-a-boo representation when focused */}
                {isFocussed && !drawerIsCleared && (
                  <div className="absolute top-[-10px] left-6 right-6 h-6 bg-white border-t border-x border-zinc-200 shadow-sm rounded-t-sm animate-bounce flex items-center justify-between px-2 text-[8px] font-mono text-zinc-400 pointer-events-none">
                    <span>INSPECT</span>
                    <Plus className="w-2.5 h-2.5" />
                  </div>
                )}

                {/* Drawer Label & Category Indicator */}
                <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 w-full">
                  <span className="font-mono text-[10px] font-bold text-zinc-800 uppercase tracking-widest flex items-center gap-1.5">
                    {renderIcon(drawer.icon, drawer.color)}
                    {drawer.label}
                  </span>

                  {/* Red/Green ink stamps if cleared vs unread counters */}
                  {drawerIsCleared ? (
                    <span className="font-mono text-[8px] text-stamp-green border border-emerald-300 bg-emerald-50 px-1 rounded uppercase font-bold scale-90">
                      ✓ CLEARED
                    </span>
                  ) : (
                    drawer.count > 0 && (
                      <span className="w-4 h-4 rounded-full text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs" style={{ backgroundColor: drawer.color }}>
                        {drawer.count}
                      </span>
                    )
                  )}
                </div>

                {/* Custom SVG Physical Finger Drawer Handle Center */}
                <div className="w-full flex justify-center py-1">
                  <div className="w-14 h-3 bg-[#e2dac3] border border-zinc-300 shadow-inner rounded-full flex items-center justify-center">
                    <div className="w-10 h-1 bg-[#cbbfa6] rounded-full" />
                  </div>
                </div>

                {/* Drawer base micro status line */}
                <div className="flex justify-between items-center text-[7.5px] font-mono text-zinc-400 w-full mt-1 uppercase">
                  <span>SECURE C-1</span>
                  <span>{drawerIsCleared ? 'EMPTY' : `${drawer.slips.length} SLIPS`}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sliding Envelope paper slips detail board */}
        <div 
          className="w-full lg:w-[380px] bg-[#fbfbf9] border border-zinc-300 rounded-xl p-5 shadow-2xl flex flex-col justify-between relative transition-all duration-300 overflow-hidden min-h-[360px]"
          style={{
            boxShadow: '0 15px 35px rgba(28,26,23,0.12)',
          }}
          id="sliding-envelope-detail-board"
        >
          {/* Manila top pocket header outline */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-rose-100/10 to-transparent" />

          {focusedDrawer ? (
            <div className="flex-1 flex flex-col h-full">
              
              {/* Slip content header details */}
              <div className="flex items-start justify-between border-b border-rose-200/50 pb-2 mb-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {renderIcon(focusedDrawer.icon, focusedDrawer.color)}
                    <h3 className="font-serif text-lg font-bold text-zinc-900">
                      Inside: {focusedDrawer.label}
                    </h3>
                  </div>
                  <p className="font-mono text-[9px] text-zinc-400 uppercase">
                    SLIP ARCHIVE PANEL
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedDrawerId(null)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-zinc-400 hover:text-ink cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Inside Allowed Scroll Regions for Drawer slips */}
              <div className="flex-1 overflow-y-auto allowed-scroll pr-1.5 space-y-3 mb-5 max-h-[290px]">
                {focusedDrawer.slips.length > 0 ? (
                  focusedDrawer.slips.map((slip) => (
                    <div 
                      key={slip.id}
                      className={`p-3.5 bg-white border border-neutral-200 rounded-md shadow-xs relative overflow-hidden transition-all duration-500 transform ${
                        ejectingSlipId === 'all' ? 'translate-x-full opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
                      }`}
                      style={{
                        borderLeft: `3px solid ${focusedDrawer.color}`
                      }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">
                          FROM: {slip.from}
                        </span>
                        <div className="flex gap-1 items-center">
                          {slip.amount && (
                            <span className="font-mono text-[9px] text-emerald-800 font-bold bg-emerald-50 px-1 rounded mr-1">
                              {slip.amount}
                            </span>
                          )}
                          <span className="font-mono text-[8px] text-zinc-400">
                            {slip.date}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif text-[13px] font-bold text-zinc-800 mb-1 leading-normal">
                        {slip.title}
                      </h4>

                      {slip.snippet && (
                        <p className="font-sans text-[11px] text-zinc-500 italic leading-relaxed">
                          "{slip.snippet}"
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-44 flex flex-col items-center justify-center p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-2 animate-bounce" />
                    <span className="font-serif italic text-sm text-zinc-800 font-semibold">
                      This drawer is pristine!
                    </span>
                    <p className="font-sans text-[11px] text-zinc-400 mt-1 max-w-[200px]">
                      All parsed cards have been safely reviewed and transformed.
                    </p>
                  </div>
                )}
              </div>

              {/* Envelope Slips Footer with clean up trigger */}
              {focusedDrawer.slips.length > 0 && (
                <div className="pt-3 border-t border-dashed border-zinc-200 flex justify-between items-center bg-white/50 p-2 rounded">
                  <span className="font-mono text-[9px] text-zinc-400">
                    {focusedDrawer.slips.length} PENDING RECORDS
                  </span>

                  <button
                    onClick={() => handleCleanUpDrawer(focusedDrawer.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-zinc-950 text-[#fffaf5] hover:bg-zinc-800 cursor-pointer text-xs font-mono tracking-wider rounded transition-colors active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-zinc-400" />
                    CLEAN UP DRAWER
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Compass className="w-10 h-10 text-zinc-300 mb-3 animate-spin duration-1000" style={{ animationDuration: '6s' }} />
              <h3 className="font-serif text-sm font-bold text-zinc-800 mb-1">
                Awaiting Selection
              </h3>
              <p className="font-sans text-[11.5px] text-zinc-400 max-w-[210px] leading-relaxed">
                Click any of the 9 desk drawer slips around the mechanical storage cabinet to explore details.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
