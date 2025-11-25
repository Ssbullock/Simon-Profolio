import React, { useState } from 'react';
import { FileNode } from '../types';
import { Folder, CaretRight, CaretDown, Cpu } from 'phosphor-react';

interface Props {
  nodes: FileNode[];
  onSelect: (projectId: string) => void;
}

const TreeNode: React.FC<{ node: FileNode; level: number; onSelect: (id: string) => void }> = ({ node, level, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else if (node.projectId) {
      onSelect(node.projectId);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center py-1 hover:bg-cad-uiLight cursor-pointer select-none text-sm border-l-2 border-transparent hover:border-cad-accent transition-colors
        ${!isFolder && node.projectId ? 'text-cad-text' : 'text-cad-text font-medium'}
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {isFolder && (
          <span className="mr-1 text-cad-textMuted">
            {isOpen ? <CaretDown size={10} weight="fill" /> : <CaretRight size={10} weight="fill" />}
          </span>
        )}
        <span className="mr-2">
          {isFolder ? <Folder color="var(--cad-wire)" weight="fill" size={14} /> : <Cpu color="var(--cad-bus)" size={14} />}
        </span>
        <span className={!isFolder ? 'font-mono text-xs' : ''}>{node.name}</span>
      </div>
      {isFolder && isOpen && node.children && (
        <div className="border-l border-cad-uiLight ml-3">
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<Props> = ({ nodes, onSelect }) => {
  return (
    <div className="bg-cad-ui h-full flex flex-col">
      <div className="bg-cad-uiDark px-3 py-2 border-b border-cad-uiBorder text-xs font-bold text-cad-textMuted uppercase tracking-wider">
        Project Navigator
      </div>
      <div className="p-2 flex-1 overflow-y-auto scrollbar-thin">
        {nodes.map(node => (
          <TreeNode key={node.id} node={node} level={0} onSelect={onSelect} />
        ))}
      </div>
      <div className="h-1/3 border-t border-cad-uiBorder bg-cad-uiDark p-3">
        <div className="text-xs font-bold text-cad-textMuted mb-2">PROPERTIES</div>
        <div className="text-xs font-mono text-cad-textMuted space-y-1">
          <div className="flex justify-between"><span>TYPE:</span> <span className="text-cad-accent">SCHEMATIC</span></div>
          <div className="flex justify-between"><span>SIZE:</span> <span className="text-cad-text">A3</span></div>
          <div className="flex justify-between"><span>AUTHOR:</span> <span className="text-cad-text">S. BULLOCK</span></div>
          <div className="mt-4 text-justify text-[10px] leading-tight">
            Click on schematic symbols or tree nodes to view project details.
          </div>
        </div>
      </div>
    </div>
  );
};