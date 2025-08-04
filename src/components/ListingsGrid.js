import React, { useContext } from 'react';
import { AppContext } from '../contexts';
import { ListingCard } from './ListingCard';

export const ListingsGrid = () => {
    const { listings } = useContext(AppContext);
    
    if (listings.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <i className="fas fa-box-open text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No items found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your filters or be the first to post an item!
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
};