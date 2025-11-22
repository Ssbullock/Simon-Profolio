export interface Project {
  id: string;
  title: string;
  refDes: string; // e.g., U101, R5
  description: string;
  details: string; // Long form markdown/text
  tags: string[];
  imageUrl: string;
  x: number;
  y: number;
  type: 'IC' | 'OPAMP' | 'RESISTOR' | 'CONNECTOR';
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
  PCB_DETAIL = 'PCB_DETAIL',
}