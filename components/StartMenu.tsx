
import React from 'react';
import { TICKER, MAIN_IMG_URL } from '../constants';

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const links = [
    {
      name: 'X.com Community',
      url: 'https://x.com/i/communities/2002194034136105331',
      iconUrl: 'https://abs.twimg.com/responsive-web/client-web/icon-ios.8ea219d5.png'
    },
    {
      name: 'Dexscreener',
      url: 'https://dexscreener.com/solana/HAPJPDB55YnjMpxxhoJ9CYQLgpjBPXu7X5i6GKTRCJAA',
      iconUrl: 'https://dexscreener.com/favicon.png'
    },
    {
      name: 'Pump.fun',
      url: 'https://pump.fun/coin/EAWhwEAu9qcp6wzDVMQzdQ5wcpivWXYUhBDv7huBpump',
      iconUrl: 'https://pump.fun/favicon.ico'
    }
  ];

  return (
    <div 
      className="absolute bottom-10 left-0 w-72 bg-white rounded-t-lg shadow-2xl z-[300] flex flex-col overflow-hidden border-t-2 border-r-2 border-[#0058e6]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Header */}
      <div className="xp-title-bar p-3 flex items-center gap-3 text-white border-b border-[#0046b4]">
        <div className="w-10 h-10 rounded-md border-2 border-white/50 bg-[#ece9d8] flex items-center justify-center text-xl overflow-hidden shadow-sm">
           <img src={MAIN_IMG_URL} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-bold text-sm drop-shadow-md tracking-tight">{TICKER.replace('$', '')} Administrator</span>
      </div>

      <div className="flex bg-white">
        {/* Left Side (Programs) */}
        <div className="flex-1 p-2 border-r border-[#d3d3d3]">
          <div className="text-[10px] font-bold text-[#808080] mb-2 px-1 uppercase tracking-tighter">Essential Tools</div>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-1.5 hover:bg-[#316ac5] hover:text-white rounded group transition-colors"
                onClick={onClose}
              >
                <div className="w-6 h-6 flex-shrink-0 bg-white rounded-sm p-0.5 shadow-sm border border-gray-200 group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={link.iconUrl} alt={link.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-bold font-sans">{link.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-4 pt-2 border-t border-[#d3d3d3] flex flex-col">
              <button className="flex items-center justify-between p-2 hover:bg-[#316ac5] hover:text-white rounded group">
                  <span className="text-xs font-bold">All Programs</span>
                  <span className="text-[#0058e6] group-hover:text-white text-[10px]">▶</span>
              </button>
          </div>
        </div>

        {/* Right Side (System) */}
        <div className="w-32 bg-[#d3e5fa] p-2 flex flex-col gap-2 shadow-inner">
           <div className="text-[10px] font-bold text-[#4d6185] mb-1 px-1">SYSTEM</div>
           <div className="flex flex-col gap-1">
               <div className="text-[11px] font-bold text-[#000080] p-1 cursor-default opacity-60">My Wallet</div>
               <div className="text-[11px] font-bold text-[#000080] p-1 cursor-default opacity-60">Control Panel</div>
               <div className="text-[11px] font-bold text-[#000080] p-1 cursor-default opacity-60">Help Center</div>
           </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-[#1e52bd] p-2 flex justify-end gap-2 border-t border-[#0046b4] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          <button 
            className="flex items-center gap-1 bg-[#dcdcdc] hover:bg-[#ececec] px-2 py-1 rounded shadow-sm border border-white/50 active:shadow-inner"
            onClick={onClose}
          >
              <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm border border-orange-600">⏻</div>
              <span className="text-[11px] font-bold text-black">Log Off</span>
          </button>
      </div>
    </div>
  );
};

export default StartMenu;
