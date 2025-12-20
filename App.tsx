
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ErrorWindowData } from './types';
import { CRYPTO_SLANG, CONTRACT_ADDRESS, TICKER, FULL_NAME, MAIN_IMG_URL, LOGO_URL } from './constants';
import ModernWindow from './components/ModernWindow';
import StartMenu from './components/StartMenu';

const App: React.FC = () => {
  const [windows, setWindows] = useState<ErrorWindowData[]>([]);
  const [copied, setCopied] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const nextId = useRef(0);
  const zIndexRef = useRef(10);

  // WASD Movement State
  const [catPos, setCatPos] = useState({ x: 0, y: 0 }); // Offset from center
  const keysPressed = useRef<Set<string>>(new Set());
  const requestRef = useRef<number>(null);

  const moveCat = useCallback(() => {
    const speed = 12; // Increased speed for better feel
    setCatPos((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      if (keysPressed.current.has('w')) newY -= speed;
      if (keysPressed.current.has('s')) newY += speed;
      if (keysPressed.current.has('a')) newX -= speed;
      if (keysPressed.current.has('d')) newX += speed;
      
      // Optional: boundary checks could go here, but "whole page" implies freedom
      return { x: newX, y: newY };
    });
    requestRef.current = requestAnimationFrame(moveCat);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        keysPressed.current.add(key);
        if (!requestRef.current) {
          requestRef.current = requestAnimationFrame(moveCat);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current.delete(key);
      if (keysPressed.current.size === 0 && requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [moveCat]);

  const spawnWindow = useCallback(() => {
    const randomMsg = CRYPTO_SLANG[Math.floor(Math.random() * CRYPTO_SLANG.length)];
    const newWindow: ErrorWindowData = {
      id: nextId.current++,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      message: randomMsg,
      zIndex: zIndexRef.current++,
    };

    setWindows(prev => {
        const next = [...prev, newWindow];
        if (next.length > 20) return next.slice(1);
        return next;
    });
  }, []);

  useEffect(() => {
    for(let i=0; i<6; i++) {
        setTimeout(spawnWindow, i * 400);
    }

    const interval = setInterval(() => {
      spawnWindow();
    }, 2500);

    return () => clearInterval(interval);
  }, [spawnWindow]);

  const removeWindow = (id: number) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStartMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStartMenu(!showStartMenu);
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      if (showStartMenu) setShowStartMenu(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [showStartMenu]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#245edb] font-sans selection:bg-[#3d7bad] selection:text-white">
      {/* Background Error Windows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {windows.map(win => (
          <ModernWindow key={win.id} data={win} onClose={removeWindow} />
        ))}
      </div>

      {/* Movable Hero Cat (z-index 100) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
        <div 
          className="relative transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: `translate(${catPos.x}px, ${catPos.y}px)` }}
        >
          {/* Internal wrapper for float animation so it doesn't conflict with translation */}
          <div className="animate-float max-w-[85vw] md:max-w-[400px] lg:max-w-[500px]">
            <img 
              src={MAIN_IMG_URL} 
              alt="Movable Cat" 
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* UI Elements Layer (z-index 200) */}
      <div className="relative z-[200] w-full h-full flex flex-col justify-between pointer-events-none p-4 md:p-8">
        
        {/* Header Section */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="bg-[#ece9d8] p-4 border-2 border-[#0058e6] rounded-md shadow-[4px_4px_0_rgba(0,0,0,0.2)] flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded border-2 border-[#0058e6] p-0.5 flex items-center justify-center overflow-hidden">
               <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-[#0058e6] uppercase pixel-font tracking-tighter leading-none">
                {FULL_NAME}
              </h1>
              <p className="text-red-600 font-bold text-lg md:text-xl pixel-font tracking-widest uppercase italic leading-none mt-1">
                {TICKER}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <a 
              href="https://x.com/i/communities/2002194034136105331" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ece9d8] border-2 border-[#0058e6] p-2.5 rounded-md hover:brightness-110 transition-all active:scale-95 shadow-md group"
            >
              <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </header>

        {/* Footer Section (CA Box) */}
        <footer className="flex flex-col items-center gap-4 pb-16">
          <div className="pointer-events-auto bg-[#ece9d8] border-2 border-[#0058e6] p-4 md:p-6 rounded-md max-w-full w-[580px] shadow-2xl">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-[#0058e6] uppercase tracking-widest font-mono pl-1 opacity-70">CONTRACT ADDRESS</label>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="bg-white border-2 border-[#0058e6] rounded px-4 py-3 flex-grow flex items-center overflow-hidden shadow-inner">
                    <span className="text-black font-mono text-xs md:text-sm break-all font-bold tracking-tight">{CONTRACT_ADDRESS}</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-[#ece9d8] border-2 border-[#0058e6] hover:bg-white px-8 py-3 rounded text-base font-black text-[#0058e6] transition-all active:scale-95 shadow-md whitespace-nowrap uppercase italic"
                >
                  {copied ? '✓ COPIED' : 'COPY CA'}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* WASD Guide - Bottom Right */}
      <div className="absolute bottom-16 right-6 z-[300] bg-[#ece9d8] border-2 border-[#0058e6] p-4 rounded-md shadow-2xl flex flex-col items-center gap-3 select-none pointer-events-auto transition-opacity hover:opacity-100">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex justify-center">
            <kbd className={`w-11 h-11 flex items-center justify-center bg-white border-2 border-[#0058e6] rounded shadow-[2px_2px_0_rgba(0,0,0,0.1)] font-black text-[#0058e6] text-xl transition-all ${keysPressed.current.has('w') ? 'bg-[#0058e6] text-white scale-90 translate-y-1' : ''}`}>W</kbd>
          </div>
          <div className="flex gap-1.5">
            <kbd className={`w-11 h-11 flex items-center justify-center bg-white border-2 border-[#0058e6] rounded shadow-[2px_2px_0_rgba(0,0,0,0.1)] font-black text-[#0058e6] text-xl transition-all ${keysPressed.current.has('a') ? 'bg-[#0058e6] text-white scale-90 translate-y-1' : ''}`}>A</kbd>
            <kbd className={`w-11 h-11 flex items-center justify-center bg-white border-2 border-[#0058e6] rounded shadow-[2px_2px_0_rgba(0,0,0,0.1)] font-black text-[#0058e6] text-xl transition-all ${keysPressed.current.has('s') ? 'bg-[#0058e6] text-white scale-90 translate-y-1' : ''}`}>S</kbd>
            <kbd className={`w-11 h-11 flex items-center justify-center bg-white border-2 border-[#0058e6] rounded shadow-[2px_2px_0_rgba(0,0,0,0.1)] font-black text-[#0058e6] text-xl transition-all ${keysPressed.current.has('d') ? 'bg-[#0058e6] text-white scale-90 translate-y-1' : ''}`}>D</kbd>
          </div>
        </div>
        <div className="text-center px-2">
          <p className="text-[12px] font-black text-[#0058e6] uppercase tracking-tight italic">MOVE THE CAT!</p>
          <p className="text-[10px] font-bold text-gray-600 uppercase mt-0.5">Use WASD buttons to move<br/>the cat across the page!</p>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}

      {/* XP Taskbar */}
      <div className="absolute bottom-0 w-full xp-taskbar h-10 z-[250] flex items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] px-1">
        <button 
          onClick={toggleStartMenu}
          className={`xp-start-btn h-full px-5 flex items-center gap-2 italic font-black text-white text-lg tracking-wider transition-transform active:scale-95 ${showStartMenu ? 'brightness-75 shadow-inner' : ''}`}
        >
           <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="white">
              <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm0 9h7v7h-7v-7zm-9 0h7v7H4v-7z"/>
           </svg>
           start
        </button>
        
        <div className="flex-grow flex items-center px-4 gap-2 overflow-hidden">
            <div className="bg-[#3d7bad] h-8 px-4 rounded border-r border-[#245edb] flex items-center text-white text-xs font-bold truncate shadow-sm">
                {TICKER} Explorer
            </div>
            <div className="bg-[#3d7bad] h-8 px-4 rounded border-r border-[#245edb] flex items-center text-white text-xs font-bold truncate opacity-60">
                Pump.fun
            </div>
        </div>
        
        <div className="bg-[#0997fb] h-full px-5 flex items-center justify-center text-[12px] font-bold text-white border-l border-[#0058e6] shadow-inner min-w-[120px]">
            <span className="drop-shadow-sm font-mono tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
