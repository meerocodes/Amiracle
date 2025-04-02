import React, { useState, useEffect, useRef } from 'react';
import LightModeLogo from '../../src/finalLogoLightMode.svg';
import DarkModeLogo from '../../src/finalLogoDarkMode.svg';

const Header = ({ isLightMode, toggleLightMode }) => {
    const targetWord = 'BRANDING';
    const [displayText, setDisplayText] = useState('');
    const headerRef = useRef(null);
    const currentLetterCount = useRef(0);
    const scrollRequestId = useRef(null);

    const updateText = () => {
        if (!headerRef.current) return;

        const scrollY = window.scrollY;
        const start = headerRef.current.offsetTop;
        const height = headerRef.current.offsetHeight;

        if (scrollY <= start) {
            currentLetterCount.current = 0;
            setDisplayText('');
            return;
        }

        if (scrollY >= start + height) {
            currentLetterCount.current = targetWord.length;
            setDisplayText(targetWord);
            return;
        }

        let progress = (scrollY - start) / height;
        progress = Math.min(Math.max(progress, 0), 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const targetCount = easedProgress * targetWord.length;
        const newCount =
            currentLetterCount.current + (targetCount - currentLetterCount.current) * 0.2;
        currentLetterCount.current = newCount;
        const clampedLength = Math.min(Math.round(newCount), targetWord.length);
        setDisplayText(targetWord.substring(0, clampedLength));
    };

    useEffect(() => {
        const headerElement = headerRef.current;

        const scrollHandler = () => {
            scrollRequestId.current = requestAnimationFrame(updateText);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        window.addEventListener('scroll', scrollHandler, { passive: true });
                        window.addEventListener('resize', scrollHandler);
                    } else {
                        window.removeEventListener('scroll', scrollHandler);
                        window.removeEventListener('resize', scrollHandler);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (headerElement) {
            observer.observe(headerElement);
        }

        return () => {
            if (headerElement) {
                observer.unobserve(headerElement);
            }
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', scrollHandler);
            if (scrollRequestId.current) {
                cancelAnimationFrame(scrollRequestId.current);
            }
        };
    }, []);

    const [isHamburgerActive, setIsHamburgerActive] = useState(false);
    const toggleHamburger = () => setIsHamburgerActive((prev) => !prev);

    const [isSocialArrowActive, setIsSocialArrowActive] = useState(true);
    const toggleSocialArrow = () => setIsSocialArrowActive((prev) => !prev);

    const mobileMenuClasses = isLightMode
        ? 'bg-gradient-to-br from-blue-100 to-blue-300'
        : 'bg-gradient-to-br from-gray-700 to-gray-900';

    return (
        <header
            ref={headerRef}
            id="header"
            className={`relative bg-cover h-screen min-h-[860px] transition-all duration-500 ${isLightMode
                ? 'bg-[url(/assets/lightMode/lightMainHeader.png)]'
                : 'bg-[url(/assets/mainHeader.png)]'
                } overflow-x-hidden`}
        >
            <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 z-50 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/20 hover:shadow-lg">
                <a href="#header" className="logoLink">
                    <img
                        src={isLightMode ? LightModeLogo : DarkModeLogo}
                        alt="amiracle logo"
                        className="h-12"
                    />
                </a>
                <ul className="hidden md:flex gap-5 items-center">
                    <li className="navItem">
                        <a href="#skills">{"// skills"}</a>
                    </li>
                    <li className="navItem">
                        <a href="#projects">{"// projects"}</a>
                    </li>
                    <li className="navItem">
                        <a href="#contact">{"// get in touch"}</a>
                    </li>
                    <li className="navItem">
                        <div className="flex items-center">
                            <div
                                onClick={toggleLightMode}
                                className="w-12 h-6 bg-gray-600 rounded-full cursor-pointer relative transition-colors duration-300"
                            >
                                <div
                                    className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform duration-300 ${isLightMode ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                            <span className="ml-2 text-white text-sm">
                                {isLightMode ? 'go dark' : 'go light'}
                            </span>
                        </div>
                    </li>
                </ul>
                <div
                    className="block md:hidden hamburger cursor-pointer"
                    onClick={toggleHamburger}
                >
                    <span className="block w-6 h-0.5 my-1 bg-white transition-all"></span>
                    <span className="block w-6 h-0.5 my-1 bg-white transition-all"></span>
                    <span className="block w-6 h-0.5 my-1 bg-white transition-all"></span>
                </div>
            </nav>

            {isHamburgerActive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                    <div
                        className={`relative ${mobileMenuClasses} rounded-[1.5rem] p-8 w-11/12 max-w-sm shadow-2xl transform transition-all duration-300 animate-slide-in border-[3px] border-white/20 ring-[6px] ring-blue-500/30 backdrop-blur-md before:content-[''] before:absolute before:inset-1 before:rounded-[1.25rem] before:border before:border-blue-500/30 before:shadow-inner`}
                    >
                        <button
                            onClick={toggleHamburger}
                            className="absolute top-2 right-2 text-3xl text-white hover:text-blue-400 transition-transform duration-200 transform hover:scale-110 focus:outline-none"
                        >
                            &times;
                        </button>
                        <ul className="flex flex-col gap-6 text-center mt-6">
                            <li className="text-xl hover:text-blue-400 transition-colors hover:scale-105 transform drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]">
                                <a href="#skills" onClick={toggleHamburger}>
                                    {"// skills"}
                                </a>
                            </li>
                            <li className="text-xl hover:text-blue-400 transition-colors hover:scale-105 transform drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]">
                                <a href="#projects" onClick={toggleHamburger}>
                                    {"// projects"}
                                </a>
                            </li>
                            <li className="text-xl hover:text-blue-400 transition-colors hover:scale-105 transform drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]">
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
                                    className="flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                                >
                                    <div className="w-12 h-6 bg-gray-600 rounded-full relative transition-colors duration-300">
                                        <div
                                            className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform duration-300 ${isLightMode ? 'translate-x-6' : 'translate-x-0'
                                                }`}
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

            <div className="background-text absolute bottom-0 left-0 p-0 sm:p-4 pointer-events-none select-none">
                <h1 className="text-white opacity-20 font-bold transition-all duration-300 ease-out text-[3rem] sm:text-6xl md:text-8xl lg:text-[13rem]">
                    {displayText}
                </h1>
            </div>

            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 px-4"
                style={{ perspective: '1000px' }}
            >
                <div className="sliding-text-block four-words">
                    <ul className="Words">
                        <li className="Words-line">
                            <p className="dev-3d">&nbsp;</p>
                            <p>Web Developer</p>
                        </li>
                        <li className="Words-line">
                            <p>Web Developer</p>
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
                            <p className="dev-4">&nbsp;</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
                <button onClick={toggleSocialArrow} className="focus:outline-none">
                    <div
                        className="w-10 bg-black p-1 rounded transition-transform ease-in-out duration-700 flex flex-col items-center"
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
                                    className="text-white text-[0.5rem] leading-none"
                                >
                                    SOCIALS
                                </span>
                                <i className="fa-solid fa-arrow-right text-white mt-1 text-xs"></i>
                            </>
                        ) : (
                            <>
                                <ul className="flex flex-col gap-1 text-white text-xs">
                                    <li>
                                        <a
                                            href="https://github.com/meerocodes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fa-brands fa-github-alt"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:amir.ar@outook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fa-solid fa-inbox"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/in/meerocodes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                                <i className="fa-solid fa-arrow-left text-white mt-1 text-xs"></i>
                            </>
                        )}
                    </div>
                </button>
            </div>

            <style jsx>{`
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out forwards;
                }
                @keyframes slideIn {
                    from {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;
