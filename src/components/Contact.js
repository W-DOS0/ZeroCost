import { useState } from 'react';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
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
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        // In a real app, you would send this data to a backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-12 text-white">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl opacity-90">We'd love to hear from you</p>
                </div>
                
                {/* Content */}
                <div className="p-8">
                    {isSubmitted && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl mr-3"></i>
                                <p className="text-green-800 dark:text-green-200 font-medium">
                                    Thank you for your message! We'll get back to you soon.
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                                            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email *
                                    </label>
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
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                                            errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="What's this about?"
                                    />
                                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                                            errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="Your message..."
                                    />
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                        
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in touch</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
                                        <i className="fas fa-envelope text-primary-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">hello@zerocost.random</p>
                                        <p className="text-gray-600 dark:text-gray-400">support@zerocost.random</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
                                        <i className="fas fa-phone text-primary-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">+1 (555) random numbers</p>
                                        <p className="text-gray-600 dark:text-gray-400">Mon-Fri 9AM-5PM EST</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
                                        <i className="fas fa-map-marker-alt text-primary-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                                        <p className="text-gray-600 dark:text-gray-400">123 Community Street</p>
                                        <p className="text-gray-600 dark:text-gray-400">San Francisco, CA 94102</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
                                        <i className="fas fa-clock text-primary-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                                        <p className="text-gray-600 dark:text-gray-400">We typically respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* FAQ Section */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                                <div className="space-y-3">
                                    <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                            Is ZeroCost really free?
                                        </summary>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Yes! ZeroCost is completely free to use. We never charge for posting or claiming items.
                                        </p>
                                    </details>
                                    
                                    <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                            How do I know if someone is trustworthy?
                                        </summary>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            We encourage users to meet in public places and trust their instincts. Always prioritize your safety.
                                        </p>
                                    </details>
                                    
                                    <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                            Can I post anything on ZeroCost?
                                        </summary>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            We allow most items as long as they're legal and safe. Please review our community guidelines.
                                        </p>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};