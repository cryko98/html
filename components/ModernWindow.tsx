
import React from 'react';
import { ErrorWindowData } from '../types';

interface ModernWindowProps {
  data: ErrorWindowData;
  onClose: (id: number) => void;
}

const ModernWindow: React.FC<ModernWindowProps> = ({ data, onClose }) => {
  return (
    <div
      className="absolute bg-[#ece9d8] xp-window w-64 md:w-80 pointer-events-auto overflow-hidden"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        zIndex: data.zIndex,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Title Bar */}
      <div className="xp-title-bar flex items-center justify-between px-2 py-1.5 text-white text-[13px] font-bold shadow-inner">
        <div className="flex items-center gap-2">
           <svg className="w-4 h-4 shadow-sm" viewBox="0 0 24 24" fill="white">
             <path d="M12 2L4 12h16L12 2z"/>
           </svg>
           <span className="drop-shadow-md">Critical Error - $HTML</span>
        </div>
        <button 
          onClick={() => onClose(data.id)}
          className="xp-close-btn w-6 h-6 flex items-center justify-center rounded-sm text-white font-black text-lg transition-transform hover:brightness-110 active:scale-95"
        >
          <span className="leading-none -mt-1">×</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5">
        <div className="flex gap-4 items-start">
            <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white shadow-md flex-shrink-0">
                <span className="text-white font-bold text-2xl leading-none">X</span>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-sm text-black font-sans leading-relaxed font-medium">{data.message}</p>
            </div>
        </div>
        
        <div className="flex justify-center gap-3">
            <button 
                onClick={() => onClose(data.id)}
                className="bg-[#ece9d8] hover:bg-[#f5f2e1] px-6 py-1 rounded border border-[#0058e6] text-sm text-black shadow-sm active:bg-[#dcd9c8]"
            >
                OK
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModernWindow;
