import React, { useState, useEffect, useRef } from 'react';
// Import your new background images
import LightContactBg from '../assets/lightMode/lightSectionImage3.webp';
import DarkContactBg from '../assets/darkmode/sectionImage3.webp';

const Contact = ({ isLightMode }) => {
    const titleRef = useRef(null);
    const cardRef = useRef(null);
    const [titleVisible, setTitleVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');
        
        try {
            const response = await fetch('https://formspree.io/f/xeqwljbo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(''), 3000);
        }
    };
    return (
        <section
            id="contact"
            style={{
                backgroundImage: `url(${isLightMode ? LightContactBg : DarkContactBg})`
            }}
            className="relative overflow-x-hidden border-t-8 section-transition bg-cover min-h-screen"
        >
            <div className="absolute inset-0"></div>
            <div className="relative w-4/5 mx-auto flex flex-col items-center">
                <h2
                    ref={titleRef}
                    className={`p-10 text-4xl font-mono font-bold drop-shadow-lg transition-all duration-1000 delay-100 ${titleVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-[100vw]'
                        } ${isLightMode ? 'text-gray-900' : 'gradient-text'}`}
                >
                    {'<GET IN TOUCH />'}
                </h2>
                <div className={`w-24 h-1 rounded-full mb-8 transition-all duration-1000 delay-200 ${titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} ${isLightMode ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}></div>
                <div
                    ref={cardRef}
                    className={`pokemon-card relative rounded-2xl p-6 mt-8 w-full max-w-lg shadow-2xl transition-all duration-500 card-hover ${isLightMode
                            ? 'glass border-2 border-white/30'
                            : 'glass-dark border-2 border-white/20'
                        } backdrop-blur-lg`}
                >
                    <div className="card-header flex justify-between items-center mb-6">
                        <h2
                            className={`font-bold font-mono text-2xl drop-shadow-lg transition-all duration-1000 delay-200 ${cardVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-[100vw]'
                                } ${isLightMode ? 'text-black' : 'gradient-text'}`}
                        >
                            [Code Champion]
                        </h2>
                        <div
                            className={`card-stats text-right transition-all duration-1000 delay-300 ${cardVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-[100vw]'
                                }`}
                        >
                            <span className={`block font-bold text-sm ${isLightMode ? 'text-green-700' : 'text-green-400'}`}>HP</span>
                            <span className={`block font-extrabold text-xl ${isLightMode ? 'text-green-800' : 'text-green-300'}`}>120</span>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className={`w-full rounded-xl p-6 backdrop-blur-sm shadow-inner transition-all duration-300 border-2 ${isLightMode
                                ? 'glass text-black border-white/30'
                                : 'glass-dark text-white border-white/20'
                            } space-y-4`}
                    >
                        <div
                            className={`form-group flex flex-col transition-all duration-1000 delay-400 ${cardVisible
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
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="// Name"
                                required
                                className={`p-4 rounded-full border-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 focus:scale-105 ${isLightMode
                                        ? 'glass border-white/30 placeholder-gray-500 text-gray-800'
                                        : 'glass-dark border-white/20 placeholder-gray-400 text-white'
                                    } backdrop-blur-sm`}
                            />
                        </div>
                        <div
                            className={`form-group flex flex-col transition-all duration-1000 delay-500 ${cardVisible
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
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="// Email"
                                required
                                className={`p-4 rounded-full border-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 focus:scale-105 ${isLightMode
                                        ? 'glass border-white/30 placeholder-gray-500 text-gray-800'
                                        : 'glass-dark border-white/20 placeholder-gray-400 text-white'
                                    } backdrop-blur-sm`}
                            />
                        </div>
                        <div
                            className={`form-group flex flex-col transition-all duration-1000 delay-600 ${cardVisible
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
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="// Message"
                                required
                                className={`p-4 rounded-xl border-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-32 resize-none hover:scale-105 focus:scale-105 ${isLightMode
                                        ? 'glass border-white/30 placeholder-gray-500 text-gray-800'
                                        : 'glass-dark border-white/20 placeholder-gray-400 text-white'
                                    } backdrop-blur-sm`}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full p-4 rounded-full font-mono font-semibold transition-all duration-500 transform btn-modern ${cardVisible
                                    ? 'opacity-100 translate-x-0 hover:scale-105 pulse-glow'
                                    : 'opacity-0 translate-x-[100vw]'
                                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} ${isLightMode
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                                } shadow-lg`}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                    LAUNCHING...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-rocket mr-2"></i>
                                    LAUNCH CODE BLAST
                                </>
                            )}
                        </button>
                        
                        {submitStatus && (
                            <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                                submitStatus === 'success' 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                                {submitStatus === 'success' ? (
                                    <>
                                        <i className="fa-solid fa-check-circle mr-2"></i>
                                        Message sent successfully!
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-exclamation-triangle mr-2"></i>
                                        Failed to send message. Please try again.
                                    </>
                                )}
                            </div>
                        )}
                    </form>
                    <div className="card-footer mt-6 flex justify-between items-center text-sm italic">
                        <span
                            className={`transition-all duration-1000 delay-800 ${cardVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-[100vw]'
                                } ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}
                        >
                            Type: Debugger
                        </span>
                        <span
                            className={`transition-all duration-1000 delay-900 ${cardVisible
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
