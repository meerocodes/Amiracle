import React, { useState, useEffect } from 'react';
import LightModeLogo from '../../src/finalLogoLightMode.svg';
import DarkModeLogo from '../../src/finalLogoDarkMode.svg';
import LightModeHeaderBg from '../assets/lightMode/lightMainHeader.webp';
import DarkModeHeaderBg from '../assets/darkmode/mainHeader.webp';

const words = ['BRANDING', 'STORYTELLING', 'GRAPHICS', 'E-COMMERCE'];

const Header = ({ isLightMode, toggleLightMode }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Enhanced parallax and mouse tracking
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Enhanced typewriter effect
    useEffect(() => {
        const currentWord = words[currentWordIndex];
        const typingSpeed = isDeleting ? 80 : 150;
        setIsTouchDevice(('ontouchstart' in window || navigator.maxTouchPoints > 0));

        const handleTyping = () => {
            if (!isDeleting) {
                const nextText = currentWord.substring(0, displayText.length + 1);
                setDisplayText(nextText);
                if (nextText === currentWord) {
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 2000);
                }
            } else {
                const nextText = currentWord.substring(0, displayText.length - 1);
                setDisplayText(nextText);
                if (nextText === '') {
                    setIsDeleting(false);
                    setCurrentWordIndex((currentWordIndex + 1) % words.length);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentWordIndex]);

    const [isHamburgerActive, setIsHamburgerActive] = useState(false);
    const toggleHamburger = () => setIsHamburgerActive((prev) => !prev);

    const [isSocialArrowActive, setIsSocialArrowActive] = useState(true);
    const toggleSocialArrow = () => setIsSocialArrowActive((prev) => !prev);

    const mobileMenuClasses = isLightMode
        ? 'glass border-2 border-white/30 text-shadow-white'
        : 'glass-dark border-2 border-white/20';

    return (
        <header
            id="header"
            style={{
                backgroundImage: `url(${isLightMode ? LightModeHeaderBg : DarkModeHeaderBg})`,
                transform: `translateY(${scrollY * 0.3}px)`,
                backgroundPosition: `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px`
            }}
            className="relative bg-cover h-[100dvh] section-transition overflow-hidden"
        >
            {/* Animated particles */}
            {/* Refined Matrix-style Code Rain */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="code-rain-column"
                        style={{
                            left: `${5 + (i * 8)}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${4 + (i % 3)}s`
                        }}
                    >
                        {[...Array(8)].map((_, j) => (
                            <div
                                key={j}
                                className={`code-char ${isLightMode ? 'code-char-light' : ''}`}
                                style={{
                                    animationDelay: `${j * 0.1}s`
                                }}
                            >
                                {['<', '>', '/', '{', '}', '(', ')', ';', '=', '+', '-', '*'][Math.floor(Math.random() * 12)]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Enhanced Navigation */}
            <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-6 z-50 glass-dark transition-all duration-500 hover:backdrop-blur-xl border-b border-white/10">
                <a href="#header" className="logoLink group">
                    <img
                        src={isLightMode ? LightModeLogo : DarkModeLogo}
                        alt="amiracle logo"
                        className="h-14 float interactive transform-gpu group-hover:scale-110 transition-all duration-300"
                    />
                </a>
                
                <ul className="hidden md:flex gap-8 items-center stagger-animation">
                    <li className="navItem">
                        <a 
                            href="#skills" 
                            className="interactive hover:text-blue-400 transition-all duration-300 text-lg font-mono relative group"
                        >
                            {"// skills"}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li className="navItem">
                        <a 
                            href="#projects" 
                            className="interactive hover:text-blue-400 transition-all duration-300 text-lg font-mono relative group"
                        >
                            {"// projects"}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li className="navItem">
                        <a 
                            href="#contact" 
                            className="interactive hover:text-blue-400 transition-all duration-300 text-lg font-mono relative group"
                        >
                            {"// get in touch"}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li className="navItem">
                        <div className="flex items-center gap-3">
                            <div
                                onClick={toggleLightMode}
                                className="w-16 h-8 bg-gray-700 rounded-full cursor-pointer relative transition-all duration-500 hover:scale-110 pulse-glow group"
                            >
                                <div
                                    className={`w-8 h-8 ${isLightMode 
                                        ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' 
                                        : 'bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600'
                                    } rounded-full absolute top-0 left-0 transition-all duration-500 ${
                                        isLightMode ? 'translate-x-8' : 'translate-x-0'
                                    } shadow-lg group-hover:shadow-xl flex items-center justify-center`}
                                >
                                    <i className={`${isLightMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} text-white text-sm`}></i>
                                </div>
                            </div>
                            <span className="text-white text-sm font-mono gradient-text">
                                {isLightMode ? 'go dark' : 'go light'}
                            </span>
                        </div>
                    </li>
                </ul>

                {/* Enhanced Hamburger Menu */}
                <div
                    className="block md:hidden hamburger cursor-pointer interactive p-2"
                    onClick={toggleHamburger}
                >
                    <span className={`block w-7 h-0.5 my-1.5 bg-white transition-all duration-500 ${isHamburgerActive ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                    <span className={`block w-7 h-0.5 my-1.5 bg-white transition-all duration-500 ${isHamburgerActive ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-7 h-0.5 my-1.5 bg-white transition-all duration-500 ${isHamburgerActive ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
            </nav>

            {/* Enhanced Mobile Menu */}
            {isHamburgerActive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl transition-all duration-500 animate-fade-in">
                    <div
                        className={`relative ${mobileMenuClasses} rounded-3xl p-10 w-11/12 max-w-md shadow-2xl transform transition-all duration-700 animate-slide-in ring-2 ring-blue-500/30`}
                    >
                        <button
                            onClick={toggleHamburger}
                            className="absolute top-4 right-4 text-4xl text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-90 focus:outline-none"
                        >
                            &times;
                        </button>
                        <ul className="flex flex-col gap-8 text-center mt-8 stagger-animation">
                            <li className="text-2xl hover:text-white transition-all duration-300 hover:scale-110 transform drop-shadow-md hover:drop-shadow-[0_0_15px_rgba(0,191,255,0.8)]">
                                <a href="#skills" onClick={toggleHamburger} className="font-mono">
                                    {"// skills"}
                                </a>
                            </li>
                            <li className="text-2xl hover:text-white transition-all duration-300 hover:scale-110 transform drop-shadow-md hover:drop-shadow-[0_0_15px_rgba(0,191,255,0.8)]">
                                <a href="#projects" onClick={toggleHamburger} className="font-mono">
                                    {"// projects"}
                                </a>
                            </li>
                            <li className="text-2xl hover:text-white transition-all duration-300 hover:scale-110 transform drop-shadow-md hover:drop-shadow-[0_0_15px_rgba(0,191,255,0.8)]">
                                <a href="#contact" onClick={toggleHamburger} className="font-mono">
                                    {"// get in touch"}
                                </a>
                            </li>
                            <li>
                                <div
                                    onClick={() => {
                                        toggleLightMode();
                                        toggleHamburger();
                                    }}
                                    className="flex items-center justify-center gap-3 cursor-pointer hover:scale-110 transition-all duration-300"
                                >
                                    <div className="w-16 h-8 bg-gray-600 rounded-full relative transition-all duration-300 pulse-glow">
                                        <div
                                            className={`w-8 h-8 ${isLightMode 
                                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                                                : 'bg-gradient-to-r from-blue-400 to-purple-500'
                                            } rounded-full absolute top-0 left-0 transition-all duration-300 ${
                                                isLightMode ? 'translate-x-8' : 'translate-x-0'
                                            } shadow-lg flex items-center justify-center`}
                                        >
                                            <i className={`${isLightMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} text-white text-sm`}></i>
                                        </div>
                                    </div>
                                    <span className="text-xl font-mono">
                                        {isLightMode ? 'go dark' : 'go light'}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Enhanced Typewriter Display */}
            <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span
                        className="text-white text-lg font-mono inline-block gradient-text bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 rounded-full glass-dark border border-white/20"
                        style={{
                            minWidth: '15ch',
                            textShadow: isLightMode ? '1px 2px 1px rgba(0,0,0,1)' : 'none'
                        }}
                    >
                        {displayText}<span className="animate-pulse">|</span>
                    </span>
                </div>
            </div>

            {/* Enhanced Main Content */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 px-4"
                style={{ perspective: '1000px' }}
            >
                <div className="relative">
                    {/* Enhanced Tooltip */}
                    <div
                        className="absolute -top-8 -right-10 cursor-pointer interactive z-10 hidden sm:block"
                        onMouseEnter={!isTouchDevice ? () => setShowTooltip(true) : undefined}
                        onMouseLeave={!isTouchDevice ? () => setShowTooltip(false) : undefined}
                        onClick={() => setShowTooltip((prev) => !prev)}
                    >
                        <span
                            className={`text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 pulse-glow border ${
                                isLightMode 
                                    ? 'text-gray-800 glass border-gray-300 shadow-lg' 
                                    : 'text-white glass-dark border-white/20'
                            }`}
                            style={{
                                color: isLightMode ? 'black' : 'white'
                            }}
                        >
                            ?
                        </span>
                        {showTooltip && (
                            <div
                                className={`absolute -top-12 right-0 w-56 p-4 text-sm rounded-xl shadow-2xl transition-all duration-500 z-20 animate-fade-in transform-gpu ${
                                    isLightMode
                                        ? 'glass border border-gray-300 text-black'
                                        : 'glass-dark border border-white/20 text-white'
                                }`}
                            >
                              Just arranged for maximum Aura. 🚀
                                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Tooltip - Positioned differently */}
                    <div className="absolute -top-16 right-0 cursor-pointer interactive z-10 sm:hidden">
                        <span
                            className={`text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 pulse-glow border ${
                                isLightMode 
                                    ? 'text-gray-800 glass border-gray-300 shadow-lg' 
                                    : 'text-white glass-dark border-white/20'
                            }`}
                            onClick={() => setShowTooltip((prev) => !prev)}
                        >
                            ?
                        </span>
                        {showTooltip && (
                            <div
                                className={`absolute -top-12 right-full mr-2 w-56 p-4 text-sm rounded-xl shadow-2xl transition-all duration-500 z-20 animate-fade-in transform-gpu ${
                                    isLightMode
                                        ? 'glass border border-gray-300 text-black'
                                        : 'glass-dark border border-white/20 text-white'
                                }`}
                            >
                                The order has no significance, just thought it looked cooler! ✨
                                <div className="absolute top-4 left-full w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-400"></div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Sliding Text */}
                    <div className="sliding-text-block four-words mr-20 transform-gpu">
                        <ul className="Words">
                            <li className="Words-line">
                                <p className="dev-3d">&nbsp;</p>
                                <p>CEO</p>
                            </li>
                            <li className="Words-line">
                                <p>CEO</p>
                                <p>CREATOR</p>
                            </li>
                            <li className="Words-line">
                                <p>CREATOR</p>
                                <p>INNOVATOR</p>
                            </li>
                            <li className="Words-line">
                                <p>INNOVATOR</p>
                                <p>Web Developer</p>
                            </li>
                            <li className="Words-line">
                                <p>Web Developer</p>
                                <p className="dev-4">&nbsp;</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Enhanced Social Panel */}
            <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
                <button onClick={toggleSocialArrow} className="focus:outline-none group">
                    <div
                        className="w-12 glass-dark p-2 rounded-r-xl transition-all ease-in-out duration-700 flex flex-col items-center hover:scale-105 border-r border-white/20 shadow-lg group-hover:shadow-xl"
                        style={{
                            transform: isSocialArrowActive
                                ? 'translateX(0)'
                                : 'translateX(calc(-100% + 2.5rem))',
                        }}
                    >
                        {!isSocialArrowActive ? (
                            <>
                                <span
                                    style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                    }}
                                    className="text-white text-xs leading-none font-mono gradient-text"
                                >
                                    SOCIALS
                                </span>
                                <i className="fa-solid fa-arrow-right text-white mt-2 text-sm hover:text-blue-400 transition-colors duration-300 animate-pulse"></i>
                            </>
                        ) : (
                            <>
                                <ul className="flex flex-col gap-4 text-white text-lg">
                                    <li>
                                        <a
                                            href="https://github.com/meerocodes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-all duration-300 hover:scale-150 block pulse-glow"
                                        >
                                            <i className="fa-brands fa-github-alt"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:amir.ar@outook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-all duration-300 hover:scale-150 block pulse-glow"
                                        >
                                            <i className="fa-solid fa-inbox"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/in/meerocodes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-all duration-300 hover:scale-150 block pulse-glow"
                                        >
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                                <i className="fa-solid fa-arrow-left text-white mt-3 text-sm hover:text-blue-400 transition-colors duration-300 animate-pulse"></i>
                            </>
                        )}
                    </div>
                </button>
            </div>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes slideIn {
                    from {
                        transform: translateY(-30px) scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
                .particle {
                    animation: particle-float linear infinite;
                }
                @keyframes particle-float {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </header>
    );
};

export default Header;