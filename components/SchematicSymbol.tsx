import React, { useState } from 'react';
import { Project, Passive } from '../types';

interface Props {
  data: Project | Passive;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

export const SchematicSymbol: React.FC<Props> = ({ data, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y, type } = data;
  
  // Mentor Graphics / Xpedition Style Colors
  // Bright Yellow for unselected, Pink/Magenta for selected/hover
  const baseColor = '#ffff00'; // Standard schematic yellow
  const highlightColor = '#ff00ff'; // Selection pink
  const strokeColor = isSelected || isHovered ? highlightColor : baseColor;
  
  const fillColor = '#000000'; // Black body
  const strokeWidth = isSelected || isHovered ? "2.5" : "1.5";
  const textColor = '#ffffff';
  const pinColor = '#00ff00'; // Greenish for pins

  const renderSymbol = () => {
    // Cast to generic to access common optional fields safely
    const p = data as any;
    const refDes = p.refDes || '';
    const val = p.value || '';
    const rot = p.rotation || 0;

    switch (type) {
      case 'IC':
        const project = data as Project;
        return (
          <g>
            {/* IC Body - Yellow Box */}
            <rect x="-60" y="-40" width="120" height="80" stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} />
            
            {/* Pins Left (x-70) */}
            {[0, 20, 40, 60].map((offset, i) => (
               <g key={`l${i}`}>
                   <line x1="-70" y1={-30 + offset} x2="-60" y2={-30 + offset} stroke={strokeColor} strokeWidth="1" />
                   <text x="-55" y={-27 + offset} fill={textColor} fontSize="8" fontFamily="monospace">{(i+1)}</text>
               </g>
            ))}
            {/* Pins Right (x+70) */}
            {[0, 20, 40, 60].map((offset, i) => (
               <g key={`r${i}`}>
                   <line x1="60" y1={-30 + offset} x2="70" y2={-30 + offset} stroke={strokeColor} strokeWidth="1" />
                   <text x="50" y={-27 + offset} fill={textColor} fontSize="8" fontFamily="monospace" textAnchor="end">{(i+5)}</text>
               </g>
            ))}
            
            {/* RefDes and Name */}
            <text x="-60" y="-45" fill={strokeColor} fontSize="12" fontFamily="monospace" fontWeight="bold">{project.refDes}</text>
            <text x="0" y="5" fill={pinColor} fontSize="10" fontFamily="monospace" textAnchor="middle">{project.title.substring(0, 10)}</text>
          </g>
        );

      case 'OPAMP':
        const op = data as Project;
        return (
           <g>
             <path d="M -30,-30 L -30,30 L 30,0 Z" stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} />
             <line x1="-40" y1="-10" x2="-30" y2="-10" stroke={strokeColor} strokeWidth="1" />
             <line x1="-40" y1="10" x2="-30" y2="10" stroke={strokeColor} strokeWidth="1" />
             <line x1="30" y1="0" x2="40" y2="0" stroke={strokeColor} strokeWidth="1" />
             <text x="-35" y="-15" fill={textColor} fontSize="8">-</text>
             <text x="-35" y="18" fill={textColor} fontSize="8">+</text>
             <text x="-30" y="-35" fill={strokeColor} fontSize="12" fontFamily="monospace">{op.refDes}</text>
           </g>
        );

      case 'CONNECTOR':
          const conn = data as Project;
          return (
            <g>
                <rect x="-20" y="-40" width="40" height="80" stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} />
                {[-30, -10, 10, 30].map((offset, i) => (
                    <g key={i}>
                        <line x1="20" y1={offset} x2="30" y2={offset} stroke={strokeColor} />
                        <rect x="15" y={offset-2} width="4" height="4" fill={strokeColor} />
                    </g>
                ))}
                 <text x="-20" y="-45" fill={strokeColor} fontSize="12" fontFamily="monospace">{conn.refDes}</text>
            </g>
          );

      case 'RESISTOR':
        return (
            <g transform={`rotate(${rot})`}>
                <path d="M -20 0 L -10 0 L -7 -4 L -3 4 L 0 -4 L 3 4 L 7 -4 L 10 0 L 20 0" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                <text x="-10" y="-10" fill={textColor} fontSize="10" fontFamily="monospace">{refDes}</text>
                <text x="-10" y="15" fill={pinColor} fontSize="8" fontFamily="monospace">{val}</text>
            </g>
        );

      case 'CAPACITOR':
        return (
            <g transform={`rotate(${rot})`}>
                <line x1="-20" y1="0" x2="-3" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} />
                <line x1="20" y1="0" x2="3" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} />
                <line x1="-3" y1="-10" x2="-3" y2="10" stroke={strokeColor} strokeWidth={strokeWidth} />
                <line x1="3" y1="-10" x2="3" y2="10" stroke={strokeColor} strokeWidth={strokeWidth} />
                <text x="-10" y="-15" fill={textColor} fontSize="10" fontFamily="monospace">{refDes}</text>
            </g>
        );
        
      case 'RELAY':
        return (
            <g>
                {/* Coil */}
                <rect x="-15" y="-10" width="30" height="20" stroke={strokeColor} fill="none" />
                <line x1="-15" y1="-10" x2="15" y2="10" stroke={strokeColor} />
                {/* Switch */}
                <line x1="-25" y1="-20" x2="-10" y2="-20" stroke={strokeColor} />
                <line x1="-10" y1="-20" x2="10" y2="-30" stroke={strokeColor} />
                <line x1="10" y1="-20" x2="25" y2="-20" stroke={strokeColor} />
                <text x="-15" y="25" fill={textColor} fontSize="10" fontFamily="monospace">{refDes}</text>
            </g>
        );
        
      case 'DIODE':
        return (
             <g transform={`rotate(${rot})`}>
                 <line x1="-20" y1="0" x2="-10" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <line x1="20" y1="0" x2="10" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <path d="M -10,-10 L -10,10 L 10,0 Z" stroke={strokeColor} fill="none" strokeWidth={strokeWidth} />
                 <line x1="10" y1="-10" x2="10" y2="10" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <text x="-10" y="-15" fill={textColor} fontSize="10" fontFamily="monospace">{refDes}</text>
             </g>
        );

      case 'VCC':
        return (
             <g>
                 <line x1="0" y1="0" x2="0" y2="-10" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <line x1="-10" y1="-10" x2="10" y2="-10" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <text x="12" y="-8" fill={strokeColor} fontSize="10" fontFamily="monospace">VCC</text>
             </g>
        );

      case 'GND':
        return (
             <g>
                 <line x1="0" y1="0" x2="0" y2="10" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <line x1="-12" y1="10" x2="12" y2="10" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <line x1="-8" y1="14" x2="8" y2="14" stroke={strokeColor} strokeWidth={strokeWidth} />
                 <line x1="-4" y1="18" x2="4" y2="18" stroke={strokeColor} strokeWidth={strokeWidth} />
             </g>
        );
      default:
        return null;
    }
  };

  const interactionProps = onClick ? {
    onClick: () => onClick(data.id),
    className: "cursor-pointer"
  } : {
    className: "pointer-events-none"
  };

  return (
    <g 
      transform={`translate(${x}, ${y}) scale(${isHovered ? 1.15 : 1})`}
      {...interactionProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        filter: isHovered || isSelected ? 'drop-shadow(0 0 6px rgba(255, 0, 255, 0.8))' : 'none',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s ease'
      }}
    >
      {renderSymbol()}
      {/* Invisible Hitbox for easier clicking */}
      {onClick && <rect x="-50" y="-50" width="100" height="100" fill="transparent" />}
    </g>
  );
};