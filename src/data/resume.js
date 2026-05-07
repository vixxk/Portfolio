import { Code2, Globe, Database, Server, Layout, Cpu } from 'lucide-react';

export const resumeData = {
  personalInfo: {
    name: "Vivek Anand",
    title: "Full-Stack Developer",
    email: "vivek.jsx@gmail.com",
    phone: "+91-7352648994",
    location: "Patna, Bihar - 800024, India",
    image: "/WhatsApp Image 2025-12-18 at 6.15.37 PM.jpeg",
    resumeLink: "https://drive.google.com/file/d/1t3m0I_nhIW8AWRtzA9StrU0Srl2ioi9z/view?usp=sharing",
    social: {
      linkedin: "https://www.linkedin.com/in/vivek-anand-a5a455288/",
      github: "https://github.com/vixxk",
      gfg: "https://www.geeksforgeeks.org/profile/vixx",
      leetcode: "https://leetcode.com/u/vivek727anand/"
    },
    stats: {
        leetcode: {
            solved: 250, // Fallback total
            dsa: 180,
            sql: 50,
            profile: "vivek727anand"
        },
        gfg: {
            score: "1600+", // Updated manually
            solved: 450, // Fallback
            rank: 154,    // Fallback
            profile: "vixx"
        },
        github: {
            commits: 600, // Fallback
            repos: 25,    // Fallback
            stars: 25,     // Fallback updated
            username: "vixxk"
        }
    },
    objective: "MERN Stack Developer with strong DSA roots, building scalable web apps and Generative AI systems (RAG & LLMs)."
  },
  education: [
    {
      institution: "Chandigarh University",
      degree: "Bachelor of Engineering",
      year: "2023 - 2027",
      grade: "CGPA: 8.50",
      location: "Mohali, Punjab"
    },
    {
      institution: "St. Albert's High School (ICSE)",
      degree: "Matriculate",
      year: "2019-20",
      grade: "Grade: 95.2%",
      location: "Patna, Bihar"
    }
  ],
  experience: [
    {
      company: "Hyrego - AI Career Assistant (Freelance)",
      role: "Full-Stack GenAI Developer",
      period: "Apr 2026",
      location: "Remote, India",
      stack: ["AWS", "Redis", "React.js", "Node.js", "Express.js", "MongoDB", "Fireworks AI"],
      points: [
        "Integrated Redis-based caching layer for job search results, significantly reducing latency and eliminating redundant third-party API calls, leading to improved performance and cost reduction by 20%.",
        "Implemented core features including AI Mock Interviews, Spoken English Tutor, Job Search & Job Posting modules powered by Fireworks AI (Model - Qwen3-8B).",
        "Deployed a scalable full-stack system using AWS EC2 (backend), AWS S3 (avatars & PDFs) and bunny.net (video storage) ensuring efficient media handling."
      ],
      links: {
        github: "https://github.com/vixxk/AIJobPortal",
        live: "https://hyrego.com/"
      }
    },
    {
      company: "Apni Estate Pvt. Ltd.",
      role: "Product / Full-Stack Development Intern",
      period: "Dec 2025 - Mar 2026",
      location: "Remote, India",
      stack: ["AWS", "React.js", "Express.js", "MongoDB", "ImageKit", "Nodemailer"],
      points: [
        "Designed and developed a role-based real estate & services marketplace from scratch, featuring a responsive, mobile-first UI, secure authentication and integrated email services.",
        "Deployed and managed the backend on AWS EC2 and implemented a CI/CD pipeline for automated builds and production deployments."
      ],
      links: {
        github: "https://github.com/vixxk/Apni_Estate",
        live: "https://www.apniestate.com/"
      }
    }
  ],
  projects: [
    {
      title: "SKINIFY – AI-Powered Frontend Website Cloner",
      stack: ["React.js", "Node.js", "Express", "Gemini AI", "Puppeteer", "Shell Automation"],
      date: "Aug 2025",
      points: [
        "Created an AI-powered frontend cloning system that downloads complete website assets (HTML, CSS, JS, images) and packages them into a unified ZIP for rapid local deployment.",
        "Integrated Gemini AI for keyword-to-URL resolution (94% accuracy) and automated setup via open.sh/open.bat, reducing user onboarding friction by 70%."
      ],
      links: {
          github: "https://github.com/vixxk/Skinify_Frontend_Cloner",
          live: "https://skinify-frontend.onrender.com/"
      }
    },
    {
      title: "HUSHHHHH... – Real-Time Anonymous Chat Application",
      stack: ["React.js", "Node.js", "Express", "Socket.IO", "Prisma", "PostgreSQL", "Cloudinary", "Tailwind CSS"],
      date: "Nov 2025",
      points: [
        "Built a full-stack real-time chat platform with instant messaging, file sharing, typing indicators and zero-auth public/private rooms.",
        "Designed a scalable Express + Socket.IO backend with Prisma ORM, PostgreSQL, Cloudinary media uploads, session persistence via localStorage and automatic room cleanup after 30 minutes of activity."
      ],
       links: {
          github: "https://github.com/vixxk/HUSHHHHH...", 
          live: "https://hushhhhh.onrender.com/"
      }
    },
    {
      title: "KNOWCHAIN – RAG Playground",
      stack: ["React.js", "Node.js", "Express", "LangChain", "Qdrant DB", "Gemini API", "Puppeteer"],
      date: "Jun 2025",
      points: [
        "Engineered a Retrieval-Augmented Generation (RAG) playground enabling conversational Q&A over PDFs, websites, and text sources.",
        "Implemented LangChain pipelines with automatic chunking, Qdrant vector storage, and an Express-based backend using Puppeteer for scraping, uploads, and on-demand vector generation."
      ],
      links: {
          github: "https://github.com/vixxk/KnowChain",
          live: "https://knowchain-zg3z.onrender.com/"
      }
    }
  ],
  skills: {
    languages: ["C", "C++", "JavaScript", "TypeScript"],
    web: ["HTML", "CSS", "React.js", "Node.js", "Next.js", "Express.js", "Socket.IO"],
    ai: ["Generative AI", "RAG", "Agentic AI Systems", "LangChain","Ragas", "Fireworks AI"],
    database: ["MongoDB", "MySQL", "PostgreSQL", "Qdrant"],
    tools: ["AWS", "Git", "Linux", "VS Code", "Postman", "Redis", "Tailwind CSS", "ShadCN", "Docker"]
  }
};
