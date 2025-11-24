export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-zinc-800/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>

        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p className="text-lg leading-relaxed mb-6">
            I am a passionate developer with a keen eye for detail and a drive for creating
            seamless digital experiences. My journey in tech started with...
            [You can add your personal story here]
          </p>

          <p className="text-lg leading-relaxed mb-6">
            When I'm not coding, you can find me...
            [Add hobbies or interests]
          </p>
        </div>
      </div>
    </section>
  );
};