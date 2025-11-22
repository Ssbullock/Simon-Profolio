import React from 'react';

interface Props {
  src: string;
  alt: string;
  annotations: Array<{ label: string; x: number; y: number; w: number; h: number }>;
}

export const CyberOverlay: React.FC<Props> = ({ src, alt, annotations }) => {
  return (
    <div className="relative inline-block overflow-hidden border-2 border-hud-green group">
        {/* Background Image */}
        <img 
            src={src} 
            alt={alt} 
            className="block w-full h-auto grayscale contrast-125 brightness-75 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" 
        />
        
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI1NSwgMCwgMC4xKSIvPgo8L3N2Zz4=')] pointer-events-none z-10 opacity-50"></div>

        {/* Annotations */}
        {annotations.map((ann, idx) => (
            <div 
                key={idx}
                className="absolute border border-hud-green/80 shadow-[0_0_5px_rgba(0,255,0,0.5)] flex flex-col items-start justify-between hover:bg-hud-green/10 transition-colors"
                style={{ 
                    left: `${ann.x}%`, 
                    top: `${ann.y}%`, 
                    width: `${ann.w}%`, 
                    height: `${ann.h}%` 
                }}
            >
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-hud-green"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-hud-green"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-hud-green"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-hud-green"></div>

                {/* Label Tag */}
                <div className="bg-hud-green text-black text-[10px] font-bold px-1 uppercase tracking-tighter translate-y-[-100%]">
                    {ann.label}
                </div>

                {/* Connecting line to text (fake) */}
                <div className="absolute top-1/2 right-[-50%] w-[50%] h-[1px] bg-hud-green hidden md:block"></div>
                <div className="absolute top-1/2 right-[-50%] bg-hud-green text-black text-[10px] px-2 py-0.5 translate-x-full -translate-y-1/2 hidden md:block">
                     DETAILS: 0x{idx}F
                </div>
            </div>
        ))}
        
        {/* Global HUD Elements */}
        <div className="absolute top-2 left-2 text-[10px] text-hud-green font-mono">
            REC [●] 00:24:19 <br/>
            ISO 800 / F4.0
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] text-hud-green font-mono text-right">
            BATTERY: 87% <br/>
            SYS: ONLINE
        </div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-hud-green/20 pointer-events-none"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-hud-green/20 pointer-events-none"></div>
    </div>
  );
};
