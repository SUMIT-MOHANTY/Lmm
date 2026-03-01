import React from 'react';
import { motion } from 'framer-motion';
import styles from './ExperienceTimeline.module.css';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function ExperienceTimeline({ experiences }) {
  if (!experiences?.length) return null;
  const sorted = [...experiences].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
  return (
    <section className={styles.timelineSection}>
      <h2 className={styles.sectionTitle}>Work Experience</h2>
      <div className={styles.timeline}>
        {sorted.map((exp, idx) => (
          <motion.div
            key={exp.id}
            className={`${styles.timelineItem} ${exp.is_current ? styles.currentJob : ''}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className={styles.company}>{exp.company}
              {exp.is_current && <span className={styles.currentBadge}>Current</span>}
            </h3>
            <p className={styles.role}>{exp.role}</p>
            <p className={styles.dates}>
              {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date)}
            </p>
            {exp.location && <p className={styles.location}>{exp.location}</p>}
            {exp.description && <p className={styles.description}>{exp.description}</p>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
