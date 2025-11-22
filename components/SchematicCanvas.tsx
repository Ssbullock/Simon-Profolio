import React, { useRef, useState } from 'react';
import { Project, WirePath } from '../types';
import { SchematicSymbol } from './SchematicSymbol';

interface Props {
  projects: Project[];
  wires: WirePath[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export const SchematicCanvas: React.FC<Props> = ({ projects, wires, selectedProjectId, onSelectProject }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const s = Math.exp(-e.deltaY / 500);
      setScale(prev => Math.min(Math.max(0.2, prev * s), 5));
    } else {
      setPan(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as Element).tagName === 'svg' || (e.target as Element).id === 'bg-rect') {
        setIsDragging(true);
        setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex-1 h-full w-full overflow-hidden bg-cad-bg relative cursor-crosshair font-mono">
      
      {/* Overlay UI: Coordinates / Info */}
      <div className="absolute top-4 left-4 bg-cad-ui/80 backdrop-blur text-cad-text border border-cad-uiBorder p-2 text-xs rounded z-10 pointer-events-none shadow-lg">
        <div className="font-bold text-cad-accent mb-1">SHEET 1: MAIN_SYSTEM</div>
        <div>SCALE: {(scale * 100).toFixed(0)}%</div>
        <div>X: {-pan.x.toFixed(0)} Y: {-pan.y.toFixed(0)}</div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-cad-ui/90 backdrop-blur border border-cad-uiBorder p-3 rounded shadow-xl z-10 w-48">
        <h4 className="text-cad-accent font-bold text-xs border-b border-gray-600 pb-1 mb-2">SCHEMATIC LEGEND</h4>
        <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black border border-cad-wire"></div>
                <span>IC (Digital/System)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-cad-wire"></div>
                <span>OpAmp (Analog)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-cad-wire"></div>
                <span>Connector/IO</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-cad-bus"></div>
                <span>Signal Bus</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-cad-wire"></div>
                <span>Wire Trace</span>
            </div>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="w-full h-full bg-[#1e1e1e]"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
             {/* Optimized Grid Pattern */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2a2a2a" strokeWidth="1"/>
                <rect width="2" height="2" fill="#333333" x="0" y="0" />
            </pattern>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
            
            {/* Background Rect to catch events */}
            <rect id="bg-rect" x="-5000" y="-5000" width="10000" height="10000" fill="url(#grid)" />

            {/* Wires */}
            {wires.map(wire => (
                <polyline 
                    key={wire.id} 
                    points={wire.points} 
                    fill="none" 
                    stroke={wire.color || '#ffd700'} 
                    strokeWidth="2" 
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="hover:stroke-white hover:stroke-[3] transition-all duration-75"
                />
            ))}

            {/* Junction Dots */}
            <circle cx="450" cy="200" r="4" fill="#ffd700" />
            <circle cx="450" cy="450" r="4" fill="#ffd700" />
            <circle cx="200" cy="325" r="4" fill="#4fc3f7" />

            {/* Components */}
            {projects.map(p => (
                <SchematicSymbol 
                    key={p.id} 
                    project={p} 
                    onClick={onSelectProject} 
                    isSelected={selectedProjectId === p.id}
                />
            ))}

            {/* Professional Title Block */}
            <g transform="translate(800, 700)">
                <rect x="0" y="0" width="400" height="120" fill="#1e1e1e" stroke="#808080" strokeWidth="2" />
                
                {/* Vertical Dividers */}
                <line x1="280" y1="0" x2="280" y2="120" stroke="#808080" strokeWidth="1" />
                <line x1="340" y1="80" x2="340" y2="120" stroke="#808080" strokeWidth="1" />

                {/* Horizontal Dividers */}
                <line x1="0" y1="80" x2="400" y2="80" stroke="#808080" strokeWidth="1" />
                <line x1="280" y1="40" x2="400" y2="40" stroke="#808080" strokeWidth="1" />

                {/* Content */}
                <text x="15" y="30" fill="#ffffff" fontSize="22" fontWeight="bold" letterSpacing="1">SIMON BULLOCK</text>
                <text x="15" y="55" fill="#aaaaaa" fontSize="14">ELECTRICAL & COMPUTER ENGINEERING</text>
                <text x="15" y="70" fill="#aaaaaa" fontSize="10">M.S. Johns Hopkins | B.S. Binghamton</text>

                <text x="290" y="25" fill="#aaaaaa" fontSize="10">DRAWING TITLE</text>
                <text x="290" y="35" fill="#ffffff" fontSize="10" fontWeight="bold">PORTFOLIO_MASTER</text>

                <text x="290" y="65" fill="#aaaaaa" fontSize="10">REV</text>
                <text x="310" y="70" fill="#ffffff" fontSize="16" fontWeight="bold">A.2</text>

                <text x="15" y="100" fill="#aaaaaa" fontSize="10">FILE:</text>
                <text x="45" y="100" fill="#ffffff" fontSize="10">C:/USERS/SBULLOCK/DESIGNS/MAIN.SCH</text>

                <text x="290" y="100" fill="#aaaaaa" fontSize="10">SHEET</text>
                <text x="295" y="112" fill="#ffffff" fontSize="12" fontWeight="bold">1 OF 1</text>

                <text x="350" y="100" fill="#aaaaaa" fontSize="10">DATE</text>
                <text x="350" y="112" fill="#ffffff" fontSize="12">MAY 2027</text>
            </g>
        </g>
      </svg>
    </div>
  );
};