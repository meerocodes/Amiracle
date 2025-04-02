import React, { useState, useEffect, useCallback, useRef } from 'react';

// Helper function to generate a random number in a range
const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// Generate a unique position (in percentage) that doesn't overlap existing ones
const generateUniquePosition = (existingPositions) => {
    let tries = 0;
    let pos;
    while (tries < 100) {
        const top = randomInRange(20, 80);
        const left = randomInRange(20, 80);
        pos = { top, left };
        const overlap = existingPositions.some(
            (p) => Math.abs(p.top - top) < 15 && Math.abs(p.left - left) < 15
        );
        if (!overlap) return pos;
        tries++;
    }
    return pos;
};

const Skills = ({ isLightMode }) => {
    // Create a ref for the section element
    const sectionRef = useRef(null);

    // Expanded skills array with additional skills using <i> icons
    const skills = [
        { icon: 'fa-brands fa-git-alt', label: 'GIT', description: 'Version control is my superpower.' },
        { icon: 'fa-brands fa-react', label: 'REACT.js', description: 'Building dynamic UIs with React.' },
        { icon: 'fa-brands fa-square-js', label: 'JAVASCRIPT ES6', description: 'Modern JavaScript for modern apps.' },
        { icon: 'fa-brands fa-sass', label: 'SASS', description: 'Efficient, modular CSS with SASS.' },
        { icon: 'fa-brands fa-html5', label: 'HTML5', description: 'The backbone of every web page.' },
        { icon: 'fa-brands fa-css3-alt', label: 'CSS3', description: 'Designing sleek, responsive interfaces.' },
        { icon: 'fa-solid fa-mobile', label: 'RESPONSIVE DESIGN', description: 'Seamless experience on every device.' },
        { icon: 'fa-solid fa-network-wired', label: 'RESTful APIS', description: 'Robust API integrations.' },
        { icon: 'fa-solid fa-cloud', label: 'ADOBE CC', description: 'Creative solutions using Adobe suite.' },
        { icon: 'fa-brands fa-python', label: 'PYTHON', description: 'Automation and data crunching.' },
        { icon: 'fa-solid fa-database', label: 'FIREBASE', description: 'Real-time databases and hosting.' },
        { icon: 'fa-solid fa-universal-access', label: 'ACCESSIBILITY', description: 'Inclusive design for all.' },
        // Additional skills with new icons:
        { icon: 'fa-brands fa-shopify', label: 'SHOPIFY', description: 'E-commerce store building and management.' },
        { icon: 'fa-solid fa-microchip', label: 'AI LITERATE', description: 'Understanding and leveraging AI technologies.' },
        { icon: 'fa-solid fa-pen-nib', label: 'GRAPHIC DESIGNER', description: 'Creative graphic design and visual communication.' },
        { icon: 'fa-solid fa-users-rays', label: 'TEAM COLLABORATION', description: 'Effective collaboration and teamwork.' },
        { icon: 'fa-solid fa-ship', label: 'PRODUCT MANAGEMENT', description: 'Leading product strategy and execution.' },
        { icon: 'fa-solid fa-chart-simple', label: 'SOCIAL MEDIA ANALYTICS', description: 'Data-driven social media strategy.' },
    ];

    const [unlockedSkills, setUnlockedSkills] = useState([]);
    // Track dragging info
    const [draggingSkill, setDraggingSkill] = useState(null);

    const unlockSkill = () => {
        if (unlockedSkills.length >= skills.length) return;
        const usedIndexes = new Set(unlockedSkills.map((s) => s.index));
        const availableIndexes = skills.map((_, i) => i).filter((i) => !usedIndexes.has(i));

        if (availableIndexes.length === 0) return;

        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

        const newPos = generateUniquePosition(unlockedSkills.map((s) => s.position));
        setUnlockedSkills([...unlockedSkills, { index: randomIndex, position: newPos }]);
    };

    const unlockAllSkills = () => {
        const alreadyUnlocked = new Set(unlockedSkills.map((s) => s.index));
        const newUnlocks = [];
        for (let i = 0; i < skills.length; i++) {
            if (!alreadyUnlocked.has(i)) {
                newUnlocks.push({
                    index: i,
                    position: generateUniquePosition([
                        ...unlockedSkills.map((s) => s.position),
                        ...newUnlocks.map((s) => s.position),
                    ]),
                });
            }
        }
        setUnlockedSkills([...unlockedSkills, ...newUnlocks]);
    };

    const handleMouseDown = (e, index, currentPos) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        setDraggingSkill({
            index,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
            startX: e.clientX,
            startY: e.clientY,
            dragged: false,
        });
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (draggingSkill) {
                const dx = e.clientX - draggingSkill.startX;
                const dy = e.clientY - draggingSkill.startY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 5 && !draggingSkill.dragged) {
                    setDraggingSkill((prev) => ({ ...prev, dragged: true }));
                }
                const newLeft = ((e.clientX - draggingSkill.offsetX) / window.innerWidth) * 100;
                const newTop = ((e.clientY - draggingSkill.offsetY) / window.innerHeight) * 100;
                setUnlockedSkills((prev) =>
                    prev.map((item) =>
                        item.index === draggingSkill.index
                            ? { ...item, position: { top: newTop, left: newLeft } }
                            : item
                    )
                );
            }
        },
        [draggingSkill]
    );

    const handleMouseUp = useCallback(
        (e) => {
            if (draggingSkill) {
                if (!draggingSkill.dragged) {
                    setUnlockedSkills((prev) => prev.filter((s) => s.index !== draggingSkill.index));
                }
                setDraggingSkill(null);
            }
        },
        [draggingSkill]
    );

    useEffect(() => {
        if (draggingSkill) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [draggingSkill, handleMouseMove, handleMouseUp]);

  
    const dynamicTarget = "STORYTELLING";
    const [bgText, setBgText] = useState("");
    // Speed factor > 1 will make typing and erasing faster
    const speedFactor = 1.5;
    useEffect(() => {
        let animationFrameId;
        const updateText = () => {
            if (sectionRef.current) {
                const sectionTop = sectionRef.current.offsetTop;
                const sectionHeight = sectionRef.current.offsetHeight;
                const scrollY = window.scrollY;
                // Calculate progress: 0 at sectionTop, 1 at sectionTop+sectionHeight
                let progress = (scrollY - sectionTop) / sectionHeight;
                // Multiply progress by speedFactor and clamp between 0 and 1
                progress = Math.min(Math.max(progress * speedFactor, 0), 1);
                const charCount = Math.round(progress * dynamicTarget.length);
                setBgText(dynamicTarget.substring(0, charCount));
            }
            animationFrameId = requestAnimationFrame(updateText);
        };
        animationFrameId = requestAnimationFrame(updateText);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dynamicTarget, speedFactor]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className={`relative border-t-8 transition-all duration-500 bg-cover min-h-screen ${isLightMode
                    ? 'bg-[url(/assets/lightMode/lightSectionImage2.png)]'
                    : 'bg-[url(/assets/sectionImage2.png)]'
                }`}
        >
            <div className="relative w-11/12 sm:w-4/5 mx-auto flex flex-col items-center py-12">
                <h2
                    className={`text-4xl font-mono font-bold drop-shadow-lg ${isLightMode
                            ? 'text-gray-900 underline decoration-gray-700'
                            : 'text-white'
                        }`}
                >
                    {'<SKILLS />'}
                </h2>
                <button
                    onClick={unlockSkill}
                    className="mt-6 px-6 py-3 rounded-lg bg-gray-800 border border-green-500 text-green-400 font-bold font-mono shadow-2xl transform hover:scale-110 transition-transform duration-300"
                >
                    {'<unlock/>'}
                </button>
                <button
                    onClick={unlockAllSkills}
                    className="mt-4 px-6 py-3 rounded-lg bg-gray-800 border border-blue-500 text-blue-400 font-bold font-mono shadow-2xl transform hover:scale-110 transition-transform duration-300"
                >
                    {'<unlock all/>'}
                </button>
                <p className="mt-4 text-sm font-mono text-gray-300">
                    Click a button to unlock skills!
                </p>
            </div>

            {/* Dynamic Text anchored at the bottom */}
            <div className="absolute bottom-0 left-1/2 pointer-events-none select-none -translate-x-1/2 mb-4">
                <h1 className="text-white opacity-20 font-bold whitespace-nowrap  sm:text-[5rem] md:text-[5rem] lg:text-[7rem]">
                    {bgText}
                </h1>
            </div>

            {/* Unlocked Skills Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {unlockedSkills.map((item) => {
                    if (!item.position) return null;
                    const skill = skills[item.index];
                    return (
                        <div
                            key={item.index}
                            onMouseDown={(e) => handleMouseDown(e, item.index, item.position)}
                            className="absolute cursor-pointer pointer-events-auto animate-crashFlyIn transform hover:scale-110 transition-transform duration-300 group"
                            style={{ top: `${item.position.top}%`, left: `${item.position.left}%` }}
                        >
                            <i
                                className={`${skill.icon} text-6xl ${isLightMode
                                        ? 'text-black shadow-[0_0_15px_rgba(0,0,0,0.5)]'
                                        : 'text-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                                    }`}
                            ></i>
                            <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs font-mono rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                                {skill.description}
                            </span>
                            <h3 className={`mt-2 font-mono text-sm ${isLightMode ? 'text-black' : 'text-white'}`}>
                                {skill.label}
                            </h3>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        @keyframes crashFlyIn {
          0% {
            transform: translateY(-1000px) rotate(-90deg) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translateY(80px) rotate(30deg) scale(1.5);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) rotate(-10deg) scale(0.9);
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        .animate-crashFlyIn {
          animation: crashFlyIn 1.2s cubic-bezier(0.25, 1.5, 0.5, 1) forwards;
        }
      `}</style>
        </section>
    );
};

export default Skills;
