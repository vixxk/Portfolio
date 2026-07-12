import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectTabs } from './ProjectTabs';
import { ProjectConsole } from './ProjectConsole';
import { ProjectStack } from './ProjectStack';

export const ProjectCard = ({ project, index }) => {
    const [activeTab, setActiveTab] = useState('project');

    const tabData = {
        projectFile: 'readme.md',
        stackFile: 'deps.json'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="ide-window"
        >
            {/* IDE/Terminal Window Chrome */}
            <div className="ide-header">
                <ProjectTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    projectFile={tabData.projectFile}
                    stackFile={tabData.stackFile}
                />

                {/* Window Actions (Links) */}
                <div className="ide-actions">
                    <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ide-action-btn"
                        title="Open GitHub Repository"
                    >
                        <Github size={13} />
                    </a>
                    <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ide-action-btn"
                        title="Launch Live Application"
                    >
                        <ExternalLink size={13} />
                    </a>
                </div>
            </div>

            {/* Window Content / Terminal Output */}
            <div className="ide-body">
                {activeTab === 'project' ? (
                    <ProjectConsole
                        projectFile={tabData.projectFile}
                        date={project.date}
                        points={project.points}
                    />
                ) : (
                    <ProjectStack
                        stackFile={tabData.stackFile}
                        title={project.title}
                        stack={project.stack}
                    />
                )}
            </div>
        </motion.div>
    );
};
