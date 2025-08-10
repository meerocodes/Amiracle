import React from 'react';

const Footer = () => {
    return (
        <footer className="glass-dark h-12 flex justify-center items-center font-mono text-sm text-gray-200 border-t border-white/10">
            <div className="flex items-center gap-2">
                <span className="text-blue-400">©</span>
                <span>2025 Amir</span>
                <span className="text-blue-400">•</span>
                <span className="text-xs text-gray-400">Built with ❤️ and React</span>
            </div>
        </footer>
    );
};

export default Footer;
