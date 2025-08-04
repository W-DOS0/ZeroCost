import React, { useContext } from 'react';
import { AppContext } from '../contexts';

export const ClaimsModal = ({ listing, onClose }) => {
    const { acceptClaim } = useContext(AppContext);
    
    const handleAcceptClaim = (claimId) => {
        acceptClaim(listing.id, claimId);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Claims for {listing.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Close"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    {listing.claims.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                            No claims yet for this item.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {listing.claims.map(claim => (
                                <div 
                                    key={claim.id} 
                                    className={`p-4 rounded-lg border ${
                                        claim.status === 'accepted' 
                                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                                            : claim.status === 'rejected'
                                            ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                                            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {claim.claimerName}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Claimed {new Date(claim.claimedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {claim.status === 'accepted' && (
                                                <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                                                    Accepted
                                                </span>
                                            )}
                                            {claim.status === 'rejected' && (
                                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                                                    Rejected
                                                </span>
                                            )}
                                            {claim.status === 'pending' && listing.status === 'available' && (
                                                <button
                                                    onClick={() => handleAcceptClaim(claim.id)}
                                                    className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                                                >
                                                    Accept
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};