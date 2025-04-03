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
            className="relative border-t-8 transition-all duration-500 bg-cover min-h-screen overflow-x-hidden"
        >
            <div className="relative w-11/12 sm:w-4/5 mx-auto flex flex-col items-center py-12">
                <h2
                    className={`text-4xl font-mono font-bold drop-shadow-lg ${isLightMode ? 'text-gray-900 underline decoration-gray-700' : 'text-white'}`}
                >
                    {'<SKILLS />'}
                </h2>
                <button
                    onClick={handleUnlock}
                    className="mt-6 px-6 py-3 rounded-lg transition-all duration-300 font-bold font-mono shadow-2xl transform hover:scale-110"
                    style={{
                        backgroundColor: isLightMode ? '#f3f4f6' : '#1f2937',
                        border: isLightMode ? '1px solid #d1d5db' : '1px solid #374151',
                        color: isLightMode ? '#16a34a' : '#4ade80'
                    }}
                >
                    {unlockedCategoryCount < categoryOrder.length
                        ? '<unlock skills/>'
                        : '<lock skills/>'}
                </button>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-8 px-4 py-12">
                {unlockedCategories.map((category) => (
                    <div
                        key={category}
                        className={`p-4 border rounded-lg shadow-lg transition-all duration-300 ${isLightMode ? 'bg-white/80 border-gray-300' : 'bg-gray-800 border-gray-700'}`}
                    >
                        <h3 className={`text-xl font-bold mb-4 font-mono ${isLightMode ? 'text-black' : 'text-white'}`}>
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {groupedSkills[category].map((skill, i) => (
                                <div
                                    key={i}
                                    className="relative group flex flex-col items-center cursor-pointer w-24 text-center"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <i
                                        className={`${skill.icon} text-4xl md:text-6xl transition-all ${i % 2 === 0 ? 'animate-flyInLeft' : 'animate-flyInRight'} ${isLightMode ? 'text-black shadow-[0_0_10px_rgba(0,0,0,0.3)]' : 'text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'}`}
                                    ></i>
                                    <span className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs font-mono rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none max-w-[150px] whitespace-normal z-50">
                                        {skill.description}
                                    </span>
                                    <h4 className={`mt-2 font-mono text-sm ${isLightMode ? 'text-black' : 'text-white'}`}>
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
                    transform: translateX(-100vw) rotate(-30deg) scale(0.5);
                    opacity: 0;
                  }
                  50% {
                    transform: translateX(10vw) rotate(10deg) scale(1.1);
                    opacity: 0.8;
                  }
                  100% {
                    transform: translateX(0) rotate(0deg) scale(1);
                    opacity: 1;
                  }
                }
                @keyframes flyInRight {
                  0% {
                    transform: translateX(100vw) rotate(30deg) scale(0.5);
                    opacity: 0;
                  }
                  50% {
                    transform: translateX(-10vw) rotate(-10deg) scale(1.1);
                    opacity: 0.8;
                  }
                  100% {
                    transform: translateX(0) rotate(0deg) scale(1);
                    opacity: 1;
                  }
                }
                .animate-flyInLeft {
                  animation: flyInLeft 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
                .animate-flyInRight {
                  animation: flyInRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
            `}</style>
        </section>
    );
};

export default Skills;
