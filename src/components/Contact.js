import React from 'react';

const Contact = ({ isLightMode }) => {
    return (
        <section
            id="contact"
            className={`relative border-t-8 transition-all duration-500 bg-cover min-h-screen ${isLightMode
                    ? 'bg-[url(/assets/lightMode/lightSectionImage3.png)]'
                    : 'bg-[url(/assets/sectionImage3.png)]'
                }`}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <div className="relative w-4/5 mx-auto flex flex-col items-center">
                <h2
                    className={`mt-12 text-4xl font-mono font-bold drop-shadow-lg ${isLightMode
                            ? 'text-gray-900 underline decoration-gray-700'
                            : 'text-white'
                        }`}
                >
                    {'<GET IN TOUCH />'}
                </h2>
                <form
                    action="https://formspree.io/f/xeqwljbo"
                    method="POST"
                    className={`mt-12 w-full max-w-lg rounded-lg p-8 backdrop-blur-sm shadow-lg transition-all duration-300 border border-dashed ${isLightMode
                            ? 'bg-gray-900/90 text-white border-gray-700'
                            : 'bg-white/90 text-black border-gray-300'
                        }`}
                >
                    <p className="font-mono text-xs mb-4">
                        // Contact Form
                    </p>
                    <div className="form-group flex flex-col mb-5">
                        <label htmlFor="name" className="sr-only">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="// Name"
                            required
                            className={`p-3 rounded-lg border font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${isLightMode
                                    ? 'bg-gray-800 border-gray-700 placeholder-gray-300 text-white'
                                    : 'bg-white border-gray-300 placeholder-gray-500 text-black'
                                }`}
                        />
                    </div>
                    <div className="form-group flex flex-col mb-5">
                        <label htmlFor="email" className="sr-only">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="// Email"
                            required
                            className={`p-3 rounded-lg border font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${isLightMode
                                    ? 'bg-gray-800 border-gray-700 placeholder-gray-300 text-white'
                                    : 'bg-white border-gray-300 placeholder-gray-500 text-black'
                                }`}
                        />
                    </div>
                    <div className="form-group flex flex-col mb-5">
                        <label htmlFor="message" className="sr-only">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="// Message"
                            required
                            className={`p-3 rounded-lg border font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 h-40 resize-none ${isLightMode
                                    ? 'bg-gray-800 border-gray-700 placeholder-gray-300 text-white'
                                    : 'bg-white border-gray-300 placeholder-gray-500 text-black'
                                }`}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg font-mono font-semibold transition-transform duration-300 transform hover:scale-105 ${isLightMode
                                ? 'bg-gradient-to-r from-black to-gray-900 text-white hover:from-gray-800 hover:to-black'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                            }`}
                    >
                        SEND
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
