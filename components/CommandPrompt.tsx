import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { CaretUp, CaretDown } from 'phosphor-react';

interface Props {
  projects: Project[];
  onSelect: (id: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  history: string[]; // Lifted state
  onCommand: (cmd: string) => void; // Callback to parent
}

export const CommandPrompt: React.FC<Props> = ({ projects, onSelect, isExpanded, onToggleExpand, history, onCommand }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (isExpanded) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [history, isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col font-mono text-sm overflow-hidden">
      <div 
        className="bg-cad-uiDark px-2 py-1 text-xs border-b border-cad-uiBorder flex justify-between items-center text-gray-400 cursor-pointer hover:bg-cad-uiLight transition-colors select-none"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2">
            <span className="text-cad-accent">{isExpanded ? '▼' : '▶'}</span>
            <span>TERMINAL - LOCAL</span>
        </div>
        <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <button className="text-gray-400 hover:text-white focus:outline-none">
                {isExpanded ? <CaretDown size={14} /> : <CaretUp size={14} />}
            </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 bg-[#121212] text-gray-300 font-mono leading-5">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line.startsWith('user@') ? <span className="text-cad-accent">{line}</span> : line}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-cad-uiBorder flex items-center bg-cad-uiDark p-1 shrink-0">
        <span className="px-2 text-cad-accent font-bold">{'>'}</span>
        <input 
          type="text" 
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          disabled={!isExpanded}
        />
      </form>
    </div>
  );
};