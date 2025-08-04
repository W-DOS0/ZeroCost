import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-12 text-white">
                    <h1 className="text-4xl font-bold mb-4">About ZeroCost</h1>
                    <p className="text-xl opacity-90">Building a sustainable community through sharing</p>
                </div>
                
                {/* Content */}
                <div className="p-8">
                    {/* Mission Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    ZeroCost is more than just a platform - it's a movement towards a more sustainable and community-oriented way of living. We believe that one person's unwanted item can be another person's treasure.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    By facilitating the free exchange of goods within communities, we're reducing waste, saving money, and building stronger connections between neighbors.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <i className="fas fa-recycle text-primary-600 text-2xl mr-3"></i>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Environmental Impact</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Every item shared through ZeroCost is one less item in a landfill. Together, we're making a real difference in reducing waste and promoting a circular economy.
                                </p>
                            </div>
                        </div>
                    </section>
                    
                    {/* How It Works */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-plus text-primary-600 text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Post Items</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Share items you no longer need with your community
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-hand-holding-heart text-primary-600 text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Browse & Claim</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Find items you need and claim them for free
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-exchange-alt text-primary-600 text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Connect & Share</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Meet your neighbors and build community bonds
                                </p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Values */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <i className="fas fa-leaf text-green-600 text-3xl mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sustainability</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Promoting environmental responsibility through reuse
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <i className="fas fa-users text-blue-600 text-3xl mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Building stronger connections between neighbors
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <i className="fas fa-hand-holding-usd text-yellow-600 text-3xl mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Making resources available to everyone, regardless of income
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <i className="fas fa-heart text-red-600 text-3xl mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trust</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Creating a safe and reliable platform for sharing
                                </p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Stats */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Impact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 text-center">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">10,000+</div>
                                <p className="text-gray-600 dark:text-gray-400">Items Shared</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">5,000+</div>
                                <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
                                <p className="text-gray-600 dark:text-gray-400">Communities</p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Call to Action */}
                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Community</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Be part of the movement towards a more sustainable and connected world.
                        </p>
                        <Link 
                            to="/" 
                            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-block"
                        >
                            Start Sharing Today
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};