import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Initialize the theme based on localStorage or default to dark mode (false)
  const [isLightMode, setIsLightMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'light' : false;
  });

  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  return (
    // When light mode is off, add "dark text-white" to force white text.
    <div className={`${isLightMode ? 'light' : 'dark text-white'}`}>
      <Header isLightMode={isLightMode} toggleLightMode={toggleLightMode} />
      <main>
        <Skills isLightMode={isLightMode} />
        <Projects isLightMode={isLightMode} />
        <Contact isLightMode={isLightMode} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
