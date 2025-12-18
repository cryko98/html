
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ErrorWindowData } from './types';
import { CRYPTO_SLANG, CONTRACT_ADDRESS, TICKER, FULL_NAME, MAIN_IMG_URL } from './constants';
import ModernWindow from './components/ModernWindow';
import StartMenu from './components/StartMenu';

const App: React.FC = () => {
  const [windows, setWindows] = useState<ErrorWindowData[]>([]);
  const [copied, setCopied] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const nextId = useRef(0);
  const zIndexRef = useRef(10);

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
    }, 2000);

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

  // Close start menu when clicking anywhere else
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

      {/* Main Character Foreground (z-index 100) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
        <div className="relative max-w-[85%] md:max-w-[480px] lg:max-w-[550px] animate-float">
          <img 
            src={MAIN_IMG_URL} 
            alt="Character" 
            className="w-full h-auto character-img drop-shadow-2xl"
          />
        </div>
      </div>

      {/* UI Elements Layer (z-index 200) */}
      <div className="relative z-[200] w-full h-full flex flex-col justify-between pointer-events-none p-6">
        
        {/* Header Section */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="bg-[#ece9d8] p-4 border-2 border-[#0058e6] rounded-md shadow-lg">
            <h1 className="text-2xl md:text-3xl font-black text-[#0058e6] uppercase pixel-font tracking-tight">
              {FULL_NAME}
            </h1>
            <div className="flex items-center gap-2 mt-1">
                <p className="text-red-600 font-bold text-lg md:text-xl pixel-font tracking-widest uppercase italic">
                  {TICKER}
                </p>
            </div>
          </div>

          <div className="flex gap-3">
            <a 
              href="https://x.com/i/communities/2001188753373634818" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ece9d8] border-2 border-[#0058e6] p-2 rounded-md hover:brightness-110 transition-all active:scale-95 shadow-md group"
            >
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </header>

        {/* Footer Section (CA Box) */}
        <footer className="flex justify-center pb-16">
          <div className="pointer-events-auto bg-[#ece9d8] border-2 border-[#0058e6] p-6 rounded-md max-w-full w-[550px] shadow-2xl">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-[#0058e6] uppercase tracking-widest font-mono pl-1">CA: EhR8t2Hd9KikSPiRHdHs8WidCLa3T1VEPFpnCsRRpump</label>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="bg-white border-2 border-[#0058e6] rounded px-4 py-3 flex-grow flex items-center overflow-hidden">
                    <span className="text-black font-mono text-xs md:text-sm break-all font-bold">{CONTRACT_ADDRESS}</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-[#ece9d8] border-2 border-[#0058e6] hover:bg-white px-8 py-3 rounded text-base font-bold text-[#0058e6] transition-all active:scale-95 shadow-sm whitespace-nowrap"
                >
                  {copied ? '✓ COPIED' : 'COPY CA'}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Start Menu */}
      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}

      {/* XP Taskbar */}
      <div className="absolute bottom-0 w-full xp-taskbar h-10 z-[250] flex items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
        <button 
          onClick={toggleStartMenu}
          className={`xp-start-btn h-full px-5 flex items-center gap-2 italic font-black text-white text-lg tracking-wider transition-transform active:scale-95 ${showStartMenu ? 'brightness-75' : ''}`}
        >
           <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="white">
              <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm0 9h7v7h-7v-7zm-9 0h7v7H4v-7z"/>
           </svg>
           start
        </button>
        
        <div className="flex-grow flex items-center px-4 gap-2 overflow-hidden">
            <div className="bg-[#3d7bad] h-8 px-4 rounded border-r border-[#245edb] flex items-center text-white text-xs font-bold truncate">
                $HTML Explorer
            </div>
            <div className="bg-[#3d7bad] h-8 px-4 rounded border-r border-[#245edb] flex items-center text-white text-xs font-bold truncate opacity-60">
                Pump.fun
            </div>
        </div>
        
        <div className="bg-[#0997fb] h-full px-4 flex flex-col items-center justify-center text-[11px] font-bold text-white border-l border-[#0058e6] shadow-inner min-w-[100px]">
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
