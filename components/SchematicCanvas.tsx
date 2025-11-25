import React, { useRef, useState, useEffect } from 'react';
import { Project, WirePath, Passive, SchematicRegion, ToolType } from '../types';
import { SchematicSymbol } from './SchematicSymbol';
import { SHEET_WIDTH, SHEET_HEIGHT } from '../constants';

interface Props {
  projects: Project[];
  wires: WirePath[];
  passives: Passive[];
  regions: SchematicRegion[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  activeTool: ToolType;
  scale: number;
  setScale: (s: number) => void;
}

export const SchematicCanvas: React.FC<Props> = ({
  projects, wires, passives, regions,
  selectedProjectId, onSelectProject,
  activeTool, scale, setScale
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Initial Center
  // Initial Center - Zoom to Fit
  useEffect(() => {
    const padding = 20;
    // Estimate available space (accounting for sidebar ~300px and header/footer ~100px)
    const sidebarWidth = window.innerWidth >= 768 ? 280 : 0;
    const headerHeight = 100;

    const availableWidth = window.innerWidth - sidebarWidth - padding;
    const availableHeight = window.innerHeight - headerHeight - padding;

    // Calculate scale to fit
    const scaleX = availableWidth / SHEET_WIDTH;
    const scaleY = availableHeight / SHEET_HEIGHT;

    // Choose the smaller scale to ensure it fits both dimensions
    const rawScale = Math.min(scaleX, scaleY);
    const fitScale = Math.min(Math.max(rawScale, 0.2), 1.5);

    // Center the sheet
    const activeWidth = SHEET_WIDTH * fitScale;
    const activeHeight = SHEET_HEIGHT * fitScale;

    const panX = (availableWidth - activeWidth) / 2;
    const panY = (availableHeight - activeHeight) / 2;

    setScale(fitScale);
    // Add a small offset for the sidebar if on desktop
    setPan({ x: Math.max(20, panX), y: Math.max(20, panY) });
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const s = Math.exp(-e.deltaY / 500);
      setScale(Math.min(Math.max(0.1, scale * s), 5));
    } else {
      // Standard scroll to pan logic
      setPan(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Start Dragging if Pan Tool is active OR clicking background
    if (activeTool === 'PAN' || (e.target as Element).tagName === 'svg' || (e.target as Element).id.includes('bg')) {
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

  const handleProjectClick = (id: string) => {
    if (activeTool === 'SELECT') {
      onSelectProject(id);
    }
  };

  // Determine Cursor Style
  const getCursor = () => {
    if (activeTool === 'PAN') return isDragging ? 'cursor-grabbing' : 'cursor-grab';
    if (activeTool === 'SELECT') return 'cursor-default'; // Symbols handle pointer
    return 'cursor-default';
  };

  // Generate Grid References
  const renderFrame = () => {
    const color = "var(--cad-select)"; // Magenta frame color
    const w = SHEET_WIDTH;
    const h = SHEET_HEIGHT;

    return (
      <g pointerEvents="none">
        <rect x="0" y="0" width={w} height={h} fill="none" stroke={color} strokeWidth="2" />
        <rect x="20" y="20" width={w - 40} height={h - 40} fill="none" stroke={color} strokeWidth="1" />
        {/* Grid Markers Horizontal (1-4) */}
        <line x1={w * 0.25} y1="0" x2={w * 0.25} y2="20" stroke={color} />
        <line x1={w * 0.5} y1="0" x2={w * 0.5} y2="20" stroke={color} />
        <line x1={w * 0.75} y1="0" x2={w * 0.75} y2="20" stroke={color} />
        <text x={w * 0.125} y="15" fill={color} fontSize="14" textAnchor="middle">4</text>
        <text x={w * 0.375} y="15" fill={color} fontSize="14" textAnchor="middle">3</text>
        <text x={w * 0.625} y="15" fill={color} fontSize="14" textAnchor="middle">2</text>
        <text x={w * 0.875} y="15" fill={color} fontSize="14" textAnchor="middle">1</text>
        {/* Grid Markers Vertical (A-D) */}
        <line x1="0" y1={h * 0.25} x2="20" y2={h * 0.25} stroke={color} />
        <line x1="0" y1={h * 0.5} x2="20" y2={h * 0.5} stroke={color} />
        <line x1="0" y1={h * 0.75} x2="20" y2={h * 0.75} stroke={color} />
        <text x="10" y={h * 0.125} fill={color} fontSize="14" textAnchor="middle" dominantBaseline="middle">B</text>
        <text x="10" y={h * 0.375} fill={color} fontSize="14" textAnchor="middle" dominantBaseline="middle">A</text>
      </g>
    )
  }

  return (
    <div className={`flex-1 h-full w-full overflow-hidden bg-cad-bg relative font-mono ${getCursor()}`}>

      {/* Coordinates HUD */}
      <div className="absolute bottom-4 left-4 text-cad-wire text-xs font-mono z-10 pointer-events-none">
        X: {((-pan.x + lastMouse.x) / scale).toFixed(0)} Y: {((-pan.y + lastMouse.y) / scale).toFixed(0)} | ZOOM: {(scale * 100).toFixed(0)}%
      </div>

      <svg
        ref={svgRef}
        className="w-full h-full block"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--cad-grid)" strokeWidth="1" />
            <circle cx="1" cy="1" r="1" fill="var(--cad-grid)" />
          </pattern>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>

          {/* Infinite background grid */}
          <rect id="bg-fill" x="-5000" y="-5000" width="10000" height="10000" fill="url(#grid)" />

          {/* Sheet Frame */}
          {renderFrame()}

          {/* Regions */}
          {regions.map(r => (
            <g key={r.id}>
              <rect
                x={r.x} y={r.y} width={r.width} height={r.height}
                fill="none" stroke={r.color} strokeWidth="1" strokeDasharray="10,5"
                opacity="0.7"
              />
              <text x={r.x + 10} y={r.y - 10} fill={r.color} fontSize="14" fontWeight="bold">{r.label}</text>
            </g>
          ))}

          {/* Wires */}
          {wires.map(wire => (
            <polyline
              key={wire.id}
              points={wire.points}
              fill="none"
              stroke={wire.color || 'var(--cad-wire)'}
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.9"
            />
          ))}

          {/* Passives */}
          {passives.map(p => (
            <SchematicSymbol key={p.id} data={p} />
          ))}

          {/* Projects */}
          {projects.map(p => (
            <SchematicSymbol
              key={p.id}
              data={p}
              onClick={handleProjectClick}
              isSelected={selectedProjectId === p.id}
            />
          ))}

          {/* Title Block */}
          <g transform={`translate(${SHEET_WIDTH - 350}, ${SHEET_HEIGHT - 120})`}>
            <rect x="0" y="0" width="330" height="100" fill="var(--cad-bg)" stroke="var(--cad-select)" strokeWidth="2" />
            <rect x="0" y="0" width="330" height="40" fill="none" stroke="var(--cad-select)" strokeWidth="1" />
            <text x="165" y="25" fill="var(--cad-select)" fontSize="20" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Mentor Graphics</text>
            <rect x="0" y="40" width="330" height="30" fill="none" stroke="var(--cad-select)" strokeWidth="1" />
            <text x="10" y="60" fill="var(--cad-wire)" fontSize="16" letterSpacing="2">Portfolio_Master.Sch</text>
            <line x1="230" y1="70" x2="230" y2="100" stroke="var(--cad-select)" />
            <line x1="280" y1="70" x2="280" y2="100" stroke="var(--cad-select)" />
            <text x="5" y="82" fill="var(--cad-select)" fontSize="8">SIZE</text>
            <text x="15" y="95" fill="var(--cad-text)" fontSize="12" fontWeight="bold">B</text>
            <text x="50" y="82" fill="var(--cad-select)" fontSize="8">DRAWN BY</text>
            <text x="50" y="95" fill="var(--cad-text)" fontSize="10">S. Bullock</text>
            <text x="235" y="82" fill="var(--cad-select)" fontSize="8">REV</text>
            <text x="240" y="95" fill="var(--cad-text)" fontSize="12">01</text>
            <text x="285" y="82" fill="var(--cad-select)" fontSize="8">SHEET</text>
            <text x="290" y="95" fill="var(--cad-text)" fontSize="12">1 OF 1</text>
          </g>
        </g>
      </svg>
    </div>
  );
};