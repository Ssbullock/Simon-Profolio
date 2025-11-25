import React, { useState, useRef, useEffect } from 'react';
import { X, Square, Minus, FloppyDisk, Printer, ArrowUUpLeft, ArrowUUpRight, MagnifyingGlassPlus, MagnifyingGlassMinus, HandGrabbing, Cursor, Cpu, Gear, List, Sidebar as SidebarIcon, CaretLeft } from 'phosphor-react';
import { ToolType } from '../types';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  bottomPanel: React.ReactNode;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isTerminalOpen: boolean;
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSystemAction: (action: string) => void; // New prop for handling menu clicks
  hideHeader?: boolean;
  hideBottomPanel?: boolean;
}

const IconButton: React.FC<{ icon: React.ReactNode; label?: string; onClick?: () => void; isActive?: boolean }> = ({ icon, label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`p-1.5 rounded-sm transition-colors ${isActive ? 'bg-cad-accent text-white' : 'text-gray-400 hover:bg-cad-uiLight hover:text-white'}`}
    title={label}
  >
    {icon}
  </button>
);

const MenuText: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => (
  // Removed 'hidden md:block' to make menu items visible on mobile
  <div onClick={onClick} className="px-2 md:px-3 py-1 hover:bg-cad-uiLight cursor-pointer text-[10px] md:text-xs text-gray-300 transition-colors select-none whitespace-nowrap">{text}</div>
)

