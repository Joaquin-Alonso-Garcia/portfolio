export const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Building digital <br />
          <span className="text-blue-600">experiences</span> that matter.
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          I'm a software developer specializing in building exceptional digital experiences.
          Currently focused on React, TypeScript, and modern web technologies.
        </p>

        <div className="flex gap-4 justify-center">
          <a 
            href="#projects" 
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            View Work  
          </a>

          <a 
            href="#contact"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Let's Chat
          </a>
        </div>
      </div>
    </section>
  );
};