import React from 'react';
import { X, Square, Minus, FloppyDisk, Printer, ArrowUUpLeft, ArrowUUpRight, MagnifyingGlass, HandPalm, Cpu, Gear, List } from 'phosphor-react';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  bottomPanel: React.ReactNode;
}

const IconButton: React.FC<{ icon: React.ReactNode; label?: string }> = ({ icon, label }) => (
  <button className="p-1.5 text-gray-400 hover:bg-cad-uiLight hover:text-white rounded-sm transition-colors" title={label}>
    {icon}
  </button>
);

const MenuText: React.FC<{ text: string }> = ({ text }) => (
    <div className="px-3 py-1 hover:bg-cad-uiLight cursor-pointer text-xs text-gray-300 transition-colors">{text}</div>
)

export const Layout: React.FC<Props> = ({ children, sidebar, bottomPanel }) => {
  return (
    <div className="flex flex-col h-full w-full bg-cad-ui font-sans text-cad-text overflow-hidden">
      {/* Modern Title Bar */}
      <div className="h-10 bg-cad-uiDark flex items-center justify-between px-3 select-none border-b border-black">
        <div className="flex items-center gap-3 text-cad-accent font-semibold text-sm tracking-wide">
          <div className="bg-cad-accent p-1 rounded">
            <Cpu size={16} weight="fill" className="text-white" />
          </div>
          <span className="text-white">DxDesigner Pro 2025</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">Bullock_Portfolio_Main.sch</span>
        </div>
        <div className="flex gap-2">
             {/* Window Controls */}
             <div className="flex gap-4 text-gray-500">
                <Minus size={16} className="hover:text-white cursor-pointer" />
                <Square size={14} className="hover:text-white cursor-pointer" />
                <X size={16} className="hover:text-red-500 cursor-pointer" />
             </div>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex bg-cad-ui border-b border-cad-uiBorder px-2">
        {['File', 'Edit', 'View', 'Project', 'Place', 'Simulation', 'Tools', 'Window', 'Help'].map(item => (
            <MenuText key={item} text={item} />
        ))}
      </div>

      {/* Modern Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-cad-uiBorder bg-cad-uiDark">
        <div className="flex gap-1 border-r border-cad-uiBorder pr-2">
            <IconButton icon={<FloppyDisk size={20} />} label="Save Project" />
            <IconButton icon={<Printer size={20} />} label="Print Schematic" />
        </div>
        <div className="flex gap-1 border-r border-cad-uiBorder pr-2 pl-2">
            <IconButton icon={<ArrowUUpLeft size={20} />} label="Undo" />
            <IconButton icon={<ArrowUUpRight size={20} />} label="Redo" />
        </div>
        <div className="flex gap-1 border-r border-cad-uiBorder pr-2 pl-2">
             <IconButton icon={<MagnifyingGlass size={20} />} label="Zoom" />
             <IconButton icon={<HandPalm size={20} />} label="Pan" />
        </div>
        <div className="flex gap-1 pl-2">
            <IconButton icon={<Gear size={20} />} label="Settings" />
            <IconButton icon={<List size={20} />} label="BOM" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 h-full z-10 bg-cad-ui border-r border-cad-uiBorder">
            {sidebar}
        </div>

        {/* Canvas */}
        <div className="flex-1 relative h-full bg-cad-bg shadow-inner">
            {children}
        </div>
      </div>

      {/* Bottom Panel (Output/CLI) */}
      <div className="h-40 border-t border-cad-uiBorder flex flex-col bg-cad-uiDark">
          {bottomPanel}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-cad-accent/10 border-t border-cad-uiBorder flex items-center px-3 text-xs gap-6 text-cad-accent">
        <span className="font-mono">READY</span>
        <span className="font-mono">GRID: 50mil</span>
        <span className="font-mono">X: 1200.00 Y: 450.00</span>
        <span className="flex-1 text-right text-gray-400">Simon Bullock | Electrical Engineer</span>
      </div>
    </div>
  );
};