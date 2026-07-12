import { resumeData } from '../../../data/resume';
import { StatsBar } from './StatsBar';
import { ContactGrid } from './ContactGrid';
import './Contact.css';

export const Contact = () => {
    const { personalInfo } = resumeData;

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <StatsBar stats={personalInfo.stats} />
                <ContactGrid personalInfo={personalInfo} />
            </div>
        </section>
    );
};
