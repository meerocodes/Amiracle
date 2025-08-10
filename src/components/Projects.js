import React, { useRef } from 'react';
// Import the new background images
import LightProjectBg from '../assets/lightMode/lightSectionImage.webp';
import DarkProjectBg from '../assets/darkmode/sectionImage.webp';

const projectsData = [
    {
        id: 4,
        image: '/GIFS/kidcentralGif.gif',
        alt: 'a preview of the Kidcentral website and live dashboard project',
        tech: 'SHOPIFY | PYTHON WORKFLOWS | SHOPIFY ADMINAPI | REACT.JS | REST API',
        description:
            'Led complete front-end development and UX/UI design for Kidcentral.ca on Shopify, boosting user engagement and sales by 32% YTD. Engineered a dual-faceted platform for both public and B2B users and integrated Salsify for streamlined data management. Developed a React.js-powered live dashboard for real-time monitoring of warehouse operations, enhancing transparency and efficiency while reducing third-party dependencies.',
        repo: 'https://github.com/DevinD55/project-2-gains-app',
        live: 'https://kidcentral.ca',
        align: 'left',
    },
    {
        id: 3,
        image: '/GIFS/oudieWebsiteGif.gif',
        alt: 'a preview of the Oudie brand build project',
        tech: 'SHOPIFY | CUSTOM SNIPPETS | DIGITAL TRANSFORMATION',
        description:
            "Co-Chief Executive Officer role where I established the Oudie brand from inception by designing a custom Shopify website, developing tailored digital solutions, and driving a significant boost in digital engagement.",
        repo: '',
        live: 'https://oudie.ca',
        align: 'right',
    },
    {
        id: 1,
        image: '/GIFS/pokejack.gif',
        alt: 'a preview of my pokejack project',
        tech: 'REACT.JS | SASS | API',
        description:
            'Our group developed a React.js and Sass project that is a Pokemon-themed Blackjack game featuring dynamic components and conditionally rendered elements for a true video game experience. APIs generate the deck and populate the game with Pokémon data.',
        repo: 'https://github.com/Pokemon-x-Blackjack/pokemon-blackjack',
        live: 'https://pokejack.netlify.app/',
        align: 'right',
    },
    {
        id: 2,
        image: '/GIFS/noFaceWebsiteGif.gif',
        alt: 'a preview of my Clients website noFace',
        tech: 'REACT.JS | CSS | SHOPIFY',
        description:
            'A scalable website built with React.js, featuring an integrated Shopify buy button and cart for seamless checkout. Efficiently handles large 3D render files for future expansion.',
        repo: 'https://github.com/meerocodes/no-face',
        live: 'https://noface.netlify.app/',
        align: 'left',
    },
];

const ProjectCard = ({ project, index, totalProjects, isLightMode }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        const currentCard = cardRef.current;
        if (currentCard) {
            observer.observe(currentCard);
        }
        return () => {
            if (currentCard) {
                observer.unobserve(currentCard);
            }
        };
    }, []);

    const xp = (totalProjects - index) * 500;
    const life = Math.round(((totalProjects - index) / totalProjects) * 100);

    return (
        <div
            ref={cardRef}
            className={`relative transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mb-16 card-hover`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="group w-full h-96 md:h-80 rounded-xl overflow-hidden" style={{ perspective: '1000px' }}>
                <div className={`relative w-full h-full transition-transform duration-700 ${isHovered ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute w-full h-full rounded-xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        <img
                            src={`${process.env.PUBLIC_URL}${project.image}`}
                            alt={project.alt}
                            className="w-full h-full object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-lg mb-2 font-mono">{project.tech.split(' | ')[0]}</h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">Hover to flip</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`absolute w-full h-full ${isLightMode
                                ? 'glass text-gray-900 flex flex-col justify-between p-6 rounded-xl border-2 border-white/30 shadow-xl overflow-auto'
                                : 'glass-dark text-white flex flex-col justify-between p-6 rounded-xl border-2 border-white/20 shadow-xl overflow-auto'
                            } backdrop-blur-lg`}
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-12 h-12 float">
                                <img
                                    src={`${process.env.PUBLIC_URL}/finalLogoLightMode.svg`}
                                    alt="Logo"
                                    className="object-contain filter drop-shadow-lg"
                                />
                            </div>
                            <span className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">Project</span>
                        </div>
                        <div className="text-center mb-4">
                            <h4 className="mb-3 text-lg font-bold font-mono gradient-text">{project.tech}</h4>
                            <p className="text-sm leading-relaxed">{project.description}</p>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-mono">XP Gained:</span>
                                <span className="text-sm font-mono font-bold text-green-400">{xp} XP</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-mono">Progress:</span>
                                <div className="w-32 bg-gray-300/30 rounded-full h-3 overflow-hidden">
                                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${life}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={project.repo}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm rounded-full hover:scale-105 transition-all duration-300 text-center font-mono btn-modern"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-brands fa-github mr-2"></i>Repo
                            </a>
                            <a
                                href={project.live}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full hover:scale-105 transition-all duration-300 text-center font-mono btn-modern"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-solid fa-external-link mr-2"></i>Live
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const Projects = ({ isLightMode }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

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

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                backgroundImage: `url(${isLightMode ? LightProjectBg : DarkProjectBg})`
            }}
            className="relative border-t-8 section-transition bg-cover min-h-screen pb-4"
        >
            <div className={`w-11/12 sm:w-4/5 mx-auto flex flex-col items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2
                    className={`mt-12 text-4xl font-mono font-bold drop-shadow-lg mb-4 ${isLightMode ? 'text-gray-900' : 'gradient-text'}`}
                >
                    {'<PROJECTS />'}
                </h2>
                <div className={`w-24 h-1 rounded-full mb-4 ${isLightMode ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}></div>
                <p className={`text-sm font-mono ${isLightMode ? 'text-gray-600' : 'text-gray-300'} mb-2`}>hover to view details</p>
                <i
                    className={`fa-solid fa-angle-down text-2xl ${isLightMode ? 'text-gray-900' : 'text-white'} animate-bounce`}
                ></i>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 w-full stagger-animation">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            totalProjects={projectsData.length}
                            isLightMode={isLightMode}
                        />
                    ))}
                </div>
            </div>
            
            <style jsx>{`
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </section>
    );
};

export default Projects;
