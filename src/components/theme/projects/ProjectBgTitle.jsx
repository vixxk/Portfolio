export const ProjectBgTitle = ({ title, className = '' }) => {
    // Extract main project name before dash or subtitle
    const mainName = (title ? title.split('–')[0].split('-')[0].trim() : '').toUpperCase();

    return (
        <div className={`ide-card-bg-title-container ${className}`}>
            <svg
                viewBox="0 0 500 50"
                width="100%"
                height="100%"
                className="ide-card-bg-title-svg"
                preserveAspectRatio="xMidYMid meet"
            >
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="ide-card-bg-title-svg-text"
                >
                    {mainName}
                </text>
            </svg>
        </div>
    );
};
