import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import type { Experience as ExperienceType } from '../types';

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('start_date', { ascending: false });

        if (error) throw error;

        setExperiences(data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="max-2-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20">
        <div className="max-2-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <p className="text-gray-600 dark:text-gray-400">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>

        <div className="space-y-12">
          {experiences.map((experience) => (
            <div key={experience.id} className="relative border-l-2 border-gray-200 dark:border-zinc-700 pl-8 pb-2">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>

              <h3 className="text-xl font-bold">{experience.position}</h3>

              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                {experience.company_url ? (
                  <a 
                    href={experience.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-blue-600 transiton-colors"
                  >
                    {experience.company}
                  </a>
                ) : (
                  <span className="font-medium">{experience.company}</span>
                )}

                {experience.location && (
                  <>
                    <span>•</span>
                    <span className="text-sm">{experience.location}</span>
                  </>
                )}
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : formatDate(experience.end_date)}
              </div>

              {experience.description && (
                <p className="text-gray-600 dartk:text-gray-400">
                  {experience.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function formatDate(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}