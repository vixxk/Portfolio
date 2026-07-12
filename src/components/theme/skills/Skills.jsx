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
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4]
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
            [0, 1],
            [0, 2],
            [1, 2],
            [2, 3],
            [3, 7],
            [5, 7],
            [3, 5],
            [4, 5],
            [2, 6],
            [5, 6]
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
            [0, 1],
            [0, 2],
            [0, 6],
            [1, 3],
            [1, 5],
            [1, 6],
            [2, 4],
            [2, 6],
            [3, 4]
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
            [1, 2],
            [0, 2],
            [0, 3],
            [2, 3]
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
            [1, 3],
            [2, 8],
            [0, 8],
            [0, 5],
            [5, 8],
            [3, 4],
            [3, 6],
            [3, 7],
            [6, 7]
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
