import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { SchematicCanvas } from './components/SchematicCanvas';
import { CommandPrompt } from './components/CommandPrompt';
import { DocumentationWiki } from './components/DocumentationWiki';
import { PROJECTS, WIRES, FILE_TREE, PASSIVES, REGIONS } from './constants';
import { ViewMode, ToolType } from './types';

const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SCHEMATIC);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [activeTool, setActiveTool] = useState<ToolType>('SELECT');
  const [scale, setScale] = useState(0.8);

  const [wasSidebarOpen, setWasSidebarOpen] = useState(true);
  const [wasTerminalOpen, setWasTerminalOpen] = useState(true);

  // Terminal History State - Lifted from CommandPrompt
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'DxDesigner Pro v2025.1.0',
    'Copyright (c) Simon Bullock 2025',
    'Loading system libraries... Done.',
    'Type "help" for available commands.'
  ]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
      setScale(0.4);
    }
  }, []);

  const addToTerminal = (msg: string) => {
    setTerminalHistory(prev => [...prev, msg]);
    // Ensure terminal opens to show the message
    setIsTerminalOpen(true);
  };

  const handleSelectProject = (id: string) => {
    // Save current state before closing
    setWasSidebarOpen(isSidebarOpen);
    setWasTerminalOpen(isTerminalOpen);

    setSelectedProjectId(id);
    // Direct to Documentation now, skipping PCB_DETAIL popup
    setViewMode(ViewMode.DOCUMENTATION);

    // Close panels for focus
    setIsSidebarOpen(false);
    setIsTerminalOpen(false);
  };

  const handleCloseDetail = () => {
    setViewMode(ViewMode.SCHEMATIC);
    // Restore previous state
    setIsSidebarOpen(wasSidebarOpen);
    setIsTerminalOpen(wasTerminalOpen);
  };

  const handleNextProject = () => {
    if (!selectedProjectId) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProjectId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProjectId(PROJECTS[nextIndex].id);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setScale(prev => Math.max(prev * 0.8, 0.1));

  const [isLightMode, setIsLightMode] = useState(false);

  // Handle Logic from Menus and Toolbar
  const handleSystemAction = (action: string) => {
    switch (action) {
      case 'Save Resume':
        addToTerminal('Initiating Resume Download...');
        const link = document.createElement('a');
        link.href = '/assets/resume/Simon Bullock Resume 2025.pdf';
        link.download = 'Simon_Bullock_Resume_2025.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToTerminal('Download started: Simon_Bullock_Resume_2025.pdf');
        break;
      case 'Print':
      case 'Print Page':
        addToTerminal('Sending job to printer...');
        setTimeout(() => window.print(), 500);
        break;
      case 'View':
        const newMode = !isLightMode;
        setIsLightMode(newMode);
        if (newMode) {
          document.body.classList.add('light-mode');
          addToTerminal('Display Mode: Light');
        } else {
          document.body.classList.remove('light-mode');
          addToTerminal('Display Mode: Dark');
        }
        break;
      case 'File':
        navigator.clipboard.writeText(window.location.href);
        addToTerminal('Website URL copied to clipboard.');
        break;
      case 'Simulation':
        addToTerminal('Initializing Logic Simulation...');
        setTimeout(() => addToTerminal('Analyzing Career Trajectory... [OK]'), 600);
        setTimeout(() => addToTerminal('Checking Skillset Integrity... [100%]'), 1200);
        setTimeout(() => addToTerminal('Simulation Complete: Candidate is ready for hire.'), 1800);
        break;
      case 'Place':
        navigator.clipboard.writeText('simonscholar155@gmail.com');
        addToTerminal('Contact Email copied to clipboard.');
        break;
      case 'Settings':
        addToTerminal('Opening System Preferences... (Access Denied: Read-Only Mode)');
        break;
      case 'BOM':
        addToTerminal('Generating Bill of Materials...');
        addToTerminal(`Total Components: ${PROJECTS.length + PASSIVES.length}`);
        addToTerminal('Export complete.');
        break;
      default:
        addToTerminal(`Command '${action}' selected.`);
    }
  };

  // Handle Terminal Input
  const handleTerminalCommand = (input: string) => {
    const cmd = input.trim().toLowerCase();
    const args = cmd.split(' ');
    const action = args[0];

    const newLog = [`user@simon-ws:~$ ${input}`];

    switch (action) {
      case 'help':
        newLog.push(
          'Available commands:',
          '  list              - List all projects/components',
          '  open <refDes>     - Open project details',
          '  resume            - Display summary',
          '  contact           - Show contact info',
          '  clear             - Clear console'
        );
        break;
      case 'list':
        PROJECTS.forEach(p => {
          newLog.push(`  [${p.type}] ${p.refDes.padEnd(12)} : ${p.title}`);
        });
        break;
      case 'open':
        if (args[1]) {
          const target = PROJECTS.find(p => p.refDes.toLowerCase() === args[1].toLowerCase());
          if (target) {
            handleSelectProject(target.id);
            newLog.push(`Opening design files for: ${target.title}...`);
          } else {
            newLog.push(`Error 404: Component '${args[1]}' not found.`);
          }
        } else {
          newLog.push('Usage: open <refDes>');
        }
        break;
      case 'resume':
        newLog.push('Simon Bullock | B.S. EE & M.S. ECE', 'Status: Open to collaboration');
        break;
      case 'contact':
        newLog.push('Email: simonscholar155@gmail.com');
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      default:
        newLog.push(`Command '${action}' not recognized.`);
    }
    setTerminalHistory(prev => [...prev, ...newLog]);
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <Layout
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      isTerminalOpen={isTerminalOpen}
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onSystemAction={handleSystemAction}
      sidebar={
        <Sidebar
          nodes={FILE_TREE}
          onSelect={handleSelectProject}
        />
      }
      bottomPanel={
        <CommandPrompt
          projects={PROJECTS}
          onSelect={handleSelectProject}
          isExpanded={isTerminalOpen}
          onToggleExpand={() => setIsTerminalOpen(!isTerminalOpen)}
          history={terminalHistory}
          onCommand={handleTerminalCommand}
        />
      }
    >
      <SchematicCanvas
        projects={PROJECTS}
        wires={WIRES}
        passives={PASSIVES}
        regions={REGIONS}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
        activeTool={activeTool}
        scale={scale}
        setScale={setScale}
      />

      {viewMode === ViewMode.DOCUMENTATION && selectedProject && (
        <DocumentationWiki
          project={selectedProject}
          onBack={handleCloseDetail}
          onClose={handleCloseDetail}
          onNext={handleNextProject}
        />
      )}
    </Layout>
  );
};

export default App;