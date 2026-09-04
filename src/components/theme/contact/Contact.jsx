import { resumeData } from '../../../data/resume';
import { StatsBar } from './StatsBar';
import { ContactGrid } from './ContactGrid';
import { FooterBigName } from './FooterBigName';
import './Contact.css';

export const Contact = () => {
    const { personalInfo } = resumeData;

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <StatsBar stats={personalInfo.stats} personalInfo={personalInfo} />
                <ContactGrid personalInfo={personalInfo} />
            </div>
            <FooterBigName name={personalInfo.name} />
        </section>
    );
};
