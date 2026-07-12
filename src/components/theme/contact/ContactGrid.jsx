import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export const ContactGrid = ({ personalInfo }) => {
    return (
        <div className="contact-details-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-header"
            >
                <span className="section-eyebrow">// retrieve_contact</span>
                <h2 className="text-3xl font-display font-bold">
                    Get in <span className="text-gradient">Touch</span>
                </h2>
                <div className="section-line"></div>
            </motion.div>

            <div className="contact-content-grid">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="contact-info-list"
                >
                    <div className="contact-mono-row">
                        <span className="contact-key">EMAIL:</span>
                        <a href={`mailto:${personalInfo.email}`} className="contact-value link-style">
                            {personalInfo.email}
                        </a>
                    </div>
                    <div className="contact-mono-row">
                        <span className="contact-key">PHONE:</span>
                        <span className="contact-value">{personalInfo.phone}</span>
                    </div>
                    <div className="contact-mono-row">
                        <span className="contact-key">LOCATION:</span>
                        <span className="contact-value">{personalInfo.location}</span>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="contact-cta-wrapper"
                >
                    <a 
                        href={`mailto:${personalInfo.email}`} 
                        className="btn contact-cta-btn"
                    >
                        INITIATE_CONNECTION <ExternalLink size={16} />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};
