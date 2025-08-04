import React, { useState, useContext } from 'react';
import { AppContext, UserContext, categories } from '../contexts';
import { ClaimsModal } from './ClaimsModal';
import { ConfirmationModal } from './ConfirmationModal';

export const ListingCard = ({ listing }) => {
    const { currentUser } = useContext(UserContext);
    const { addClaim, markTaken, deleteItem, removeClaim } = useContext(AppContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showClaimsModal, setShowClaimsModal] = useState(false);
    const [showUnclaimModal, setShowUnclaimModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTakenModal, setShowTakenModal] = useState(false);
    
    const handleClaim = () => {
        if (listing.status !== 'available') return;
        
        const claim = {
            id: `claim_${Date.now()}`,
            claimerId: currentUser.id,
            claimerName: currentUser.name,
            claimedAt: new Date().toISOString(),
            status: 'pending'
        };
        
        addClaim(listing.id, claim);
    };
    
    const handleUnclaim = () => {
        removeClaim(listing.id, currentUser.id);
        setShowUnclaimModal(false);
    };
    
    const handleMarkTaken = () => {
        markTaken(listing.id);
        setShowTakenModal(false);
    };
    
    const handleDelete = () => {
        deleteItem(listing.id);
        setShowDeleteModal(false);
    };
    
    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : 'fa-box';
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };
    
    const isPoster = currentUser && currentUser.id === listing.posterId;
    const hasUserClaimed = listing.claims.some(c => c.claimerId === currentUser.id);
    const acceptedClaim = listing.claims.find(c => c.status === 'accepted');
    
    return (
        <>
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover ${
                listing.status === 'taken' ? 'opacity-50' : ''
            }`}>
                {/* Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fas fa-image text-gray-400 dark:text-gray-500 text-3xl"></i>
                        </div>
                    )}
                    <img
                        src={listing.image}
                        alt={listing.title}
                        className={`w-full h-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    
                    {/* Status badges */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1">
                        <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            <i className={`fas ${getCategoryIcon(listing.category)} mr-1`}></i>
                            {categories.find(c => c.id === listing.category)?.name}
                        </span>
                        
                        {listing.status === 'reserved' && (
                            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                                <i className="fas fa-clock mr-1"></i>
                                Reserved
                            </span>
                        )}
                        
                        {listing.status === 'taken' && (
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                                <i className="fas fa-check mr-1"></i>
                                Taken
                            </span>
                        )}
                    </div>
                    
                    {/* Claims count */}
                    {listing.claims.length > 0 && (
                        <div className="absolute bottom-2 left-2">
                            <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                                <i className="fas fa-users mr-1"></i>
                                {listing.claims.length} claim{listing.claims.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                    
                    {/* Delete button for item owner */}
                    {isPoster && (
                        <div className="absolute top-2 left-2">
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                aria-label="Delete item"
                            >
                                <i className="fas fa-trash text-sm"></i>
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {listing.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {listing.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {listing.location}
                        </span>
                        <span>
                            <i className="fas fa-clock mr-1"></i>
                            {formatDate(listing.createdAt)}
                        </span>
                    </div>
                    
                    {/* Poster info */}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <i className="fas fa-user-circle mr-2"></i>
                        Posted by {listing.posterName}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="space-y-2">
                        {isPoster ? (
                            <div className="flex space-x-2">
                                {listing.status === 'available' && listing.claims.length > 0 && (
                                    <button
                                        onClick={() => setShowClaimsModal(true)}
                                        className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors ripple"
                                    >
                                        <i className="fas fa-users mr-2"></i>
                                        Review Claims ({listing.claims.length})
                                    </button>
                                )}
                                
                                {listing.status === 'reserved' && (
                                    <>
                                        <button
                                            onClick={() => setShowTakenModal(true)}
                                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors ripple"
                                        >
                                            <i className="fas fa-check mr-2"></i>
                                            Mark as Taken
                                        </button>
                                    </>
                                )}
                                
                                {listing.status === 'available' && listing.claims.length === 0 && (
                                    <div className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 py-2 px-4 rounded-lg text-center">
                                        <i className="fas fa-users mr-2"></i>
                                        No claims yet
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {hasUserClaimed && listing.status === 'available' ? (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setShowUnclaimModal(true)}
                                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors ripple"
                                        >
                                            <i className="fas fa-times-circle mr-2"></i>
                                            Unclaim
                                        </button>
                                        <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 flex items-center">
                                            <i className="fas fa-check-circle text-green-600 dark:text-green-400 mr-2"></i>
                                            <span className="text-sm text-green-800 dark:text-green-200">Claimed</span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleClaim}
                                        disabled={listing.status !== 'available' || hasUserClaimed}
                                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ripple ${
                                            listing.status !== 'available' || hasUserClaimed
                                                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                : 'bg-primary-600 text-white hover:bg-primary-700'
                                        }`}
                                    >
                                        {listing.status === 'reserved' ? (
                                            <>
                                                <i className="fas fa-lock mr-2"></i>
                                                Item Reserved
                                            </>
                                        ) : listing.status === 'taken' ? (
                                            <>
                                                <i className="fas fa-check mr-2"></i>
                                                Item Taken
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-hand-holding-heart mr-2"></i>
                                                Claim This Item
                                            </>
                                        )}
                                    </button>
                                )}
                            </>
                        )}
                        
                        {/* Show accepted claim info */}
                        {acceptedClaim && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                                <p className="font-medium text-green-800 dark:text-green-200">
                                    Reserved for {acceptedClaim.claimerName}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Claims Modal */}
            {showClaimsModal && (
                <ClaimsModal 
                    listing={listing} 
                    onClose={() => setShowClaimsModal(false)} 
                />
            )}
            
            {/* Unclaim Confirmation Modal */}
            <ConfirmationModal
                isOpen={showUnclaimModal}
                onClose={() => setShowUnclaimModal(false)}
                onConfirm={handleUnclaim}
                title="Unclaim Item"
                message="Are you sure you want to unclaim this item? This will remove your claim and other users will be able to claim it."
                confirmText="Unclaim"
                cancelText="Keep Claimed"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                icon="fas fa-hand-paper"
            />
            
            {/* Mark as Taken Confirmation Modal */}
            <ConfirmationModal
                isOpen={showTakenModal}
                onClose={() => setShowTakenModal(false)}
                onConfirm={handleMarkTaken}
                title="Mark as Taken"
                message="Are you sure this item has been taken? This will mark the item as no longer available."
                confirmText="Mark as Taken"
                confirmButtonClass="bg-green-600 hover:bg-green-700"
                icon="fas fa-check-circle"
            />
            
            {/* Delete Item Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Item"
                message="Are you sure you want to delete this item? This action cannot be undone and all claims will be removed."
                confirmText="Delete"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                icon="fas fa-trash-alt"
            />
        </>
    );
};