import { useState, useEffect } from 'react';

export function useAboutData() {
  const [biography, setBiography] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bioRes, skillsRes, expRes, eduRes] = await Promise.all([
        fetch('/api/about'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/education')
      ]);
      const [bioData, skillsData, expData, eduData] = await Promise.all([
        bioRes.json(),
        skillsRes.json(),
        expRes.json(),
        eduRes.json()
      ]);
      setBiography(bioData.data || bioData);
      setSkills(skillsData.data || skillsData);
      setExperience(expData.data || expData);
      setEducation(eduData.data || eduData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return { biography, skills, experience, education, loading, error, refetch: fetchData };
}
