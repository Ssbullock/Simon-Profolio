import React from 'react';
import { Project } from '../types';
import { X, Cpu, Calendar, CheckCircle, ArrowRight } from 'phosphor-react';

interface Props {
  project: Project;
  onClose: () => void;
}

export const ProjectDetail: React.FC<Props> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0f0f0f] text-gray-200 flex flex-col animate-in fade-in duration-200 font-sans">
      
      {/* Top Navigation Bar */}
      <div className="h-16 flex items-center justify-between px-6 bg-[#181818] border-b border-[#333]">
        <div className="flex items-center gap-4">
           <button 
             onClick={onClose} 
             className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#333] transition-all duration-200 focus:outline-none"
           >
              <X size={20} className="text-gray-400 group-hover:text-white" />
           </button>
           <div className="h-6 w-[1px] bg-[#333]"></div>
           <div className="flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Component Properties</span>
              <span className="text-sm font-bold text-white tracking-wide font-mono">{project.refDes} // {project.title}</span>
           </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-500">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>SYSTEM: ONLINE</span>
             </div>
             <span>REVISION: A.02</span>
        </div>
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Column: Visuals (Immersive) */}
        <div className="lg:w-[55%] w-full h-1/2 lg:h-full bg-[#050505] relative flex items-center justify-center p-0 lg:p-12 overflow-hidden group">
            
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }}>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain rounded shadow-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-500"
                />
            </div>

            {/* Floating Label bottom left */}
            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded text-xs font-mono text-gray-400 hidden lg:block">
                IMG_SOURCE: {project.id.toUpperCase()}.JPG <br/>
                RES: HIGH_FIDELITY
            </div>
        </div>

        {/* Right Column: Technical Data (Clean & Structured) */}
        <div className="lg:w-[45%] w-full h-1/2 lg:h-full bg-[#121212] border-l border-[#2a2a2a] flex flex-col">
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
                <div className="max-w-xl mx-auto space-y-10">
                    
                    {/* Header Section */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                            <Cpu size={12} weight="fill" />
                            {project.type} Unit
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-lg text-gray-400 font-light leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-[#333] to-transparent"></div>

                    {/* Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle size={14} />
                            Technical Description
                        </h3>
                        <p className="text-sm lg:text-base text-gray-300 leading-7 font-light">
                            {project.details}
                        </p>
                    </div>

                    {/* Specs / Tags Grid */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Specifications / Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-[#1e1e1e] border border-[#333] text-gray-300 text-xs font-medium rounded hover:border-gray-500 hover:text-white transition-colors cursor-default flex items-center gap-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Links / Actions */}
                    <div className="pt-4">
                        <button className="group flex items-center gap-3 text-sm text-white font-medium hover:text-blue-400 transition-colors">
                            View Documentation 
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>

            {/* Footer Panel */}
            <div className="p-6 bg-[#0f0f0f] border-t border-[#2a2a2a]">
                <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono uppercase">
                    <div>
                        Last Updated: <span className="text-gray-400">2025-04-12</span>
                    </div>
                    <div className="flex gap-4">
                        <span>ID: {project.id}</span>
                        <span>Coord: {project.x},{project.y}</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};