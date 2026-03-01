import React from 'react';
import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Tools',
  other: 'Other'
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const skillItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function SkillsSection({ skills }) {
  if (!skills?.length) return null;
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});
  return (
    <section className={styles.skillsSection}>
      <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
      {Object.entries(grouped).map(([category, categorySkills], catIdx) => (
        <motion.div
          key={category}
          className={styles.categoryContainer}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: catIdx * 0.15 }}
        >
          <h3 className={styles.categoryTitle}>{categoryLabels[category] || category}</h3>
          <motion.div className={styles.skillsGrid} variants={container}>
            {categorySkills.map((skill) => (
              <motion.div key={skill.id} className={styles.skillCard} variants={skillItem}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.proficiencyBar}>
                  <div className={styles.proficiencyFill} style={{ width: `${skill.proficiency}%` }} />
                </div>
                <div className={styles.proficiencyLabel}>{skill.proficiency}%</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}
