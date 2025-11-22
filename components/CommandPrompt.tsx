import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface Props {
  projects: Project[];
  onSelect: (id: string) => void;
}

export const CommandPrompt: React.FC<Props> = ({ projects, onSelect }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'DxDesigner Pro v2025.1.0',
    'Copyright (c) Simon Bullock 2025',
    'Loading system libraries... Done.',
    'Type "help" for available commands.'
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const args = cmd.split(' ');
    const action = args[0];

    const newHistory = [`user@simon-ws:~$ ${input}`];

    switch (action) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  list              - List all projects/components',
          '  open <refDes>     - Open project details (e.g., open U_BAE_01)',
          '  resume            - Display summary of Simon Bullock',
          '  contact           - Show contact information',
          '  clear             - Clear console'
        );
        break;
      case 'list':
        projects.forEach(p => {
          newHistory.push(`  [${p.type}] ${p.refDes.padEnd(12)} : ${p.title}`);
        });
        break;
      case 'open':
        if (args[1]) {
          const target = projects.find(p => p.refDes.toLowerCase() === args[1].toLowerCase());
          if (target) {
            onSelect(target.id);
            newHistory.push(`Opening design files for: ${target.title}...`);
          } else {
            newHistory.push(`Error 404: Component '${args[1]}' not found in netlist.`);
          }
        } else {
          newHistory.push('Error: Missing RefDes. Usage: open <refDes>');
        }
        break;
      case 'resume':
        newHistory.push(
             'Simon Bullock | B.S. EE & M.S. ECE',
             'Current: BAE Systems (Test Engineer)',
             'Skills: Xpedition, Python, C++, SolidWorks',
             'Status: Open to collaboration'
        );
        break;
      case 'contact':
        newHistory.push(
            'Email: simonscholar155@gmail.com',
            'LinkedIn: linkedin.com/in/sbullock2002',
            'GitHub: github.com/Ssbullock'
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push(`Command '${action}' not found.`);
    }

    setHistory(prev => [...prev, ...newHistory]);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col font-mono text-sm">
      <div className="bg-cad-uiDark px-2 py-1 text-xs border-b border-cad-uiBorder flex justify-between text-gray-400">
        <span>TERMINAL - LOCAL</span>
        <span>UTF-8</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 bg-[#121212] text-gray-300 font-mono leading-5">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line.startsWith('user@') ? <span className="text-cad-accent">{line}</span> : line}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleCommand} className="border-t border-cad-uiBorder flex items-center bg-cad-uiDark p-1">
        <span className="px-2 text-cad-accent font-bold">{'>'}</span>
        <input 
          type="text" 
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          autoFocus
        />
      </form>
    </div>
  );
};