import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { SchematicCanvas } from './components/SchematicCanvas';
import { CommandPrompt } from './components/CommandPrompt';
import { ProjectDetail } from './components/ProjectDetail';
import { PROJECTS, WIRES, FILE_TREE } from './constants';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SCHEMATIC);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    // In real DxDesigner, selecting highlights. Double click opens. 
    // Here we simplify: Click -> Highlight, then show detail if clicked again or separate logic.
    // Let's make it: Select highlights. 
    // But to see detail, we set view mode.
    
    // For this UX, let's auto-open detail if not already open, or maybe just a delay?
    // Let's stick to the requirement: "Clicking a component brings up a new page".
    
    if (id === selectedProjectId) {
        setViewMode(ViewMode.PCB_DETAIL);
    } else {
        setSelectedProjectId(id);
        setViewMode(ViewMode.PCB_DETAIL);
    }
  };

  const handleCloseDetail = () => {
    setViewMode(ViewMode.SCHEMATIC);
    // Keep selection for context
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <Layout
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
        />
      }
    >
      <SchematicCanvas 
        projects={PROJECTS} 
        wires={WIRES} 
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
      />

      {viewMode === ViewMode.PCB_DETAIL && selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={handleCloseDetail} 
        />
      )}
    </Layout>
  );
};

export default App;
