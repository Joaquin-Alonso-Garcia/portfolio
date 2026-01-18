import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import type { Skill } from '../types';

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('category', { ascending: true })
          .order('proficiency_level', { ascending: false });

        if (error) throw error;

        setSkills(data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);

    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Skills</h2>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Skills</h2>
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Skills</h2>

        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
              
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {skill.icon_url && (
                          <img 
                            src={skill.icon_url} 
                            alt={skill.name}
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <span className="font-medium">{skill.name}</span>
                      </div>

                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {getProficiencyLabel(skill.proficiency_level)}
                      </span>
                    </div>
                    {/* Proficiency Bar */}
                    <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {skills.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No skills to display yet.
          </p>
        )}
      </div>
    </section>
  );
};

function getProficiencyLabel(level: number): string {
  const labels = {
    1: 'Beginner',
    2: 'Elementary',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  };

  return labels[level as keyof typeof labels] || 'Unknown';
}