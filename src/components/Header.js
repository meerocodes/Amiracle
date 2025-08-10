import React, { useState, useEffect } from 'react';
import LightModeLogo from '../../src/finalLogoLightMode.svg';
import DarkModeLogo from '../../src/finalLogoDarkMode.svg';
// Import your new background images
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

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const currentWord = words[currentWordIndex];
        const typingSpeed = isDeleting ? 100 : 200;
        setIsTouchDevice(('ontouchstart' in window || navigator.maxTouchPoints > 0));

        const handleTyping = () => {
            if (!isDeleting) {
                const nextText = currentWord.substring(0, displayText.length + 1);
                setDisplayText(nextText);
                if (nextText === currentWord) {
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 1000);
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
                transform: `translateY(${scrollY * 0.5}px)`
            }}
            className="relative bg-cover h-[100dvh] section-transition overflow-x-hidden"
        >
            <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 z-50 glass-dark transition-all duration-300 hover:backdrop-blur-xl">
                <a href="#header" className="logoLink">
                    <img
                        src={isLightMode ? LightModeLogo : DarkModeLogo}
                        alt="amiracle logo"
                        className="h-12 float interactive"
                    />
                </a>
                <ul className="hidden md:flex gap-5 items-center stagger-animation">
                    <li className="navItem">
                        <a href="#skills" className="interactive hover:text-blue-400 transition-colors duration-300">{"// skills"}</a>
                    </li>
                    <li className="navItem">
                        <a href="#projects" className="interactive hover:text-blue-400 transition-colors duration-300">{"// projects"}</a>
                    </li>
                    <li className="navItem">
                        <a href="#contact" className="interactive hover:text-blue-400 transition-colors duration-300">{"// get in touch"}</a>
                    </li>
                    <li className="navItem">
                        <div className="flex items-center">
                            <div
                                onClick={toggleLightMode}
                                className="w-12 h-6 bg-gray-600 rounded-full cursor-pointer relative transition-all duration-300 hover:scale-110 pulse-glow"
                            >
                                <div
                                    className={`w-6 h-6 ${isLightMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'} rounded-full absolute top-0 left-0 transition-all duration-300 ${isLightMode ? 'translate-x-6' : 'translate-x-0'} shadow-lg`}
                                ></div>
                            </div>
                            <span className="ml-2 text-white text-sm font-mono">
                                {isLightMode ? 'go dark' : 'go light'}
                            </span>
                        </div>
                    </li>
                </ul>
                <div
                    className="block md:hidden hamburger cursor-pointer interactive"
                    onClick={toggleHamburger}
                >
                    <span className={`block w-6 h-0.5 my-1 bg-white transition-all duration-300 ${isHamburgerActive ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 my-1 bg-white transition-all duration-300 ${isHamburgerActive ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 my-1 bg-white transition-all duration-300 ${isHamburgerActive ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
            </nav>

            {isHamburgerActive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg transition-all duration-300 animate-fade-in">
                    <div
                        className={`relative ${mobileMenuClasses} rounded-[1.5rem] p-8 w-11/12 max-w-sm shadow-2xl transform transition-all duration-500 animate-slide-in ring-2 ring-blue-500/30`}
                    >
                        <button
                            onClick={toggleHamburger}
                            className="absolute top-2 right-2 text-3xl text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-110 hover:rotate-90 focus:outline-none"
                        >
                            &times;
                        </button>
                        <ul className="flex flex-col gap-6 text-center mt-6 stagger-animation">
                            <li className="text-xl hover:text-white transition-all duration-300 hover:scale-105 transform drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]">
                                <a href="#skills" onClick={toggleHamburger}>
                                    {"// skills"}
                                </a>
                            </li>
                            <li className="text-xl hover:text-white transition-all duration-300 hover:scale-105 transform drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]">
                                <a href="#projects" onClick={toggleHamburger}>
                                    {"// projects"}
                                </a>
                            </li>
                            <li className="text-xl hover:text-white transition-all duration-300 hover:scale-105 transform drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]">
                                <a href="#contact" onClick={toggleHamburger}>
                                    {"// get in touch"}
                                </a>
                            </li>
                            <li>
                                <div
                                    onClick={() => {
                                        toggleLightMode();
                                        toggleHamburger();
                                    }}
                                    className="flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
                                >
                                    <div className="w-12 h-6 bg-gray-600 rounded-full relative transition-all duration-300 pulse-glow">
                                        <div
                                            className={`w-6 h-6 ${isLightMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'} rounded-full absolute top-0 left-0 transition-all duration-300 ${isLightMode ? 'translate-x-6' : 'translate-x-0'} shadow-lg`}
                                        ></div>
                                    </div>
                                    <span className="text-xl">
                                        {isLightMode ? 'go dark' : 'go light'}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 p-4">
                <span
                    className="text-white text-sm font-mono inline-block gradient-text bg-gradient-to-r from-blue-400 to-purple-500 px-3 py-1 rounded-full glass-dark"
                    style={{
                        minWidth: '12ch',
                        textShadow: isLightMode ? '1px 2px 1px rgba(0,0,0,1)' : 'none'
                    }}
                >
                    {displayText}
                </span>
            </div>

            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 px-4"
                style={{ perspective: '1000px' }}
            >
                <div className="relative">
                    {/* Tooltip Icon */}
                    <div
                        className="absolute -top-6 -right-8 cursor-pointer interactive"
                        onMouseEnter={!isTouchDevice ? () => setShowTooltip(true) : undefined}
                        onMouseLeave={!isTouchDevice ? () => setShowTooltip(false) : undefined}
                        onClick={() => setShowTooltip((prev) => !prev)}
                    >
                        <span
                            className="text-white text-lg font-bold mr-4 w-8 h-8 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-all duration-300"
                            style={{
                                minWidth: '12ch',
                                color: isLightMode ? 'black' : 'white'
                            }}
                        >
                            ?
                        </span>
                        {showTooltip && (
                            <div
                                className={`absolute -top-10 right-0 w-48 p-3 text-xs rounded-lg shadow-xl transition-all duration-300 z-10 animate-fade-in
            ${isLightMode
                                        ? 'glass border border-gray-300 text-black'
                                    : 'glass-dark border border-white/20 text-white'
                                    }`}
                            >
                                The order has no significance, just thought it looked cooler!
                            </div>
                        )}

                    </div>
                    <div className="sliding-text-block four-words mr-20">
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

            <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
                <button onClick={toggleSocialArrow} className="focus:outline-none">
                    <div
                        className="w-10 glass-dark p-1 rounded-r-lg transition-all ease-in-out duration-700 flex flex-col items-center hover:scale-105 border-r border-white/20"
                        style={{
                            transform: isSocialArrowActive
                                ? 'translateX(0)'
                                : 'translateX(calc(-100% + 2rem))',
                        }}
                    >
                        {!isSocialArrowActive ? (
                            <>
                                <span
                                    style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                    }}
                                    className="text-white text-[0.5rem] leading-none font-mono"
                                >
                                    SOCIALS
                                </span>
                                <i className="fa-solid fa-arrow-right text-white mt-1 text-xs hover:text-blue-400 transition-colors duration-300"></i>
                            </>
                        ) : (
                            <>
                                <ul className="flex flex-col gap-2 text-white text-xs">
                                    <li>
                                        <a
                                            href="https://github.com/meerocodes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-all duration-300 hover:scale-125 block"
                                        >
                                            <i className="fa-brands fa-github-alt"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:amir.ar@outook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-all duration-300 hover:scale-125 block"
                                        >
                                            <i className="fa-solid fa-inbox"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/in/meerocodes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-all duration-300 hover:scale-125 block"
                                        >
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                                <i className="fa-solid fa-arrow-left text-white mt-2 text-xs hover:text-blue-400 transition-colors duration-300"></i>
                            </>
                        )}
                    </div>
                </button>
            </div>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes slideIn {
                    from {
                        transform: translateY(-20px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;
