import React, { useRef, useState, useEffect } from 'react';
import { Project } from '../types';
import { X, CaretLeft, FileText, Wrench, Image as ImageIcon, ChartLine, GlobeHemisphereWest, ArrowRight } from 'phosphor-react';

interface Props {
    project: Project;
    onBack: () => void;
    onClose: () => void;
    onNext: () => void;
}

export const DocumentationWiki: React.FC<Props> = ({ project, onBack, onClose, onNext }) => {
    // Lightbox State
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = `https://placehold.co/800x600/1a1a1a/444444?text=Missing+Asset:+${project.refDes}`;
    };

    return (
        <div className="fixed inset-0 z-[110] bg-[#0a0a0a] text-gray-300 font-sans flex flex-col animate-in slide-in-from-right duration-300">

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <X size={24} className="text-white" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full Screen Preview"
                        className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                    />
                </div>
            )}

            {/* Modern Header */}
            <div className="h-16 border-b border-[#222] flex items-center px-6 justify-between bg-[#0a0a0a]/80 backdrop-blur-md z-20 sticky top-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-[#222] rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                        <CaretLeft size={20} />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-cad-accent font-bold">Documentation Library</span>
                        <span className="text-sm font-semibold text-white">{project.title} <span className="text-gray-600">//</span> {project.refDes}</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-[#222] rounded-full text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 relative overflow-hidden">

                {/* Main Scroll Container */}
                <div
                    className="h-full overflow-y-auto scroll-smooth"
                >

                    {/* Hero Section */}
                    <div className="w-full h-[40vh] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                        <img
                            src={project.imageUrl}
                            alt="Hero"
                            onError={handleImageError}
                            onClick={() => setSelectedImage(project.imageUrl)}
                            className="w-full h-full object-cover opacity-40 blur-sm scale-105 cursor-zoom-in transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 pointer-events-none">
                            <div className="max-w-4xl mx-auto">
                                <div className="inline-block px-3 py-1 bg-cad-accent/10 border border-cad-accent/30 text-cad-accent text-xs font-mono mb-4 rounded">
                                    REV 1.0.4 - STABLE
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{project.title}</h1>
                                <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">{project.description}</p>
                                {project.date && <p className="text-sm text-gray-500 mt-2 font-mono">{project.date} | {project.location}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Content Layout */}
                    <div className="max-w-4xl mx-auto px-8 md:px-16 py-12 space-y-20 relative z-10 pb-32">

                        {/* 1. Project Overview */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-l-4 border-cad-accent pl-4">
                                <FileText size={24} className="text-cad-accent" />
                                <h2>Project Overview</h2>
                            </div>
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                                <p>{project.objective || project.description}</p>
                            </div>
                        </section>

                        {/* 2. Role & Methodology */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-l-4 border-cad-accent pl-4">
                                <Wrench size={24} className="text-cad-accent" />
                                <h2>Role & Methodology</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    {project.role && (
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Specific Contribution</h3>
                                            <p className="text-gray-300 leading-relaxed">{project.role}</p>
                                        </div>
                                    )}
                                    {project.methodology && (
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 mt-4">Technical Approach</h3>
                                            <p className="text-gray-300 leading-relaxed">{project.methodology}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-[#151515] p-6 rounded border border-[#222] h-fit">
                                    <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Tools & Tech</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-[#222] text-xs text-gray-400 rounded border border-[#333]">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Visuals */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-l-4 border-cad-accent pl-4">
                                <ImageIcon size={24} className="text-cad-accent" />
                                <h2>Visuals</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#151515] border border-[#222] rounded-lg p-4 overflow-hidden group cursor-pointer hover:border-cad-accent/50 transition-colors">
                                    <div
                                        className="aspect-video w-full bg-[#111] flex flex-col items-center justify-center relative overflow-hidden rounded"
                                        onClick={() => setSelectedImage(project.imageUrl)}
                                    >
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#333_25%,transparent_25%,transparent_75%,#333_75%,#333),linear-gradient(45deg,#333_25%,transparent_25%,transparent_75%,#333_75%,#333)] bg-[size:20px_20px]"></div>
                                        <img src={project.imageUrl} onError={handleImageError} className="object-contain w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-500" alt="Main Visual" />
                                        <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded border border-gray-700">FIG 1.0 - OVERVIEW</div>
                                    </div>
                                </div>
                                {project.additionalImages?.map((img, idx) => (
                                    <div key={idx} className="bg-[#151515] border border-[#222] rounded-lg p-4 overflow-hidden group cursor-pointer hover:border-cad-accent/50 transition-colors">
                                        <div
                                            className="aspect-video w-full bg-[#111] flex flex-col items-center justify-center relative overflow-hidden rounded"
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img src={img} onError={handleImageError} className="object-contain w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500" alt={`Gallery ${idx}`} />
                                            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded border border-gray-700">FIG 1.{idx + 1}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Results & Impact */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-l-4 border-cad-accent pl-4">
                                <ChartLine size={24} className="text-cad-accent" />
                                <h2>Results & Impact</h2>
                            </div>
                            <div className="bg-[#151515] border-l-2 border-green-500 p-6 rounded-r-lg">
                                <p className="text-gray-300 italic leading-relaxed">
                                    "{project.results || 'Detailed outcomes pending final review.'}"
                                </p>
                            </div>
                        </section>

                        {/* 5. Context */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-l-4 border-cad-accent pl-4">
                                <GlobeHemisphereWest size={24} className="text-cad-accent" />
                                <h2>Context</h2>
                            </div>
                            <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed">
                                <p>{project.context || 'No additional context provided.'}</p>
                            </div>
                        </section>

                        {/* Navigation Footer */}
                        <div className="pt-12">
                            <div className="h-px bg-[#222] mb-8"></div>
                            <button
                                onClick={onNext}
                                className="group flex items-center justify-between w-full p-6 border border-[#222] rounded hover:border-cad-accent hover:bg-[#111] transition-all text-left"
                            >
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Up Next</div>
                                    <div className="text-lg text-white font-bold group-hover:text-cad-accent transition-colors">View Next Component</div>
                                </div>
                                <ArrowRight size={24} className="text-gray-500 group-hover:text-cad-accent group-hover:translate-x-2 transition-all" />
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}