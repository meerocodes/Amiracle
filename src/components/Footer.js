import React, { useState, useEffect } from 'react';

const Footer = ({ isLightMode }) => {
    const [currentYear] = useState(new Date().getFullYear());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className={`relative h-20 flex justify-center items-center font-mono text-sm border-t-2 transition-all duration-500 ${
            isLightMode 
                ? 'glass border-white/30 text-gray-800 bg-gradient-to-r from-gray-50/80 to-white/80' 
                : 'glass-dark border-white/20 text-gray-200 bg-gradient-to-r from-gray-900/80 to-black/80'
        } backdrop-blur-xl`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-32 h-32 rounded-full opacity-10 animate-pulse ${
                            isLightMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        style={{
                            left: `${20 + (i * 30)}%`,
                            top: '-50%',
                            animationDelay: `${i * 2}s`,
                            animationDuration: '4s'
                        }}
                    />
                ))}
            </div>
            
            <div className={`relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
                <div className="flex items-center gap-2">
                    <span className={`text-lg ${isLightMode ? 'text-blue-600' : 'text-blue-400'} animate-pulse`}>©</span>
                    <span className="font-semibold">{currentYear} Amir</span>
                </div>
                
                <div className={`hidden sm:block w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
                
                <div className="flex items-center gap-2">
                    <span className="text-xs">Built with</span>
                    <span className={`text-red-500 animate-pulse text-sm`}>❤️</span>
                    <span className="text-xs">and</span>
                    <span className={`font-bold ${isLightMode ? 'text-blue-600' : 'text-blue-400'}`}>React</span>
                </div>
                
                <div className={`hidden sm:block w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
                
                <div className="flex items-center gap-3">
                    <a 
                        href="https://github.com/meerocodes" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`hover:scale-125 transition-all duration-300 ${
                            isLightMode ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-blue-400'
                        }`}
                    >
                        <i className="fa-brands fa-github text-sm"></i>
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/meerocodes" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`hover:scale-125 transition-all duration-300 ${
                            isLightMode ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-blue-400'
                        }`}
                    >
                        <i className="fa-brands fa-linkedin text-sm"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
