import React, { useState } from 'react';
import { UserContext } from '../contexts';

export const UserSetupModal = () => {
    const { setUser } = React.useContext(UserContext);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }
        
        const user = {
            id: `user_${Date.now()}`,
            name: name.trim()
        };
        
        setUser(user);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full animate-bounce-in">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Welcome to ZeroCost!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Please enter your name to get started with sharing and claiming free items.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 ${
                                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="e.g., John Doe"
                            />
                            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors ripple"
                        >
                            Get Started
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};