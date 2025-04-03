import React, { useRef } from 'react';

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
            className={`relative transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } mb-16`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="group w-full h-96 md:h-80" style={{ perspective: '1000px' }}>
                <div className="relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <img
                            src={`${process.env.PUBLIC_URL}${project.image}`}
                            alt={project.alt}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <div
                        className="absolute w-full h-full bg-gradient-to-b from-yellow-200 to-yellow-400 text-gray-900 flex flex-col justify-between p-4 rounded-lg border-4 border-yellow-500 shadow-lg overflow-auto"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="w-12 h-12">
                                <img
                                    src={`${process.env.PUBLIC_URL}/finalLogoLightMode.svg`}
                                    alt="Logo"
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs font-bold tracking-wide uppercase">Project</span>
                        </div>
                        <div className="text-center mb-2">
                            <h4 className="mb-1 text-lg font-bold font-mono">{project.tech}</h4>
                            <p className="text-xs font-mono">{project.description}</p>
                        </div>
                        <div className="space-y-2 mb-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-mono">XP Gained:</span>
                                <span className="text-xs font-mono font-bold">{xp} XP</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-mono">Life Left:</span>
                                <div className="w-32 bg-gray-300 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${life}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <a
                                href={project.repo}
                                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:scale-105 transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Repo
                            </a>
                            <a
                                href={project.live}
                                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:scale-105 transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Demo
                            </a>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .group:hover > div {
                        transform: rotateY(180deg);
                    }
                `}</style>
            </div>
        </div>
    );
};

const Projects = ({ isLightMode }) => {
    const sectionRef = useRef(null);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className={`relative border-t-8 transition-all duration-500 bg-cover min-h-screen pb-4 ${isLightMode
                    ? 'bg-[url(/assets/lightMode/lightSectionImage.png)]'
                    : 'bg-[url(/assets/sectionImage.png)]'
                }`}
        >
            <div className="w-11/12 sm:w-4/5 mx-auto flex flex-col items-center">
                <h2
                    className={`mt-12 text-4xl font-mono font-bold drop-shadow-lg ${isLightMode ? 'text-gray-900 underline decoration-gray-700' : 'text-white'
                        }`}
                >
                    {'<PROJECTS />'}
                </h2>
                <p className="mt-4 text-sm font-mono text-gray-300">hover to view details</p>
                <i
                    className={`fa-solid fa-angle-down mt-4 text-2xl ${isLightMode ? 'text-gray-900' : 'text-white'
                        }`}
                ></i>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
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
        </section>
    );
};

export default Projects;