import React, { useState } from 'react';
import { Project } from '../types';
import { X, ArrowRight, CaretRight } from 'phosphor-react';

interface Props {
  project: Project;
  onClose: () => void;
  onViewDocumentation: () => void;
  onNext: () => void;
}

export const ProjectDetail: React.FC<Props> = ({ project, onClose, onViewDocumentation, onNext }) => {
  const [activeTab, setActiveTab] = useState<'General' | 'Parameters'>('General');

  // Helper to render property rows
  const PropRow = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div className="grid grid-cols-3 gap-2 py-1 border-b border-[#333] last:border-0 hover:bg-[#2a2a2a]">
      <div className="col-span-1 text-xs text-gray-400 font-medium pl-1">{label}</div>
      <div className="col-span-2 text-xs text-white font-mono truncate select-all">{value}</div>
    </div>
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/400x400/1a1a1a/444444?text=Missing+Asset:+${project.refDes}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Property Window Container */}
      <div className="w-full max-w-4xl h-[600px] bg-[#1e1e1e] border border-[#454545] shadow-2xl flex flex-col font-sans animate-in zoom-in-95 duration-200">
        
        {/* Title Bar */}
        <div className="h-8 bg-[#2d2d2d] flex items-center justify-between px-3 border-b border-[#454545] select-none">
          <div className="text-xs text-gray-300 font-bold flex items-center gap-2">
            <div className="w-3 h-3 bg-cad-accent/80 rounded-sm"></div>
            Component Properties - {project.refDes}
          </div>
          <button onClick={onClose} className="hover:bg-red-500 hover:text-white p-1 rounded transition-colors text-gray-400">
            <X size={14} weight="bold" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="bg-[#252526] px-2 pt-2 border-b border-[#454545] flex gap-1 select-none">
          {['General', 'Parameters'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`
                px-4 py-1.5 text-xs rounded-t-sm transition-colors border-t border-l border-r
                ${activeTab === tab 
                  ? 'bg-[#1e1e1e] text-white border-[#454545] border-b-[#1e1e1e] translate-y-[1px]' 
                  : 'bg-[#2d2d2d] text-gray-400 border-transparent hover:bg-[#333]'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Column - Property Grid */}
          <div className="flex-1 border-r border-[#454545] flex flex-col overflow-hidden">
             
             {/* Toolbar / Header */}
             <div className="bg-[#252526] p-2 border-b border-[#333] flex items-center gap-2">
                 <div className="w-8 h-8 bg-[#111] border border-[#444] flex items-center justify-center">
                    <span className="text-cad-accent font-bold text-xs">{project.type.substring(0,2)}</span>
                 </div>
                 <div>
                     <div className="text-sm font-bold text-white">{project.refDes}</div>
                     <div className="text-xs text-gray-500">{project.title}</div>
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto p-2 bg-[#1e1e1e]">
                {activeTab === 'General' && (
                  <div className="border border-[#333] bg-[#252526]">
                    <div className="bg-[#333] px-2 py-1 text-[10px] font-bold text-gray-300 uppercase">Identification</div>
                    <div className="p-1">
                      <PropRow label="Name" value={project.title} />
                      <PropRow label="Ref Designator" value={project.refDes} />
                      <PropRow label="Part Type" value={project.type} />
                      <PropRow label="Library ID" value={project.id.toUpperCase()} />
                    </div>

                    <div className="bg-[#333] px-2 py-1 text-[10px] font-bold text-gray-300 uppercase mt-2">Metadata</div>
                    <div className="p-1">
                      <PropRow label="Date" value={project.date || "N/A"} />
                      <PropRow label="Location" value={project.location || "N/A"} />
                      <PropRow label="Status" value="RELEASED" />
                    </div>

                    <div className="bg-[#333] px-2 py-1 text-[10px] font-bold text-gray-300 uppercase mt-2">Description</div>
                    <div className="p-2 text-xs text-gray-300 leading-relaxed font-mono bg-[#111] border-t border-[#333]">
                      {project.description}
                    </div>
                  </div>
                )}

                {activeTab === 'Parameters' && (
                   <div className="border border-[#333] bg-[#252526] h-full flex flex-col">
                      <div className="bg-[#333] grid grid-cols-2 px-2 py-1 text-[10px] font-bold text-gray-300 border-b border-black">
                         <div>NAME</div>
                         <div>VALUE</div>
                      </div>
                      <div className="flex-1 overflow-y-auto">
                          {project.tags.map((tag, i) => (
                             <div key={i} className="grid grid-cols-2 px-2 py-1 border-b border-[#333] hover:bg-[#2a2a2a] text-xs font-mono">
                                <div className="text-cad-bus">SKILL_{i+1}</div>
                                <div className="text-gray-300">{tag}</div>
                             </div>
                          ))}
                          <div className="grid grid-cols-2 px-2 py-1 border-b border-[#333] hover:bg-[#2a2a2a] text-xs font-mono">
                                <div className="text-cad-bus">HAS_DOCS</div>
                                <div className="text-gray-300">TRUE</div>
                             </div>
                      </div>
                   </div>
                )}
             </div>
          </div>

          {/* Right Column - Preview Image & Actions */}
          <div className="w-[300px] flex flex-col bg-[#252526]">
             <div className="p-2 border-b border-[#454545] text-xs font-bold text-gray-400">PREVIEW</div>
             <div className="flex-1 p-4 flex items-center justify-center bg-[#111] overflow-hidden relative">
                 {/* Grid BG */}
                 <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                 <img src={project.imageUrl} onError={handleImageError} alt="Preview" className="max-w-full max-h-full object-contain border border-[#333] shadow-lg relative z-10" />
             </div>
             
             {/* Action Area */}
             <div className="p-3 border-t border-[#454545] bg-[#2d2d2d] space-y-2">
                <button 
                  onClick={onViewDocumentation}
                  className="w-full py-2 bg-[#3c3c3c] hover:bg-cad-accent border border-[#555] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                   <span>Open Documentation</span>
                   <ArrowRight weight="bold" />
                </button>
                <div className="text-[10px] text-gray-500 text-center">
                    Click to view full technical specification.
                </div>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="h-10 bg-[#2d2d2d] border-t border-[#454545] flex items-center justify-between px-3 gap-2">
           <button 
                onClick={onNext}
                className="flex items-center gap-2 px-4 py-1 text-gray-400 hover:text-white hover:bg-[#3c3c3c] rounded-sm text-xs transition-colors"
           >
               <span>View Next Component</span>
               <CaretRight weight="bold" />
           </button>

           <div className="flex gap-2">
               <button onClick={onClose} className="px-6 py-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] border border-[#555] text-white text-xs shadow-sm rounded-sm">
                 OK
               </button>
               <button onClick={onClose} className="px-6 py-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] border border-[#555] text-white text-xs shadow-sm rounded-sm">
                 Cancel
               </button>
           </div>
        </div>

      </div>
    </div>
  );
};