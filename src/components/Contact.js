import React, { useState, useEffect, useRef } from 'react';
// Import your new background images
import LightContactBg from '../assets/lightMode/lightSectionImage3.webp';
import DarkContactBg from '../assets/darkmode/sectionImage3.webp';

const Contact = ({ isLightMode }) => {
    const titleRef = useRef(null);
    const cardRef = useRef(null);
    const [titleVisible, setTitleVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);

    useEffect(() => {
        const titleElement = titleRef.current;
        const cardElement = cardRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === titleElement && entry.isIntersecting) {
                        setTitleVisible(true);
                    }
                    if (entry.target === cardElement && entry.isIntersecting) {
                        setCardVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (titleElement) observer.observe(titleElement);
        if (cardElement) observer.observe(cardElement);

        return () => {
            if (titleElement) observer.unobserve(titleElement);
            if (cardElement) observer.unobserve(cardElement);
        };
    }, []);

    return (
        <section
            id="contact"
            style={{
                backgroundImage: `url(${isLightMode ? LightContactBg : DarkContactBg})`
            }}
            className="relative overflow-x-hidden border-t-8 transition-all duration-500 bg-cover min-h-screen"
        >
            <div className="absolute inset-0"></div>
            <div className="relative w-4/5 mx-auto flex flex-col items-center">
                <h2
                    ref={titleRef}
                    className={`p-10 text-4xl font-mono font-bold drop-shadow-lg transition-all duration-500 delay-100 ${titleVisible
                        ? isLightMode
                            ? 'opacity-100 translate-x-0 text-gray-900 underline decoration-gray-700'
                            : 'opacity-100 translate-x-0 text-white'
                        : 'opacity-0 -translate-x-[100vw]'
                        }`}
                >
                    {'<GET IN TOUCH />'}
                </h2>
                <div
                    ref={cardRef}
                    className={`pokemon-card relative rounded-xl p-4 mt-8 w-full max-w-lg shadow-2xl border-4 border-double transition-all duration-300 ${isLightMode
                        ? 'bg-gradient-to-br from-blue-100 to-green-100 border-blue-400'
                        : 'bg-gradient-to-br from-yellow-300 to-green-900 border-gray-800'
                        }`}
                >
                    <div className="card-header flex justify-between items-center mb-4">
                        <h2
                            className={`font-bold font-mono text-2xl drop-shadow-lg transition-all duration-500 delay-200 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-[100vw]'
                                }`}
                        >
                            [Code Champion]
                        </h2>
                        <div
                            className={`card-stats text-right transition-all duration-500 delay-300 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-[100vw]'
                                }`}
                        >
                            <span className="block font-bold text-sm text-red-700">HP</span>
                            <span className="block font-extrabold text-xl text-red-800">120</span>
                        </div>
                    </div>
                    <form
                        action="https://formspree.io/f/xeqwljbo"
                        method="POST"
                        className={`w-full rounded-lg p-6 backdrop-blur-sm shadow-inner transition-all duration-300 border ${isLightMode
                            ? 'bg-white/90 text-black border-gray-300'
                            : 'bg-gray-900/90 text-white border-gray-700'
                            }`}
                    >
                        <div
                            className={`form-group flex flex-col mb-4 transition-all duration-500 delay-400 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-[100vw]'
                                }`}
                        >
                            <label htmlFor="name" className="sr-only">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="// Name"
                                required
                                className={`p-3 rounded-full border font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${isLightMode
                                    ? 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-800'
                                    : 'bg-gray-800 border-gray-700 placeholder-gray-400 text-white'
                                    }`}
                            />
                        </div>
                        <div
                            className={`form-group flex flex-col mb-4 transition-all duration-500 delay-500 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-[100vw]'
                                }`}
                        >
                            <label htmlFor="email" className="sr-only">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="// Email"
                                required
                                className={`p-3 rounded-full border font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${isLightMode
                                    ? 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-800'
                                    : 'bg-gray-800 border-gray-700 placeholder-gray-400 text-white'
                                    }`}
                            />
                        </div>
                        <div
                            className={`form-group flex flex-col mb-4 transition-all duration-500 delay-600 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-[100vw]'
                                }`}
                        >
                            <label htmlFor="message" className="sr-only">
                                Message:
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="// Message"
                                required
                                className={`p-3 rounded-lg border font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 h-32 resize-none ${isLightMode
                                    ? 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-800'
                                    : 'bg-gray-800 border-gray-700 placeholder-gray-400 text-white'
                                    }`}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-3 rounded-full font-mono font-semibold transition-transform duration-500 transform ${cardVisible
                                ? 'opacity-100 translate-x-0 hover:scale-105'
                                : 'opacity-0 translate-x-[100vw]'
                                } ${isLightMode
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600'
                                    : 'bg-gradient-to-r from-gray-500 to-green-500 text-white hover:from-gray-400 hover:to-gray-600'
                                }`}
                        >
                            LAUNCH CODE BLAST
                        </button>
                    </form>
                    <div className="card-footer mt-4 flex justify-between items-center text-xs italic">
                        <span
                            className={`transition-all duration-500 delay-800 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-[100vw]'
                                } ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}
                        >
                            Type: Debugger
                        </span>
                        <span
                            className={`transition-all duration-500 delay-900 ${cardVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-[100vw]'
                                } ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}
                        >
                            Lvl 99
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;