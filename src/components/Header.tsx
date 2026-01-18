import { useState, useEffect } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about'},
    { name: 'Experience', href: '#experience'},
    { name: 'Projects', href: '#projects'},
    { name: 'Skills', href: '#skills'},
    { name: 'Contact', href: '#contact'}
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-zinc-900/80' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tighter">Portfolio.</a>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              href={link.href} 
              key={link.name} 
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};