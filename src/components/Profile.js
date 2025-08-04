import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, DarkModeContext } from '../contexts';
import { ConfirmationModal } from './ConfirmationModal';

export const Profile = () => {
    const { currentUser, setUser } = useContext(UserContext);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        bio: currentUser?.bio || '',
        location: currentUser?.location || ''
    });
    const [errors, setErrors] = useState({});
    
    if (!currentUser) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <i className="fas fa-user-slash text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Please log in to view your profile
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSave = () => {
        if (!validateForm()) return;
        
        const updatedUser = {
            ...currentUser,
            ...formData
        };
        
        setUser(updatedUser);
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setFormData({
            name: currentUser.name,
            email: currentUser.email || '',
            bio: currentUser.bio || '',
            location: currentUser.location || ''
        });
        setIsEditing(false);
        setErrors({});
    };
    
    const handleDeleteAccount = () => {
        localStorage.removeItem('zeroCostUser');
        setUser(null);
        setShowDeleteModal(false);
        navigate('/');
    };
    
    const getUserStats = () => {
        // This would typically come from the listings data
        // For now, we'll return mock data
        return {
            itemsPosted: 0,
            itemsClaimed: 0,
            itemsGiven: 0
        };
    };
    
    const stats = getUserStats();
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-8 text-white">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <i className="fas fa-user text-4xl text-primary-600 dark:text-primary-400"></i>
                        </div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`text-2xl font-bold bg-transparent border-b border-white placeholder-gray-300 focus:outline-none ${
                                        errors.name ? 'border-red-300' : ''
                                    }`}
                                    placeholder="Your name"
                                />
                            ) : (
                                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                            )}
                            <p className="text-primary-100">Member since {new Date(currentUser.id.split('_')[1]).toLocaleDateString()}</p>
                        </div>
                        <div>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <i className="fas fa-edit mr-2"></i>
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="fas fa-save mr-2"></i>
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Profile Content */}
                <div className="p-6">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                            <i className="fas fa-box text-2xl text-primary-600 dark:text-primary-400 mb-2"></i>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Items Posted</h3>
                            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.itemsPosted}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                            <i className="fas fa-hand-holding-heart text-2xl text-primary-600 dark:text-primary-400 mb-2"></i>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Items Claimed</h3>
                            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.itemsClaimed}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                            <i className="fas fa-gift text-2xl text-primary-600 dark:text-primary-400 mb-2"></i>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Items Given</h3>
                            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.itemsGiven}</p>
                        </div>
                    </div>
                    
                    {/* Profile Information */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            {isEditing ? (
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    {currentUser.email || 'No email provided'}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Location
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="City, Country"
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    {currentUser.location || 'No location provided'}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Bio
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    {currentUser.bio || 'No bio provided'}
                                </p>
                            )}
                        </div>
                        
                        {/* Preferences */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
                                    </div>
                                    <button
                                        onClick={toggleDarkMode}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            darkMode ? 'bg-primary-600' : 'bg-gray-200'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                darkMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Danger Zone */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <i className="fas fa-trash mr-2"></i>
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Delete Account Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                title="Delete Account"
                message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
                confirmText="Delete Account"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                icon="fas fa-user-times"
            />
        </div>
    );
};