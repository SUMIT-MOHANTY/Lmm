import React from 'react';
import { motion } from 'framer-motion';
import styles from './EducationSection.module.css';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function EducationSection({ education }) {
  if (!education?.length) return null;
  const sorted = [...education].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
  return (
    <section className={styles.educationSection}>
      <h2 className={styles.sectionTitle}>Education</h2>
      <div className={styles.educationList}>
        {sorted.map((edu, idx) => (
          <motion.div
            key={edu.id}
            className={styles.educationCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className={styles.institution}>{edu.institution}</h3>
            <p className={styles.degree}>
              {edu.degree}
              {edu.gpa && <span className={styles.gpa}>GPA: {edu.gpa}</span>}
            </p>
            <p className={styles.field}>{edu.field_of_study}</p>
            <p className={styles.dates}>
              {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
            </p>
            {edu.achievements?.length > 0 && (
              <ul className={styles.achievements}>
                {edu.achievements.map((ach, i) => (
                  <li key={i} className={styles.achievement}>{ach}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
