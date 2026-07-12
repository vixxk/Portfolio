import { FileCode, Braces } from 'lucide-react';

export const ProjectTabs = ({ activeTab, setActiveTab, projectFile, stackFile }) => {
    return (
        <div className="ide-tabs">
            {/* Project Description Tab */}
            <button 
                className={`ide-tab ${activeTab === 'project' ? 'active' : 'clickable'}`}
                onClick={() => setActiveTab('project')}
                aria-label="View Project Description"
            >
                <FileCode size={12} className={`ide-tab-icon ${activeTab === 'project' ? 'active' : ''}`} />
                <span>{projectFile}</span>
            </button>
            
            {/* Tech Stack Tab */}
            <button 
                className={`ide-tab ${activeTab === 'stack' ? 'active' : 'clickable'}`}
                onClick={() => setActiveTab('stack')}
                aria-label="View Tech Stack"
            >
                <Braces size={12} className={`ide-tab-icon ${activeTab === 'stack' ? 'active' : ''}`} />
                <span>{stackFile}</span>
            </button>
        </div>
    );
};
