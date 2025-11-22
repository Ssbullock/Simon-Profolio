import { Project, WirePath, FileNode } from './types';

export const PROJECTS: Project[] = [
  // Professional Experience Nodes
  {
    id: 'boe777',
    title: 'Boeing 777x ACE',
    refDes: 'U_BAE_01',
    description: 'Hardware Systems Engineer at BAE Systems',
    details: 'Led signal integrity and EMI testing for actuator control electronics. Proactively identified and resolved issues to ensure compliance with rigorous industry standards. Owned system configuration workflows and investigated technical failures.',
    tags: ['Signal Integrity', 'EMI', 'Systems Engineering', 'Aerospace'],
    imageUrl: 'https://picsum.photos/seed/bae1/800/600',
    x: 300,
    y: 200,
    type: 'IC',
  },
  {
    id: 'fadec',
    title: 'Military FADEC Test Stand',
    refDes: 'U_BAE_02',
    description: 'Test Engineer at BAE Systems',
    details: 'Designed a complete test stand in Xpedition Designer for a Large Military FADEC unit. Included full interconnect architecture, interface panel layout, and PCB design for pressure transducer testing. Led full hardware integration from concept to deployment.',
    tags: ['Xpedition', 'Test Stand', 'PCB Design', 'Hardware Integration'],
    imageUrl: 'https://picsum.photos/seed/bae2/800/600',
    x: 300,
    y: 450,
    type: 'IC',
  },
  {
    id: 'gannett',
    title: 'Power Dist. Systems',
    refDes: 'U_GF_01',
    description: 'Electrical Engineering Intern at Gannett Fleming',
    details: 'Executed load calculations and populated panel board schedules. Supported development of electrical floor plans, short circuit studies, and protective device coordination studies for infrastructure projects.',
    tags: ['Power', 'AutoCAD', 'Revit', 'Load Calcs'],
    imageUrl: 'https://picsum.photos/seed/gf/800/600',
    x: 100,
    y: 325,
    type: 'IC',
  },

  // Project Nodes
  {
    id: 'wireless_shift',
    title: 'Voice Control Shifting',
    refDes: 'SEN_PROJ',
    description: 'Senior Capstone: Wireless Bike Shifting',
    details: 'Designed a real-time speech processing system using Raspberry Pi and Arduino to enable voice-controlled shifting. Spearheaded optimization of Python speech algorithms and C++ command processing for rapid response times.',
    tags: ['Python', 'C++', 'Raspberry Pi', 'Arduino', 'Embedded'],
    imageUrl: 'https://picsum.photos/seed/bike/800/600',
    x: 600,
    y: 200,
    type: 'IC', // Using IC to represent the Controller
  },
  {
    id: 'actuator_board',
    title: 'Actuator Control Board',
    refDes: 'TECH_DEV',
    description: 'Technical Development Curriculum Project',
    details: 'Led proposal and design for an actuator control board driving direct-drive and servo valves. Collaborated with senior engineers to translate mission needs into custom analog hardware architecture.',
    tags: ['Analog Design', 'Control Theory', 'Hardware Arch'],
    imageUrl: 'https://picsum.photos/seed/actuator/800/600',
    x: 600,
    y: 450,
    type: 'OPAMP', // Using OpAmp to represent Analog nature
  },
  {
    id: 'metal_det',
    title: 'Colpitts Metal Detector',
    refDes: 'JUN_PROJ',
    description: 'Junior Design Final Project',
    details: 'Engineered a metal detection system employing electromagnetic coupling and a Colpitts oscillator. Enhanced functionality with a Basys 3 FPGA for real-time detection validation and tallying.',
    tags: ['FPGA', 'Verilog', 'Analog Circuits', 'Oscillators'],
    imageUrl: 'https://picsum.photos/seed/metal/800/600',
    x: 850,
    y: 325,
    type: 'CONNECTOR', // Representing the coil/sensor interface
  }
];

export const WIRES: WirePath[] = [
  // Career Path Backbone (Power Rail metaphor)
  { id: 'w_educ', points: "50,325 100,325", color: "#ffd700" }, // Into Gannett
  
  // Gannett to BAE Systems (Career flow)
  { id: 'w_career_1', points: "150,325 200,325 200,200 250,200", color: "#4fc3f7" }, // To BAE 1
  { id: 'w_career_2', points: "200,325 200,450 250,450", color: "#4fc3f7" }, // To BAE 2

  // BAE to Projects (Skills application)
  { id: 'w_skill_1', points: "350,200 450,200 450,200 550,200", color: "#ffd700" }, // BAE1 to Senior Proj
  { id: 'w_skill_2', points: "350,450 450,450 450,450 550,450", color: "#ffd700" }, // BAE2 to Tech Dev

  // Inter-project dependencies (The logic)
  { id: 'w_logic_1', points: "650,200 750,200 750,325 800,325", color: "#ff4081" }, // Senior to Junior (Time flow reverse or related skills)
  { id: 'w_logic_2', points: "650,450 750,450 750,325 800,325", color: "#ff4081" }, 

  // Bus lines indicating shared knowledge
  { id: 'bus_main', points: "450,100 450,550", color: "#333333" }, 
];

export const FILE_TREE: FileNode[] = [
  {
    id: 'root',
    name: 'S_BULLOCK_WORKSPACE',
    type: 'folder',
    children: [
      {
        id: 'experience',
        name: 'Professional_Exp',
        type: 'folder',
        children: [
          { id: 'node_bae1', name: 'U_BAE_01: Boeing_777x', type: 'file', projectId: 'boe777' },
          { id: 'node_bae2', name: 'U_BAE_02: FADEC_Test', type: 'file', projectId: 'fadec' },
          { id: 'node_gf', name: 'U_GF_01: Power_Sys', type: 'file', projectId: 'gannett' },
        ]
      },
      {
        id: 'projects',
        name: 'Academic_Projects',
        type: 'folder',
        children: [
            { id: 'node_senior', name: 'SEN_PROJ: Wireless_Shift', type: 'file', projectId: 'wireless_shift' },
            { id: 'node_tech', name: 'TECH_DEV: Actuator_Ctrl', type: 'file', projectId: 'actuator_board' },
            { id: 'node_junior', name: 'JUN_PROJ: Metal_Detector', type: 'file', projectId: 'metal_det' },
        ]
      },
      {
        id: 'skills',
        name: 'Skill_Libraries',
        type: 'folder',
        children: [
            { id: 'lib_sw', name: 'lib_software.h (C++/Py)', type: 'file' },
            { id: 'lib_hw', name: 'lib_hardware.sch (PCB)', type: 'file' },
            { id: 'lib_tools', name: 'lib_tools (Xpedition)', type: 'file' },
        ]
      }
    ]
  }
];