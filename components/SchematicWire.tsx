import React, { useState } from 'react';
import { WirePath } from '../types';

interface Props {
    wire: WirePath;
}

export const SchematicWire: React.FC<Props> = ({ wire }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Default color if none provided
    const baseColor = wire.color || '#ffff00';

    // Highlight color (Magenta/Pink) when hovered, similar to SchematicSymbol
    const strokeColor = isHovered ? '#ff00ff' : baseColor;

    // Increase stroke width when hovered
    const strokeWidth = isHovered ? "3" : "1.5";

    return (
        <g
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                filter: isHovered ? 'drop-shadow(0 0 6px rgba(255, 0, 255, 0.8))' : 'none',
                transition: 'filter 0.2s ease',
                cursor: 'pointer' // Make it obvious it's interactive
            }}
        >
            {/* The visible wire */}
            <polyline
                points={wire.points}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.9"
                style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
            />

            {/* Invisible thicker hit area for easier hovering */}
            <polyline
                points={wire.points}
                fill="none"
                stroke="transparent"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </g>
    );
};
