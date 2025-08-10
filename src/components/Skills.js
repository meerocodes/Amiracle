import React, { useState, useRef } from 'react';
// Import the new background images
import LightSectionBg from '../assets/lightMode/lightSectionImage2.webp';
import DarkSectionBg from '../assets/darkmode/sectionImage2.webp';

const Skills = ({ isLightMode }) => {
    const sectionRef = useRef(null);

    const groupedSkills = {
        "Tech": [
            { icon: 'fa-brands fa-git-alt', label: 'GIT', description: 'Version control is my superpower.' },
            { icon: 'fa-brands fa-react', label: 'REACT.js', description: 'Building dynamic UIs with React.' },
            { icon: 'fa-brands fa-square-js', label: 'JAVASCRIPT ES6', description: 'Modern JavaScript for modern apps.' },
            { icon: 'fa-solid fa-network-wired', label: 'RESTful APIs', description: 'Robust API integrations.' },
            { icon: 'fa-brands fa-python', label: 'PYTHON', description: 'Automation and data crunching.' },
            { icon: 'fa-solid fa-database', label: 'FIREBASE', description: 'Real-time databases and hosting.' }
        ],
        "UX/UI": [
            { icon: 'fa-brands fa-html5', label: 'HTML5', description: 'The backbone of every web page.' },
            { icon: 'fa-brands fa-css3-alt', label: 'CSS3', description: 'Designing sleek, responsive interfaces.' },
            { icon: 'fa-solid fa-pen-nib', label: 'GRAPHIC DESIGNER', description: 'Creative graphic design and visual communication.' },
            { icon: 'fa-brands fa-sass', label: 'SASS', description: 'Efficient, modular CSS with SASS.' },
            { icon: 'fa-solid fa-mobile', label: 'RESPONSIVE DESIGN', description: 'Seamless experience on every device.' },
            { icon: 'fa-solid fa-universal-access', label: 'ACCESSIBILITY', description: 'Inclusive design for all.' }
        ],
        "Tools": [
            { icon: 'fa-solid fa-cloud', label: 'ADOBE CC', description: 'Creative solutions using Adobe suite.' },
            { icon: 'fa-brands fa-shopify', label: 'SHOPIFY', description: 'E-commerce store building and management.' },
            { icon: 'fa-solid fa-chart-simple', label: 'SOCIAL MEDIA ANALYTICS', description: 'Data-driven social media strategy.' },
            { icon: 'fa-solid fa-microchip', label: 'AI LITERATE', description: 'Understanding and leveraging AI technologies.' }
        ],
        "Soft Skills": [
            { icon: 'fa-solid fa-users-rays', label: 'TEAM COLLABORATION', description: 'Effective collaboration and teamwork.' },
            { icon: 'fa-solid fa-ship', label: 'PRODUCT MANAGEMENT', description: 'Leading product strategy and execution.' }
        ]
    };

    const categoryOrder = ["Tech", "UX/UI", "Tools", "Soft Skills"];
    const [unlockedCategoryCount, setUnlockedCategoryCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        
        return () => observer.disconnect();
    }, []);

    const handleUnlock = () => {
        if (unlockedCategoryCount < categoryOrder.length) {
            setUnlockedCategoryCount(unlockedCategoryCount + 1);
        } else {
            setUnlockedCategoryCount(0);
        }
    };

    const unlockedCategories = categoryOrder.slice(0, unlockedCategoryCount).reverse();

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                backgroundImage: `url(${isLightMode ? LightSectionBg : DarkSectionBg})`
            }}
            className="relative border-t-8 section-transition bg-cover min-h-screen overflow-x-hidden"
        >
            <div className={`relative w-11/12 sm:w-4/5 mx-auto flex flex-col items-center py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2
                    className={`text-4xl font-mono font-bold drop-shadow-lg mb-4 ${isLightMode ? 'text-gray-900' : 'gradient-text'}`}
                >
                    {'<SKILLS />'}
                </h2>
                <div className={`w-24 h-1 rounded-full mb-8 ${isLightMode ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}></div>
                <button
                    onClick={handleUnlock}
                    className="px-8 py-4 rounded-full btn-modern font-bold font-mono shadow-2xl transform hover:scale-110 pulse-glow relative group"
                    style={{
                        background: isLightMode 
                            ? 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' 
                            : 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: isLightMode ? '2px solid #d1d5db' : '2px solid rgba(255,255,255,0.2)',
                        color: isLightMode ? '#16a34a' : '#ffffff'
                    }}
                >
                    {/* Progress indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {unlockedCategoryCount}/{categoryOrder.length}
                    </div>
                    
                    {unlockedCategoryCount < categoryOrder.length
                        ? '<unlock skills/>'
                        : '<lock skills/>'}
                    
                    {/* Instruction text */}
                    {unlockedCategoryCount > 0 && unlockedCategoryCount < categoryOrder.length && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            <span className={`${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                                Click again to unlock more skills
                            </span>
                        </div>
                    )}
                </button>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-8 px-4 py-12 stagger-animation">
                {unlockedCategories.map((category) => (
                    <div
                        key={category}
                        className={`p-6 transition-all duration-500 rounded-xl card-hover ${isLightMode
                                ? 'glass border-2 border-white/30 shadow-xl'
                                : 'glass-dark border-2 border-white/20 shadow-2xl'
                            } backdrop-blur-lg`}
                    >
                        <h3 className={`text-2xl font-bold mb-6 font-mono flex items-center gap-3 ${isLightMode ? 'text-black' : 'text-white'}`}>
                            <div className={`w-3 h-3 rounded-full ${isLightMode ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}></div>
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-6">
                            {groupedSkills[category].map((skill, i) => (
                                <div
                                    key={i}
                                    className="relative group flex flex-col items-center cursor-pointer w-28 text-center interactive"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <i
                                        className={`${skill.icon} text-5xl md:text-6xl transition-all duration-500 ${i % 2 === 0 ? 'animate-flyInLeft' : 'animate-flyInRight'} ${isLightMode ? 'text-black hover:text-blue-600' : 'text-white hover:text-blue-400'} hover:scale-125 hover:rotate-12`}
                                    ></i>
                                    <span className={`absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 px-3 py-2 text-white text-xs font-mono rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none max-w-[180px] whitespace-normal z-50 shadow-xl ${isLightMode ? 'glass-dark' : 'glass-dark border border-white/20'}`}>
                                        {skill.description}
                                    </span>
                                    <h4 className={`mt-3 font-mono text-sm font-semibold ${isLightMode ? 'text-black' : 'text-white'} group-hover:text-blue-400 transition-colors duration-300`}>
                                        {skill.label}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes flyInLeft {
                  0% {
                    transform: translateX(-100vw) rotate(-360deg) scale(0.3);
                    opacity: 0;
                  }
                  50% {
                    transform: translateX(10vw) rotate(-180deg) scale(1.2);
                    opacity: 0.8;
                  }
                  100% {
                    transform: translateX(0) rotate(0deg) scale(1);
                    opacity: 1;
                  }
                }
                @keyframes flyInRight {
                  0% {
                    transform: translateX(100vw) rotate(360deg) scale(0.3);
                    opacity: 0;
                  }
                  50% {
                    transform: translateX(-10vw) rotate(180deg) scale(1.2);
                    opacity: 0.8;
                  }
                  100% {
                    transform: translateX(0) rotate(0deg) scale(1);
                    opacity: 1;
                  }
                }
                .animate-flyInLeft {
                  animation: flyInLeft 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
                .animate-flyInRight {
                  animation: flyInRight 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
            `}</style>
        </section>
    );
};

export default Skills;
