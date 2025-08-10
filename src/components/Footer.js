import React, { useState, useEffect } from 'react';

const Footer = ({ isLightMode }) => {
    const [currentYear] = useState(new Date().getFullYear());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className={`relative py-8 font-mono text-sm border-t transition-all duration-500 ${
            isLightMode 
                ? 'bg-gradient-to-r from-gray-50 to-white border-gray-200 text-gray-700' 
                : 'bg-gradient-to-r from-gray-900 to-black border-gray-800 text-gray-300'
        } backdrop-blur-xl`}>
            
            <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
                {/* Main footer content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left side - Copyright and branding */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isLightMode 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                            }`}>
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-semibold ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
                                        © {currentYear} Amir
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <span>Built with</span>
                                    <span className="text-red-500 animate-pulse">❤️</span>
                                    <span>and</span>
                                    <span className={`font-semibold ${isLightMode ? 'text-blue-600' : 'text-blue-400'}`}>
                                        React
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Social links */}
                    <div className="flex items-center gap-4">
                        <span className={`text-xs ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            Connect with me
                        </span>
                        <div className="flex items-center gap-3">
                            <a 
                                href="https://github.com/meerocodes" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                                    isLightMode 
                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white' 
                                        : 'bg-gray-800 text-gray-300 hover:bg-white hover:text-gray-800'
                                } shadow-lg hover:shadow-xl`}
                            >
                                <i className="fa-brands fa-github text-sm"></i>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/meerocodes" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                                    isLightMode 
                                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white' 
                                        : 'bg-blue-900 text-blue-300 hover:bg-blue-500 hover:text-white'
                                } shadow-lg hover:shadow-xl`}
                            >
                                <i className="fa-brands fa-linkedin text-sm"></i>
                            </a>
                            <a 
                                href="mailto:amir.ar@outlook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                                    isLightMode 
                                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white' 
                                        : 'bg-purple-900 text-purple-300 hover:bg-purple-500 hover:text-white'
                                } shadow-lg hover:shadow-xl`}
                            >
                                <i className="fa-solid fa-envelope text-sm"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
