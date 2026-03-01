import React from 'react';
import { motion } from 'framer-motion';
import BiographyCard from './BiographyCard';
import SkillsSection from './SkillsSection';
import ExperienceTimeline from './ExperienceTimeline';
import EducationSection from './EducationSection';
import { useAboutData } from '../../hooks/useAboutData';

const pageStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'var(--color-background-page, #F9FAFB)',
    minHeight: '100vh'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
    marginTop: '24px'
  },
  fullWidth: {
    marginTop: '24px'
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '1.125rem',
    color: 'var(--color-text-secondary, #4B5563)'
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    color: '#EF4444',
    background: '#FEF2F2',
    borderRadius: '12px'
  }
};

export default function About() {
  const { biography, skills, experience, education, loading, error } = useAboutData();

  if (loading) {
    return <div style={pageStyles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={pageStyles.error}>Error: {error}</div>;
  }

  return (
    <motion.div
      style={pageStyles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BiographyCard data={biography} />
      <div style={pageStyles.grid}>
        <SkillsSection skills={skills} />
        <ExperienceTimeline experiences={experience} />
      </div>
      <div style={pageStyles.fullWidth}>
        <EducationSection education={education} />
      </div>
    </motion.div>
  );
}
