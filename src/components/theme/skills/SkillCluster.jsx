import { useState } from 'react';
import { motion } from 'framer-motion';

export const SkillCluster = ({ title, nodes, edges, index }) => {
    const [hoveredNodeIndex, setHoveredNodeIndex] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="skill-cluster"
        >
            <h3 className="cluster-label">{title}</h3>
            
            <div className="cluster-container">
                {/* SVG Connections/Edges */}
                <svg className="cluster-svg">
                    {edges.map((edge, idx) => {
                        const n1 = nodes[edge[0]];
                        const n2 = nodes[edge[1]];
                        if (!n1 || !n2) return null;
                        
                        const isHighlighted = hoveredNodeIndex !== null && 
                            (edge[0] === hoveredNodeIndex || edge[1] === hoveredNodeIndex);
                        
                        return (
                            <line
                                key={idx}
                                x1={`${n1.x}%`}
                                y1={`${n1.y}%`}
                                x2={`${n2.x}%`}
                                y2={`${n2.y}%`}
                                className={`cluster-edge ${isHighlighted ? 'active' : ''}`}
                            />
                        );
                    })}
                </svg>

                {/* Interactive Skill Nodes */}
                {nodes.map((node, idx) => {
                    const isHovered = hoveredNodeIndex === idx;
                    const isOtherHovered = hoveredNodeIndex !== null && hoveredNodeIndex !== idx;
                    
                    return (
                        <button
                            key={node.name}
                            className={`skill-node-btn ${isHovered ? 'active' : ''} ${isOtherHovered ? 'dimmed' : ''}`}
                            style={{
                                top: `${node.y}%`,
                                left: `${node.x}%`,
                            }}
                            onMouseEnter={() => setHoveredNodeIndex(idx)}
                            onMouseLeave={() => setHoveredNodeIndex(null)}
                        >
                            <span className="node-indicator"></span>
                            <span className="node-name">{node.name}</span>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};
