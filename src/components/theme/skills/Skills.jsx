import { motion } from 'framer-motion';
import { SkillCluster } from './SkillCluster';
import './Skills.css';

const clustersData = {
    languages: {
        title: '// languages',
        nodes: [
            { name: 'C', x: 20, y: 70 },
            { name: 'C++', x: 25, y: 30 },
            { name: 'Python', x: 50, y: 50 },
            { name: 'JavaScript', x: 75, y: 30 },
            { name: 'TypeScript', x: 80, y: 70 }
        ],
        edges: [
            [0, 1], // C <-> C++ (Systems programming evolution)
            [0, 2], // C <-> Python (CPython engine & low-level internals)
            [1, 2], // C++ <-> Python (Native extensions, CUDA & tensor acceleration)
            [2, 3], // Python <-> JavaScript (Full-stack scripting & dynamic development)
            [2, 4], // Python <-> TypeScript (Modern AI full-stack: Python API & TS client)
            [3, 4]  // JavaScript <-> TypeScript (Typed superset of JavaScript)
        ]
    },
    web: {
        title: '// web_technologies',
        nodes: [
            { name: 'HTML', x: 18, y: 70 },
            { name: 'CSS', x: 18, y: 30 },
            { name: 'React.js', x: 42, y: 25 },
            { name: 'Next.js', x: 72, y: 25 },
            { name: 'Express.js', x: 82, y: 70 },
            { name: 'Node.js', x: 58, y: 75 },
            { name: 'Socket.IO', x: 32, y: 55 },
            { name: 'FastAPI', x: 68, y: 50 }
        ],
        edges: [
            [0, 1], // HTML <-> CSS (Core web markup & styling)
            [0, 2], // HTML <-> React.js (JSX DOM rendering)
            [1, 2], // CSS <-> React.js (Component styling)
            [2, 3], // React.js <-> Next.js (Next.js is the React production framework)
            [2, 6], // React.js <-> Socket.IO (Client real-time WebSocket connection)
            [5, 6], // Node.js <-> Socket.IO (Server-side real-time engine)
            [4, 5], // Express.js <-> Node.js (Express server running on Node.js runtime)
            [3, 7], // Next.js <-> FastAPI (Next.js frontend consuming FastAPI backend)
            [2, 7]  // React.js <-> FastAPI (React SPA consuming FastAPI backend)
        ]
    },
    ai: {
        title: '// ai_&_genai',
        nodes: [
            { name: 'Generative AI', x: 22, y: 30 },
            { name: 'RAG', x: 50, y: 20 },
            { name: 'Agentic AI', x: 78, y: 30 },
            { name: 'LangChain', x: 40, y: 52 },
            { name: 'LangGraph', x: 75, y: 55 },
            { name: 'Ragas', x: 50, y: 80 },
            { name: 'Fireworks AI', x: 22, y: 70 }
        ],
        edges: [
            [0, 1], // Generative AI <-> RAG (Core GenAI retrieval pattern)
            [0, 2], // Generative AI <-> Agentic AI (Core GenAI autonomous agent pattern)
            [0, 6], // Generative AI <-> Fireworks AI (LLM inference provider for GenAI)
            [1, 3], // RAG <-> LangChain (LangChain builds retrieval chains & vector pipelines)
            [1, 5], // RAG <-> Ragas (Ragas evaluates RAG pipeline accuracy & faithfulness)
            [2, 4], // Agentic AI <-> LangGraph (LangGraph orchestrates multi-agent systems)
            [3, 4], // LangChain <-> LangGraph (LangGraph extends LangChain for cyclical agent graphs)
            [3, 5], // LangChain <-> Ragas (Ragas evaluates LangChain RAG pipelines & datasets)
            [3, 6]  // LangChain <-> Fireworks AI (LangChain integrates Fireworks AI for model inference)
        ]
    },
    database: {
        title: '// databases',
        nodes: [
            { name: 'MongoDB', x: 22, y: 32 },
            { name: 'MySQL', x: 28, y: 72 },
            { name: 'PostgreSQL', x: 72, y: 72 },
            { name: 'Qdrant (vector)', x: 78, y: 32 }
        ],
        edges: [
            [0, 1], // MongoDB <-> MySQL (NoSQL Document vs SQL Relational paradigms)
            [1, 2], // MySQL <-> PostgreSQL (Open-source Relational SQL databases)
            [0, 2], // MongoDB <-> PostgreSQL (Primary general-purpose app databases)
            [2, 3], // PostgreSQL <-> Qdrant (vector) (Relational metadata + Vector search in AI/RAG)
            [0, 3]  // MongoDB <-> Qdrant (vector) (Document store + Vector search)
        ]
    },
    tools: {
        title: '// tools_&_devops',
        nodes: [
            { name: 'AWS', x: 50, y: 18 },
            { name: 'Git', x: 18, y: 35 },
            { name: 'Linux', x: 20, y: 75 },
            { name: 'VS Code', x: 48, y: 82 },
            { name: 'Postman', x: 80, y: 75 },
            { name: 'Redis', x: 82, y: 35 },
            { name: 'Tailwind', x: 32, y: 46 },
            { name: 'ShadCN', x: 68, y: 46 },
            { name: 'Docker', x: 50, y: 64 }
        ],
        edges: [
            [1, 2], // Git <-> Linux (Git version control on Linux terminal environment)
            [2, 3], // Linux <-> VS Code (Linux / WSL developer workstation powering VS Code)
            [2, 8], // Linux <-> Docker (Docker containers run natively on the Linux kernel)
            [0, 8], // AWS <-> Docker (Deploying Docker containerized apps to AWS ECS/EC2)
            [0, 5], // AWS <-> Redis (AWS ElastiCache / cloud-managed Redis caching)
            [5, 8], // Redis <-> Docker (Containerized Redis instance in local & production stacks)
            [3, 8], // VS Code <-> Docker (VS Code Docker extension & Dev Containers)
            [3, 4], // VS Code <-> Postman (Developing API endpoints in VS Code & testing with Postman)
            [4, 8], // Postman <-> Docker (Postman testing containerized API microservices)
            [6, 7], // Tailwind <-> ShadCN (ShadCN UI components built on Tailwind CSS)
            [3, 6]  // VS Code <-> Tailwind (VS Code Tailwind CSS IntelliSense & styling workflow)
        ]
    }
};

export const Skills = () => {
    const categories = Object.keys(clustersData).map((key, idx) => ({
        key,
        ...clustersData[key],
        index: idx
    }));

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <span className="section-eyebrow">// retrieve_capabilities</span>
                    <h2 className="text-3xl font-display font-bold">
                        Technical <span className="text-gradient">Space</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="skills-clusters-grid">
                    {categories.map((cat) => (
                        <SkillCluster
                            key={cat.key}
                            title={cat.title}
                            nodes={cat.nodes}
                            edges={cat.edges}
                            index={cat.index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
