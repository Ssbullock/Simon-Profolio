import { Project, WirePath, FileNode, Passive, SchematicRegion } from './types';

// Frame / Sheet Dimensions
export const SHEET_WIDTH = 1400;
export const SHEET_HEIGHT = 1300; // Increased height for additional projects

export const REGIONS: SchematicRegion[] = [
  {
    id: 'region_exp',
    label: 'BLOCK A: PROFESSIONAL_EXPERIENCE',
    x: 50,
    y: 100,
    width: 500,
    height: 800,
    color: '#00ff00' // Neon Greenish
  },
  {
    id: 'region_proj',
    label: 'BLOCK B: ACADEMIC_PROJECTS',
    x: 600,
    y: 100,
    width: 750,
    height: 600, // Expanded for Pololu
    color: '#ffff00' // Yellow
  },
  {
    id: 'region_personal',
    label: 'BLOCK C: PERSONAL_PROJECTS',
    x: 600,
    y: 730, // Shifted down
    width: 750,
    height: 500, // Expanded for Arm & Hydroponics
    color: '#00ffff' // Cyan
  }
];

export const PROJECTS: Project[] = [
  // --- BLOCK A: PROFESSIONAL EXPERIENCE ---
  {
    id: 'boe777',
    title: 'Boeing 777x ACE',
    refDes: 'U100',
    description: 'Hardware Systems Engineer at BAE Systems',
    objective: 'To validate the integrity and compliance of Actuator Control Electronics (ACE) for the Boeing 777x, ensuring zero-failure performance in aerospace conditions.',
    role: 'Hardware Systems Engineer responsible for Signal Integrity and EMI testing workflows.',
    methodology: 'Conducted rigorous EMI/EMC testing cycles. Owned system configuration workflows using internal management tools to track component changes. Investigated technical failures in the testbed and engineered board-level fixes.',
    results: 'Proactively identified signal degradation issues early in the design phase, preventing costly manufacturing spins. Delivered full compliance reports to external stakeholders, ensuring project alignment.',
    context: 'The 777x is a flagship program requiring adherence to the strictest aerospace safety standards (DO-254). Any signal interference could lead to actuator failure.',
    tags: ['Signal Integrity', 'EMI', 'Systems Engineering', 'Aerospace'],
    imageUrl: '/assets/777x/777x1.jpeg', // Assumed filename based on folder existence
    additionalImages: ['/assets/777x/777x2.jpeg'],
    x: 250,
    y: 250,
    type: 'IC',
    date: 'June 2024 - July 2025',
    location: 'Endicott, NY'
  },
  {
    id: 'fadec',
    title: 'Military FADEC Test Stand',
    refDes: 'U101',
    description: 'Test Engineer at BAE Systems',
    objective: 'Design and deploy a comprehensive test stand for a Large Military Full Authority Digital Engine Control (FADEC) unit.',
    role: 'Lead Test Engineer leading hardware integration from concept to deployment.',
    methodology: 'Utilized Xpedition Designer for the PCB design of the interface panels and interconnect architecture. Engineered custom cable assemblies to integrate PCs, waveform generators, and power supplies into a rack-mount system.',
    results: 'Successfully deployed a reliable, scalable test environment compliant with aerospace standards. Reduced setup time for pressure transducer testing by integrating automated switching matrices.',
    context: 'Testing military engine controllers requires simulating extreme operating conditions on the ground. The test stand acts as the "engine" during verification.',
    tags: ['Xpedition', 'Test Stand', 'PCB Design', 'Hardware Integration'],
    imageUrl: '/assets/test_equipemt/fadec1.jpeg', // Path updated as requested
    additionalImages: ['/assets/test_equipemt/fadec2.jpeg'],
    x: 250,
    y: 550,
    type: 'IC',
    date: 'July 2025 - Present',
    location: 'Endicott, NY'
  },
  {
    id: 'gannett',
    title: 'Power Dist. Systems',
    refDes: 'U102',
    description: 'Electrical Engineering Intern at Gannett Fleming',
    objective: 'Support the development of essential design documents for large-scale infrastructure electrical systems.',
    role: 'Electrical Engineering Intern.',
    methodology: 'Executed electrical load calculations and populated panel board schedules using AutoCAD and Revit. Performed short circuit studies to ensure protective device coordination.',
    results: 'Meticulously populated schedules ensured 100% compliance with industry safety regulations. delivered electrical floor plans ahead of schedule.',
    context: 'Infrastructure power distribution requires precise load balancing to prevent outages and ensure safety in commercial buildings.',
    tags: ['Power', 'AutoCAD', 'Revit', 'Load Calcs'],
    imageUrl: '/assets/gannet/gannett1.jpeg', // Path updated as requested
    x: 250,
    y: 800,
    type: 'IC',
    date: 'June - August 2023',
    location: 'Manhattan, NY'
  },

  // --- BLOCK B: ACADEMIC PROJECTS ---
  {
    id: 'wireless_shift',
    title: 'Voice Control Shifting',
    refDes: 'U200',
    description: 'Senior Capstone: Wireless Bike Shifting',
    objective: 'Enable hands-free gear shifting and braking on a bicycle using voice commands for improved accessibility and safety.',
    role: 'Configuration Manager & Embedded Software Lead.',
    methodology: 'Designed a real-time speech processing pipeline using Python on a Raspberry Pi. Interfaced with an Arduino via serial to drive servo motors for mechanical actuation. Optimized C++ command processing for low latency.',
    results: 'Achieved rapid system response times allowing for practical use while riding. Successfully demonstrated voice-controlled shifting in a noisy outdoor environment.',
    context: 'Traditional gear shifters can be difficult for riders with limited hand mobility. Voice control offers an inclusive alternative.',
    tags: ['Python', 'C++', 'Raspberry Pi', 'Arduino', 'Embedded'],
    imageUrl: '/assets/bike/bike1.jpeg',
    additionalImages: [
        '/assets/bike/bike2.jpeg',
        '/assets/bike/bike3.jpeg',
        '/assets/bike/bike4.jpeg',
        '/assets/bike/bike5.jpeg',
        '/assets/bike/bike6.jpeg',
        '/assets/bike/bike7.jpeg',
        '/assets/bike/bike8.jpeg',
        '/assets/bike/bike9.jpeg',
        '/assets/bike/bike10.jpeg',
    ],
    x: 800,
    y: 200,
    type: 'IC',
    date: 'Sept 2023 - May 2024',
    location: 'Binghamton, NY'
  },
  {
    id: 'actuator_board',
    title: 'Actuator Control Board',
    refDes: 'U201',
    description: 'Technical Development Curriculum Project',
    objective: 'Develop a proposal and architecture for an actuator control board capable of driving both direct-drive and servo valve actuators.',
    role: 'Lead Architect for the Analog Front End.',
    methodology: 'Collaborated with senior engineers to translate mission needs into technical specs. Designed custom analog hardware to condition sensor signals and drive high-current loads. Performed SPICE simulations to verify stability.',
    results: 'Delivered a final architecture and technical presentation that was approved for prototyping. Created a reusable design block for future actuator projects.',
    context: 'Actuator control is central to flight surfaces and engine control. A universal board reduces cost and design time for new vehicle programs.',
    tags: ['Analog Design', 'Control Theory', 'Hardware Arch'],
    imageUrl: '/assets/acb/CAD.jpeg',
    additionalImages: [
        '/assets/acb/visio.jpeg'
    ],
    x: 1100,
    y: 200,
    type: 'OPAMP',
    date: 'Aug 2024 - May 2025',
    location: 'Endicott, NY'
  },
  {
    id: 'pololu_bot',
    title: 'Pololu 3pi Robot',
    refDes: 'U202',
    description: 'Sophomore Design Final Project',
    objective: 'Program a Pololu 3pi Robot to navigate a grid autonomously, detect mines using sensors, and travel to predefined coordinates.',
    role: 'Co-Programmer.',
    methodology: 'Implemented diverse functionalities leveraging bit masking and pulse-width modulation (PWM) for precise motor control. Developed sensor fusion logic for mine detection and LCD feedback for status updates.',
    results: 'Successfully navigated the competition grid, avoiding all obstacles and accurately identifying mine locations within the time limit.',
    context: 'Autonomous navigation requires tight integration between sensor inputs and motor output loops.',
    tags: ['C++', 'Embedded', 'PWM', 'Robotics', 'Sensors'],
    imageUrl: '/assets/pololu/robot1.jpeg', // Placeholder/Assumed path
    x: 800,
    y: 480,
    type: 'IC',
    date: 'April 2022 - May 2022',
    location: 'Binghamton, NY'
  },
  {
    id: 'metal_det',
    title: 'Colpitts Metal Detector',
    refDes: 'J300',
    description: 'Junior Design Final Project',
    objective: 'Engineer a portable system capable of detecting, validating, and tallying metal objects in real-time.',
    role: 'Co-Engineer responsible for Oscillator Circuit and FPGA Logic.',
    methodology: 'Designed a 7.2V DC-powered Colpitts oscillator circuit with a custom inductance coil. Interfaced the analog detection signal with a Basys 3 FPGA to perform digital signal processing and count detections.',
    results: 'Built a fully functional prototype that could distinguish between different metal types based on frequency shifts. Successfully integrated analog and digital domains.',
    context: 'A classic engineering challenge that demonstrates mastery of electromagnetic coupling and oscillator theory.',
    tags: ['FPGA', 'Verilog', 'Analog Circuits', 'Oscillators'],
    imageUrl: '/assets/copitts/copitts1.jpeg',
    additionalImages: [
        '/assets/copitts/copitts2.jpeg',
        '/assets/copitts/bike11.jpeg' 
    ],
    x: 1100,
    y: 480,
    type: 'CONNECTOR',
    date: 'April 2023 - May 2023',
    location: 'Binghamton, NY'
  },

  // --- BLOCK C: PERSONAL PROJECTS ---
  {
    id: 'serene_ai',
    title: 'Serene: AI Meditation',
    refDes: 'U300',
    description: 'Real-time Generative AI Audio Platform',
    objective: 'To democratize access to personalized mental wellness by generating custom meditation experiences in real-time.',
    role: 'Full Stack Developer & Product Designer.',
    methodology: 'Leveraged Google\'s Gemini AI for generating context-aware scripts and OpenAI\'s TTS for voice synthesis. Built a low-latency audio streaming architecture using WebSockets on Supabase Edge Functions. Developed the frontend with React Native (Capacitor) for iOS deployment.',
    results: 'Launched a functional MVP featuring 11+ meditation styles and real-time background music mixing. Successfully integrated Stripe for subscription payments.',
    context: 'Generic meditation apps lack personalization. Serene solves this by creating unique content for every user session based on their immediate emotional state.',
    tags: ['React Native', 'Gemini AI', 'OpenAI TTS', 'Supabase', 'WebSockets', 'Stripe'],
    imageUrl: '/assets/serene/landing_page.png', 
    additionalImages: [
        '/assets/serene/mobile_welcome.png',
        '/assets/serene/setup_wizard.png',
        '/assets/serene/dashboard_overview.png',
    ],
    x: 800,
    y: 850,
    type: 'IC',
    date: '2024 - Present',
    location: 'Remote'
  },
  {
    id: 'robotic_arm',
    title: 'Robotic Arm',
    refDes: 'U301',
    description: '3D Printed Robotic Arm',
    objective: 'Designed a printed a robot arm capable of moving around and gripping objects.',
    role: 'Maker & Programmer.',
    methodology: 'Designed mechanical parts in CAD and 3D printed them. Wired servos to a Raspberry Pi and wrote Python scripts to calculate inverse kinematics for arm movement and gripper actuation.',
    results: 'Achieved 3 degrees of freedom movement and reliable pick-and-place operations.',
    context: 'Robotics requires a multidisciplinary approach combining mechanical design, electronics, and software control loops.',
    tags: ['Python', 'Raspberry Pi', '3D Printing', 'Robotics', 'CAD'],
    imageUrl: '/assets/robot_arm/arm1.jpeg', // Path updated
    x: 1100,
    y: 850,
    type: 'IC',
    date: 'Oct 2025 - Present',
    location: 'Home Lab'
  },
  {
    id: 'hydroponics',
    title: 'Automated Hydroponics',
    refDes: 'U302',
    description: 'Smart Hydroponic Growth System',
    objective: 'Create a self-regulating hydroponic system to monitor and adjust water quality for optimal plant growth.',
    role: 'System Designer.',
    methodology: 'Integrated pH and EC sensors with an ESP32 microcontroller. Programmed logic to automatically trigger peristaltic pumps to adjust nutrient solutions based on sensor readings.',
    results: 'Maintained stable pH levels for 4 weeks without manual intervention, resulting in accelerated lettuce growth compared to soil control.',
    context: 'Sustainable agriculture relies on automation to maximize yield and minimize resource usage.',
    tags: ['IoT', 'ESP32', 'Sensors', 'Automation'],
    imageUrl: '/assets/hydrponics/hydro1.jpeg', // Path updated to prompt spelling 'hydrponics' or standard
    x: 950,
    y: 1050,
    type: 'IC',
    date: '2023',
    location: 'Home Lab'
  }
];

