export const ProjectStack = ({ stackFile, title, stack }) => {
    return (
        <>
            {/* Terminal prompt line */}
            <div className="ide-terminal-prompt">
                <span className="terminal-prefix">vivek@retrieval:~$</span>
                <span className="terminal-command">cat {stackFile} --format=pretty</span>
            </div>

            {/* Date output */}
            <div className="ide-console-date">
                [System Log: JSON Decoded successfully]
            </div>

            {/* Styled JSON representation of Tech Stack */}
            <div className="ide-json-container">
                <div className="json-line"><span className="json-brace">&#123;</span></div>
                <div className="json-line indent-1">
                    <span className="json-key">"project"</span>: <span className="json-value">"{title}"</span>,
                </div>
                <div className="json-line indent-1">
                    <span className="json-key">"environment"</span>: <span className="json-value">"production"</span>,
                </div>
                <div className="json-line indent-1">
                    <span className="json-key">"dependencies"</span>: <span className="json-brace">[</span>
                </div>
                {stack.map((tech, idx) => (
                    <div key={tech} className="json-line indent-2">
                        <span className="json-string">"{tech}"</span>
                        {idx < stack.length - 1 ? ',' : ''}
                    </div>
                ))}
                <div className="json-line indent-1">
                    <span className="json-brace">]</span>
                </div>
                <div className="json-line"><span className="json-brace">&#125;</span></div>
            </div>
        </>
    );
};
