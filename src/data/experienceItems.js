import hyregoLanding from '../assets/Hyrego/Landing Page.png';
import hyregoLogo from '../assets/Hyrego/Logo.png';

import apniLanding from '../assets/ApniEstate/Landing Page.png';
import apniLogo from '../assets/ApniEstate/Logo.png';

import fantrioLanding from '../assets/Fantrio/Landing Page.png';
import fantrioLogo from '../assets/Fantrio/Logo.png';

import mingoLanding from '../assets/Mingo/Landing Page.png';
import mingoLogo from '../assets/Mingo/Logo.webp';

import puja3dLanding from '../assets/Puja3D/Landing Page.png';
import puja3dLogo from '../assets/Puja3D/Logo.png';

import starpixLanding from '../assets/Starpix/Landing Page.png';
import starpixLogo from '../assets/Starpix/Logo.png';

export const WORK_EXPERIENCE_ITEMS = [
  {
    id: "apni-estate",
    title: "APNI ESTATE\nREAL ESTATE MARKETPLACE",
    subtitle: "Product / Full-Stack Development Intern",
    credit: "INTERNSHIP",
    meta: ["DEC 2025 - MAR 2026", "MARKETPLACE", "APNIESTATE.COM"],
    accent: "#059669",
    image: apniLanding,
    logo: apniLogo,
    stack: ["AWS", "React.js", "Express.js", "MongoDB", "ImageKit", "Nodemailer"],
    links: { github: "https://github.com/vixxk/Apni_Estate", live: "https://www.apniestate.com/" },
    points: [
      "Built a role-based real estate marketplace from scratch with responsive UI and integrated email services.",
      "Managed AWS EC2 backend deployment and CI/CD pipelines for automated production builds."
    ]
  },
  {
    id: "hyrego",
    title: "HYREGO\nAI CAREER ASSISTANT",
    subtitle: "Full-Stack GenAI Developer",
    credit: "FREELANCE",
    meta: ["APR 2026", "GEN AI", "HYREGO.COM"],
    accent: "#0284c7",
    image: hyregoLanding,
    logo: hyregoLogo,
    stack: ["AWS", "Redis", "React.js", "Node.js", "Express.js", "MongoDB", "Fireworks AI"],
    links: { github: "https://github.com/vixxk/AIJobPortal", live: "https://hyrego.com/" },
    points: [
      "Integrated Redis caching layer for job search results, reducing latency and third-party API costs by 20%.",
      "Engineered AI Mock Interviews, Spoken English Tutor, and Job Posting modules powered by Fireworks AI (Qwen3-8B)."
    ]
  },
  {
    id: "mingo",
    title: "MINGO\nTALK PRIVATELY",
    subtitle: "Full-Stack Mobile Developer",
    credit: "FREELANCE",
    meta: ["MAY 2026", "REACT NATIVE", "ZEGOCLOUD"],
    accent: "#ea580c",
    image: mingoLanding,
    logo: mingoLogo,
    stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "ZEGOCloud", "Socket.IO"],
    links: { github: "https://github.com/vixxk/Mingo", live: "https://github.com/vixxk/Mingo" },
    points: [
      "Developed multi-engine real-time calling using ZEGOCloud and Agora RTC SDKs with state-driven session management.",
      "Engineered anonymous peer matching backed by Redis caching, OneSignal push notifications, and account deletion governance."
    ]
  },
  {
    id: "fantrio",
    title: "FANTRIO\nCREATOR SOCIAL PLATFORM",
    subtitle: "Full-Stack Developer",
    credit: "FREELANCE",
    meta: ["JUL 2026", "AGORA RTC", "SOCKET.IO"],
    accent: "#7c3aed",
    image: fantrioLanding,
    logo: fantrioLogo,
    stack: ["React", "Node.js", "Express", "MongoDB", "Agora RTC SDK", "Socket.IO", "AWS S3"],
    links: { github: "https://github.com/vixxk/Fantrio", live: "https://fantrio.onrender.com/" },
    points: [
      "Implemented high-concurrency 1:1 video/audio calling and live streaming channels using Agora RTC SDK with token access control.",
      "Architected full creator monetization featuring PPV content unlocking, dynamic coin wallet system, and real-time chat."
    ]
  },
  {
    id: "puja3d",
    title: "PUJA3D\n360° & VR FESTIVAL PLATFORM",
    subtitle: "Full-Stack / Web3D Developer",
    credit: "FREELANCE",
    meta: ["AUG 2026", "THREE.JS", "WEBGL"],
    accent: "#db2777",
    image: puja3dLanding,
    logo: puja3dLogo,
    stack: ["React", "Three.js", "Pannellum.js", "WebGL", "Vite", "Tailwind CSS", "Node.js"],
    links: { github: "https://github.com/vixxk/rudhvi3d", live: "https://threedtrial.onrender.com/" },
    points: [
      "Engineered a WebGL-powered 360° panorama viewing pipeline with dynamic hotspot navigation using Pannellum.js and Three.js.",
      "Built a high-performance web client rendering immersive virtual festival environments and custom 3D spatial experiences."
    ]
  },
  {
    id: "starpix",
    title: "STARPIX\nAI CONTENT & STATUS STUDIO",
    subtitle: "Full-Stack Mobile & AI Developer",
    credit: "FREELANCE",
    meta: ["AUG 2026", "MULTI-LINGUAL", "EXPO"],
    accent: "#2563eb",
    image: starpixLanding,
    logo: starpixLogo,
    stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "AWS S3", "i18next"],
    links: { github: "https://github.com/vixxk/Starpix", live: null },
    points: [
      "Implemented complete multi-language localization (i18next) across all screens and dynamic status card templates.",
      "Optimized mobile image processing and AI uploads using native expo-file-system streams to AWS S3, eliminating timeouts."
    ]
  }
];
