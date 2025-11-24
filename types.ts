export interface Project {
  id: string;
  title: string;
  refDes: string; // e.g., U101, R5
  description: string; // Short summary
  // New Documentation Fields
  objective?: string;
  role?: string;
  methodology?: string;
  results?: string;
  context?: string;
  
  tags: string[];
  imageUrl: string;
  additionalImages?: string[]; 
  x: number;
  y: number;
  type: 'IC' | 'OPAMP' | 'RESISTOR' | 'CONNECTOR';
  date?: string;
  location?: string;
}

export interface WirePath {
  id: string;
  points: string; // SVG polyline points
  color?: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
  projectId?: string; // Links to a project if it's a file
}

export enum ViewMode {
  SCHEMATIC = 'SCHEMATIC',
  PCB_DETAIL = 'PCB_DETAIL', // Kept for type safety but will be unused
  DOCUMENTATION = 'DOCUMENTATION',
}

export interface Passive {
  id: string;
  x: number;
  y: number;
  type: 'RESISTOR' | 'CAPACITOR' | 'VCC' | 'GND' | 'RELAY' | 'DIODE';
  rotation?: number; // 0, 90, 180, 270
  value?: string;
  refDes?: string;
}

export interface SchematicRegion {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string; // Hex or tailwind class mapping
}

export type ToolType = 'SELECT' | 'PAN' | 'ZOOM_IN' | 'ZOOM_OUT';