import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DarkModeContext, UserContext } from '../contexts';

export const Header = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(UserContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <i className="fas fa-recycle text-primary-600 text-2xl mr-2"></i>
                            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">ZeroCost</h1>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link 
                            to="/" 
                            className={`${
                                location.pathname === '/' 
                                    ? 'text-primary-600 dark:text-primary-400' 
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                            } transition-colors`}
                        >
                            Browse
                        </Link>
                        <Link 
                            to="/about" 
                            className={`${
                                location.pathname === '/about' 
                                    ? 'text-primary-600 dark:text-primary-400' 
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                            } transition-colors`}
                        >
                            About
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`${
                                location.pathname === '/contact' 
                                    ? 'text-primary-600 dark:text-primary-400' 
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                            } transition-colors`}
                        >
                            Contact
                        </Link>
                    </nav>
                    
                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        {/* User info */}
                        {currentUser && (
                            <Link 
                                to="/profile" 
                                className="hidden sm:flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <i className="fas fa-user-circle text-gray-600 dark:text-gray-400"></i>
                                <span>{currentUser.name}</span>
                            </Link>
                        )}
                        
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            <i className={`fas ${darkMode ? 'fa-sun text-yellow-500' : 'fa-moon text-gray-600'}`}></i>
                        </button>
                        
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            <i className="fas fa-bars text-gray-600 dark:text-gray-300"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden animate-slide-up">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <Link 
                            to="/" 
                            className={`block px-3 py-2 rounded-md ${
                                location.pathname === '/' 
                                    ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Browse
                        </Link>
                        <Link 
                            to="/about" 
                            className={`block px-3 py-2 rounded-md ${
                                location.pathname === '/about' 
                                    ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`block px-3 py-2 rounded-md ${
                                location.pathname === '/contact' 
                                    ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        {currentUser && (
                            <Link 
                                to="/profile" 
                                className="px-3 py-2 flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <i className="fas fa-user-circle text-gray-600 dark:text-gray-400"></i>
                                <span>{currentUser.name}</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};