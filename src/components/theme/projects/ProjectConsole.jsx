export const ProjectConsole = ({ projectFile, date, points }) => {
    return (
        <>
            {/* Terminal prompt line */}
            <div className="ide-terminal-prompt">
                <span className="terminal-prefix">vivek@retrieval:~$</span>
                <span className="terminal-command">cat {projectFile} --verbose</span>
            </div>

            {/* Date output */}
            <div className="ide-console-date">
                [System Log: Compiled {date.toUpperCase()}]
            </div>

            {/* Description Outputs */}
            <div className="ide-console-output">
                {points.map((point, idx) => (
                    <div key={idx} className="ide-output-line">
                        <span className="ide-output-bullet">stdout &gt;</span>
                        <p className="ide-output-text">{point}</p>
                    </div>
                ))}
            </div>
        </>
    );
};
