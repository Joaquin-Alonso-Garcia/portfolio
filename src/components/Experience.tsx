interface Job {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export const Experience = () => {
  const jobs: Job[] = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Leading the frontend team, migrating legacy code to React, and improving performance by 40%.'
    },
    {
      id: 2,
      role: 'Software Engineer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Developed full-stack features using Node.js and React. Implemented real-time features using WebSockets.'
    }
  ]
  return (
    <section id="experience" className="py-20">
      <div className="space-y-12">
        {jobs.map((job) => (
          <div key={job.id} className="relative border-1-2 border-gray-200 dark:border-zinc-700 pl-8 pb-2">
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 w-4 rounded-full bg-blue-600" />

            <h3 className="text-xl font-bold">{job.role}</h3>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <span className="font-medium">{job.company}</span>
              <span>•</span>
              <span className="text-sm">{job.period}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}; 