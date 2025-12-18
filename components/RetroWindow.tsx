
import React from 'react';
import { ErrorWindowData } from '../types';

interface RetroWindowProps {
  data: ErrorWindowData;
  onClose: (id: number) => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ data, onClose }) => {
  return (
    <div
      className="absolute bg-[#c0c0c0] p-0.5 win-shadow w-64 md:w-80 pointer-events-auto"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        zIndex: data.zIndex,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Title Bar */}
      <div className="win-title-bar flex items-center justify-between px-1 py-0.5 text-white text-xs font-bold">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2L4 12h16L12 2z"/>
          </svg>
          System Error
        </span>
        <button 
          onClick={() => onClose(data.id)}
          className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center win-shadow hover:bg-[#d0d0d0] active:win-button-shadow"
        >
          <span className="leading-none -mt-0.5">×</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex gap-4 items-start">
        <div className="bg-red-600 rounded-full p-2 flex-shrink-0">
            <span className="text-white font-bold text-xl leading-none">!</span>
        </div>
        <div className="flex flex-col gap-4 w-full">
            <p className="text-sm text-black font-mono break-words">{data.message}</p>
            <div className="flex justify-center">
                <button 
                    onClick={() => onClose(data.id)}
                    className="bg-[#c0c0c0] px-6 py-1 text-sm border-2 border-white win-shadow hover:bg-[#d0d0d0] active:win-button-shadow"
                >
                    OK
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RetroWindow;
