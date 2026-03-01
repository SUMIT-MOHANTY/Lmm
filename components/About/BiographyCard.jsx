import React from 'react';
import { motion } from 'framer-motion';
import styles from './BiographyCard.module.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BiographyCard({ data }) {
  if (!data) return null;
  return (
    <motion.div
      className={styles.bioCard}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={data.avatar_url || '/default-avatar.png'}
        alt={data.name}
        className={styles.avatar}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.h2 className={styles.name} variants={item}>{data.name}</motion.h2>
      <motion.p className={styles.title} variants={item}>{data.title}</motion.p>
      <motion.p className={styles.bio} variants={item}>{data.bio}</motion.p>
      {(data.email || data.location) && (
        <motion.div className={styles.contactInfo} variants={container}>
          {data.email && (
            <span className={styles.contactItem}>✉️ {data.email}</span>
          )}
          {data.location && (
            <span className={styles.contactItem}>📍 {data.location}</span>
          )}
        </motion.div>
      )}
      {data.social_links?.length > 0 && (
        <motion.div className={styles.socialLinks} variants={container}>
          {data.social_links.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              {link.platform.charAt(0).toUpperCase()}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
