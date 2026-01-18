import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import type { Project } from '../types';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProjects(data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-zing-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Projects</h2>
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.id} className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transiton-shadow duration-300">
              {/* Project Image */}
              {project.image_url && (
                <div className="aspect-video bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                  <img 
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold md-2">{project.title}</h3>

                {/* Description */}
                {project.description && (
                  <p className="text-gray-600 dark:text-gra-400 bg-4 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack */}
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4">
                  {project.github_url && (
                    <a 
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="test-sm font-medoum text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      GitHub →
                    </a>
                  )}

                  {project.live_url && (
                    <a 
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="test-sm font-medoum text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No projects to display yet.
          </p>
        )}
      </div>
    </section>
  );
};