export const Layout: React.FC<Props> = ({
  children, sidebar, bottomPanel,
  isSidebarOpen, onToggleSidebar,
  isTerminalOpen,
  activeTool, setActiveTool,
  onZoomIn, onZoomOut,
  onSystemAction,
  hideHeader,
  hideBottomPanel
}) => {
  const [isSaveMenuOpen, setIsSaveMenuOpen] = useState(false);
  const saveMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (saveMenuRef.current && !saveMenuRef.current.contains(event.target as Node)) {
        setIsSaveMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-cad-ui font-sans text-cad-text overflow-hidden print:h-auto print:overflow-visible">
      {!hideHeader && (
        <div className="sticky top-0 z-50 flex flex-col bg-cad-uiDark pt-1 md:pt-0">
          {/* Modern Title Bar */}
          <div className="h-10 bg-cad-uiDark flex items-center justify-between px-3 select-none border-b border-black print:hidden">
            <div className="flex items-center gap-3 text-cad-accent font-semibold text-sm tracking-wide">
              <div className="bg-cad-accent p-1 rounded">
                <Cpu size={16} weight="fill" className="text-white" />
              </div>
              <span className="text-white hidden md:inline">DxDesigner Pro 2025</span>
              <span className="text-gray-500 hidden md:inline">|</span>
              <span className="text-gray-300 truncate">Bullock_Portfolio_Main.sch</span>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-4 text-gray-500">
                <Minus size={16} className="hover:text-white cursor-pointer" />
                <Square size={14} className="hover:text-white cursor-pointer" />
                <X size={16} className="hover:text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Menu Bar with Toggle */}
          <div className="flex bg-cad-ui border-b border-cad-uiBorder px-2 h-8 items-center gap-2 print:hidden overflow-x-auto scrollbar-thin">
            <IconButton
              icon={<SidebarIcon size={18} weight={isSidebarOpen ? "fill" : "regular"} />}
              label="Toggle Project Navigator"
              onClick={onToggleSidebar}
            />
            <div className="w-px h-4 bg-cad-uiBorder flex-shrink-0"></div>
            {['File', 'Edit', 'View', 'Project', 'Place', 'Simulation', 'Tools', 'Window', 'Help'].map(item => (
              <MenuText key={item} text={item} onClick={() => onSystemAction(item)} />
            ))}
          </div>

          {/* Modern Toolbar */}
          <div className="flex items-center gap-1 p-1 border-b border-cad-uiBorder bg-cad-uiDark print:hidden overflow-x-auto scrollbar-thin">
            <div className="flex gap-1 border-r border-cad-uiBorder pr-2 relative" ref={saveMenuRef}>
              <IconButton
                icon={<FloppyDisk size={20} />}
                label="Save Options"
                onClick={() => setIsSaveMenuOpen(!isSaveMenuOpen)}
                isActive={isSaveMenuOpen}
              />

              {/* Save Dropdown */}
              {isSaveMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-cad-ui border border-cad-uiBorder shadow-xl rounded z-50 flex flex-col py-1">
                  <button
                    className="text-left px-4 py-2 hover:bg-cad-uiLight text-sm text-cad-text"
                    onClick={() => {
                      onSystemAction('Save Resume');
                      setIsSaveMenuOpen(false);
                    }}
                  >
                    Save Resume
                  </button>
                  <button
                    className="text-left px-4 py-2 hover:bg-cad-uiLight text-sm text-cad-text"
                    onClick={() => {
                      onSystemAction('Print Page');
                      setIsSaveMenuOpen(false);
                    }}
                  >
                    Print Page
                  </button>
                </div>
              )}

              <IconButton
                icon={<Printer size={20} />}
                label="Print Schematic"
                onClick={() => onSystemAction('Print')}
              />
            </div>
            <div className="flex gap-1 border-r border-cad-uiBorder pr-2 pl-2">
              <IconButton icon={<ArrowUUpLeft size={20} />} label="Undo" onClick={() => onSystemAction('Undo')} />
              <IconButton icon={<ArrowUUpRight size={20} />} label="Redo" onClick={() => onSystemAction('Redo')} />
            </div>

            {/* Tools Section */}
            <div className="flex gap-1 border-r border-cad-uiBorder pr-2 pl-2">
              <IconButton
                icon={<Cursor size={20} />}
                label="Select Tool"
                onClick={() => setActiveTool('SELECT')}
                isActive={activeTool === 'SELECT'}
              />
              <IconButton
                icon={<MagnifyingGlassPlus size={20} />}
                label="Zoom In"
                onClick={onZoomIn}
              />
              <IconButton
                icon={<MagnifyingGlassMinus size={20} />}
                label="Zoom Out"
                onClick={onZoomOut}
              />
              <IconButton
                icon={<HandGrabbing size={20} />}
                label="Pan Tool"
                onClick={() => setActiveTool('PAN')}
                isActive={activeTool === 'PAN'}
              />
            </div>

            <div className="flex gap-1 pl-2">
              <IconButton icon={<Gear size={20} />} label="Settings" onClick={() => onSystemAction('Settings')} />
              <IconButton icon={<List size={20} />} label="BOM" onClick={() => onSystemAction('BOM')} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Sidebar Container */}
        <div className={`
            ${isSidebarOpen ? 'w-56 md:w-72 translate-x-0' : 'w-0 -translate-x-full opacity-0'} 
            flex-shrink-0 h-full z-20 bg-cad-ui border-r border-cad-uiBorder transition-all duration-300 
            absolute md:relative shadow-2xl md:shadow-none print:hidden overflow-hidden
        `}>
          <div className="w-56 md:w-72 h-full relative">
            {/* Sidebar Content */}
            {sidebar}

            {/* Overlay Minimize Arrow (Top Right of Sidebar) */}
            <button
              onClick={onToggleSidebar}
              className="absolute top-1.5 right-1.5 p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded"
              title="Minimize Navigator"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative h-full bg-cad-bg shadow-inner z-10 print:w-full print:h-full print:bg-white flex flex-col">
          {children}
        </div>
      </div>

      {/* Bottom Panel (Output/CLI) */}
      {!hideBottomPanel && (
        <div className={`
            border-t border-cad-uiBorder flex flex-col bg-cad-uiDark z-30 transition-all duration-300 ease-in-out print:hidden
            ${isTerminalOpen ? 'h-32 md:h-40' : 'h-8'}
        `}>
          {bottomPanel}
        </div>
      )}
    </div>
  );
};