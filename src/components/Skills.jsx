import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { useTheme } from '../context/ThemeContext';
import { ChessSkills } from './chess/ChessSkills';
import './Skills.css';

const SkillCategory = ({ title, skills, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="card skill-card group"
        >
            <h3 className="skill-title group-hover-text-primary">{title}</h3>
            <div className="skill-tags">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="skill-tag"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export const Skills = () => {
    const { skills } = resumeData;
    const { theme } = useTheme();

    if (theme === 'chess') {
        return <ChessSkills />;
    }

    const categories = [
        { title: 'Languages', data: skills.languages },
        { title: 'Web Technologies', data: skills.web },
        { title: 'AI & GenAI', data: skills.ai },
        { title: 'Databases', data: skills.database },
        { title: 'Tools & DevOps', data: skills.tools },
    ];

    return (
        <section id="skills" className="section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-header"
            >
                <h2 className="text-3xl font-display font-bold mb-4">Technical <span className="text-primary">Arsenal</span></h2>
                <div className="section-line"></div>
            </motion.div>

            <div className="grid-responsive">
                {categories.map((cat, idx) => (
                    <SkillCategory key={cat.title} title={cat.title} skills={cat.data} index={idx} />
                ))}
            </div>
        </section>
    );
};
