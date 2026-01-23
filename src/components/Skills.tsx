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
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
        <div className="space-y-10">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4 capitalize text-gray-700 dark:text-gray-300">
                {category}
              </h3>
              
              {/* Badge Grid */}
              <div className="flex flex-wrap gap-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-700 px-4 py-3 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                  >
                    {/* Skill Badge Content */}
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      {skill.icon_url && (
                        <img 
                          src={skill.icon_url} 
                          alt={skill.name}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      
                      {/* Skill Name */}
                      <span className="font-medium text-sm whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                    {/* Proficiency Bubbles */}
                    <div className="flex gap-1 mt-2 justify-center">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            level <= skill.proficiency_level
                              ? 'bg-blue-600'
                              : 'bg-gray-300 dark:bg-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Tooltip on hover (optional) */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {getProficiencyLabel(skill.proficiency_level)}
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