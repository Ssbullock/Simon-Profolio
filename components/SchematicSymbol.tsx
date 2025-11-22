import React from 'react';
import { Project } from '../types';

interface Props {
  project: Project;
  onClick: (id: string) => void;
  isSelected: boolean;
}

export const SchematicSymbol: React.FC<Props> = ({ project, onClick, isSelected }) => {
  const { x, y, title, refDes, type } = project;

  const strokeColor = isSelected ? '#ff00ff' : '#ffd700';
  const fillColor = '#000000';

  const renderSymbol = () => {
    switch (type) {
      case 'IC':
        return (
          <g transform={`translate(${x}, ${y})`}>
            {/* Main Body */}
            <rect x="-50" y="-40" width="100" height="80" stroke={strokeColor} fill={fillColor} strokeWidth="2" />
            {/* Pins Left */}
            {[0, 20, 40, 60].map((offset, i) => (
               <line key={`l${i}`} x1="-60" y1={-30 + offset} x2="-50" y2={-30 + offset} stroke={strokeColor} strokeWidth="1" />
            ))}
            {/* Pins Right */}
            {[0, 20, 40, 60].map((offset, i) => (
               <line key={`r${i}`} x1="50" y1={-30 + offset} x2="60" y2={-30 + offset} stroke={strokeColor} strokeWidth="1" />
            ))}
            
            {/* Text */}
            <text x="-45" y="0" fill={strokeColor} fontSize="10" fontFamily="monospace" className="select-none">
              {refDes}
            </text>
             <text x="-45" y="15" fill="#00ffff" fontSize="8" fontFamily="monospace" className="select-none">
              {title.split(' ')[0]}
            </text>
          </g>
        );
      case 'OPAMP':
        return (
           <g transform={`translate(${x}, ${y})`}>
             {/* Triangle Body */}
             <path d="M -30,-30 L -30,30 L 30,0 Z" stroke={strokeColor} fill={fillColor} strokeWidth="2" />
             {/* Inputs */}
             <line x1="-40" y1="-15" x2="-30" y2="-15" stroke={strokeColor} strokeWidth="1" />
             <line x1="-40" y1="15" x2="-30" y2="15" stroke={strokeColor} strokeWidth="1" />
             {/* Output */}
             <line x1="30" y1="0" x2="40" y2="0" stroke={strokeColor} strokeWidth="1" />
             
             <text x="-20" y="5" fill={strokeColor} fontSize="10" fontFamily="monospace" className="select-none">{refDes}</text>
           </g>
        );
      case 'CONNECTOR':
          return (
            <g transform={`translate(${x}, ${y})`}>
                <rect x="-15" y="-40" width="30" height="80" stroke={strokeColor} fill={fillColor} strokeWidth="2" />
                {/* Pins */}
                {[-30, -10, 10, 30].map(offset => (
                    <line key={offset} x1="15" y1={offset} x2="25" y2={offset} stroke={strokeColor} />
                ))}
                 <text x="-10" y="-50" fill={strokeColor} fontSize="10" fontFamily="monospace" className="select-none">{refDes}</text>
            </g>
          )
      default:
        return null;
    }
  };

  return (
    <g 
      onClick={() => onClick(project.id)} 
      className="cursor-pointer hover:opacity-80 transition-opacity"
    >
      {renderSymbol()}
      {/* Hover Hitbox */}
      <rect 
        x={x - 60} 
        y={y - 50} 
        width="120" 
        height="100" 
        fill="transparent" 
      />
    </g>
  );
};