export const PASSIVES: Passive[] = []; 

export const WIRES: WirePath[] = [
  // --- BLOCK A Interconnects ---
  // U100 (Boeing) to U101 (FADEC) - Vertical Data Bus
  { id: 'bus_a_1', points: "250,290 250,510", color: "#4fc3f7" },
  // U101 to U102 (Gannett) - Power Bus
  { id: 'bus_a_2', points: "250,590 250,760", color: "#ffd700" },

  // --- BLOCK A to BLOCK B (Academic) ---
  // U100 -> U200 (Wireless)
  { id: 'cross_1', points: "300,250 550,250 550,200 750,200", color: "#ff4081" },
  // U101 -> U201 (Actuator)
  { id: 'cross_2', points: "300,550 580,550 580,200 1050,200", color: "#ff4081" },
  
  // --- BLOCK B Interconnects ---
  // U200 -> U202 (Pololu)
  { id: 'acad_1', points: "850,240 850,440", color: "#4fc3f7" },
  // U201 -> J300 (Metal Det)
  { id: 'acad_2', points: "1150,240 1150,440", color: "#ffd700" },
  // U202 -> J300 (Cross)
  { id: 'acad_3', points: "850,480 1050,480", color: "#4fc3f7" },

  // --- BLOCK A/B to BLOCK C (Personal) ---
  // U102 -> U300 (Serene)
  { id: 'pers_1', points: "300,800 500,800 500,850 750,850", color: "#ffd700" },
  // U200 -> U301 (Robotic Arm) - Logic link
  { id: 'pers_2', points: "800,240 800,350 1300,350 1300,850 1150,850", color: "#ff4081" },

  // --- BLOCK C Interconnects ---
  // U300 -> U302 (Hydro)
  { id: 'pers_3', points: "850,890 850,1050 900,1050", color: "#4fc3f7" },
  // U301 -> U302
  { id: 'pers_4', points: "1100,890 1100,1050 1000,1050", color: "#4fc3f7" },

  // --- External IO ---
  { id: 'io_1', points: "200,250 50,250", color: "#808080" },
  { id: 'io_2', points: "200,550 50,550", color: "#808080" },
  { id: 'io_3', points: "1350,850 1150,850", color: "#ff4081" }
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
          { id: 'node_bae1', name: 'U100: Boeing_777x', type: 'file', projectId: 'boe777' },
          { id: 'node_bae2', name: 'U101: FADEC_Test', type: 'file', projectId: 'fadec' },
          { id: 'node_gf', name: 'U102: Power_Sys', type: 'file', projectId: 'gannett' },
        ]
      },
      {
        id: 'projects',
        name: 'Academic_Projects',
        type: 'folder',
        children: [
            { id: 'node_senior', name: 'U200: Wireless_Shift', type: 'file', projectId: 'wireless_shift' },
            { id: 'node_tech', name: 'U201: Actuator_Ctrl', type: 'file', projectId: 'actuator_board' },
            { id: 'node_pololu', name: 'U202: Pololu_Robot', type: 'file', projectId: 'pololu_bot' },
            { id: 'node_junior', name: 'J300: Metal_Detector', type: 'file', projectId: 'metal_det' },
        ]
      },
      {
        id: 'personal',
        name: 'Personal_Projects',
        type: 'folder',
        children: [
            { id: 'node_serene', name: 'U300: Serene_AI', type: 'file', projectId: 'serene_ai' },
            { id: 'node_arm', name: 'U301: Robotic_Arm', type: 'file', projectId: 'robotic_arm' },
            { id: 'node_hydro', name: 'U302: Hydroponics', type: 'file', projectId: 'hydroponics' },
        ]
      },
      {
        id: 'assets_dir',
        name: 'Assets',
        type: 'folder',
        children: [
            {
                id: 'assets_bike', name: 'Bike_System', type: 'folder', children: [
                    { id: 'img_b1', name: 'bike1.jpeg', type: 'file' }
                ]
            },
            {
                id: 'assets_acb', name: 'Actuator_Board', type: 'folder', children: [
                    { id: 'img_acb1', name: 'CAD.jpeg', type: 'file' }
                ]
            },
            {
                id: 'assets_cop', name: 'Metal_Detector', type: 'folder', children: [
                    { id: 'img_cop1', name: 'copitts1.jpeg', type: 'file' }
                ]
            }
        ]
      },
      {
        id: 'libs',
        name: 'Libraries',
        type: 'folder',
        children: [
            { id: 'lib_pas', name: 'passives.slb', type: 'file' },
            { id: 'lib_ic', name: 'analog_ic.slb', type: 'file' },
        ]
      }
    ]
  }
];