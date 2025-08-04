import React, { createContext, useReducer, useState, useEffect } from 'react';

const initialListings = [
  {
    id: 1,
    title: "Wooden Dining Table",
    description: "Beautiful solid wood dining table, seats 6. Minor scratches but in great condition.",
    category: "furniture",
    location: "New York, NY",
    image: "https://plus.unsplash.com/premium_photo-1675782999294-6e80ba4149d4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user1",
    posterName: "John Doe"
  },
  {
    id: 2,
    title: "Winter Coat Collection",
    description: "Various sizes of winter coats, gently used. Perfect for donation or personal use.",
    category: "clothes",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1425100599170-85ec4f00a6ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user2",
    posterName: "Jane Smith"
  },
  {
    id: 3,
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand. Helps with ergonomics and cooling.",
    category: "electronics",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user3",
    posterName: "Mike Johnson"
  },
  {
    id: 4,
    title: "Bookshelf",
    description: "5-tier wooden bookshelf. Great condition, moving and can't take it.",
    category: "furniture",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1593430980369-68efc5a5eb34?q=80&w=1185&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user1",
    posterName: "John Doe"
  },
  {
    id: 5,
    title: "Mountain Bike",
    description: "Used mountain bike, recently serviced. Great for trails and city rides.",
    category: "sports",
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1534150034764-046bf225d3fa?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user4",
    posterName: "Emily Carter"
  },
  {
    id: 6,
    title: "Gaming Console",
    description: "Latest-gen gaming console with 2 controllers and some games included.",
    category: "electronics",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user5",
    posterName: "Chris Lee"
  },
  {
    id: 7,
    title: "Leather Sofa",
    description: "Comfortable 3-seater leather sofa, minor wear and tear, smoke-free home.",
    category: "furniture",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user6",
    posterName: "Sarah Green"
  },
  {
    id: 8,
    title: "Kitchen Utensils Set",
    description: "Complete set of stainless steel kitchen utensils, lightly used.",
    category: "kitchen",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1739636863907-703ee2df2451?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 691200000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user7",
    posterName: "Anna White"
  },
    {
    id: 9,
    title: "Wireless Bluetooth Headphones",
    description: "Comfortable over-ear wireless headphones with noise cancellation. Great sound quality, lightly used.",
    category: "electronics",
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 777600000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user8",
    posterName: "Tom Wilson"
    },
  {
    id: 10,
    title: "Baby Stroller",
    description: "Compact and foldable baby stroller, barely used and easy to handle.",
    category: "baby",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1528121108018-743eef2e4a7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 864000000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user9",
    posterName: "Laura Martinez"
  },
  {
    id: 11,
    title: "Classic Novel Collection",
    description: "A set of 10 classic novels in good condition. Perfect for book lovers.",
    category: "books",
    location: "Seattle, WA",
    image: "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user9",
    posterName: "Alice Green"
    },
    {
    id: 12,
    title: "Kids’ Board Games Bundle",
    description: "Includes Monopoly, Scrabble, and more. All games complete and in great condition.",
    category: "toys",
    location: "Denver, CO",
    image: "https://plus.unsplash.com/premium_photo-1718879381673-32a65784d27c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9hcmQlMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user10",
    posterName: "Brian Lee"
    },
    {
    id: 13,
    title: "Compact Blender",
    description: "Small kitchen blender, perfect for smoothies and sauces. Barely used.",
    category: "appliances",
    location: "Austin, TX",
    image: "https://plus.unsplash.com/premium_photo-1663853294058-3f85f18a4bed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user11",
    posterName: "Cynthia Wells"
    },
    {
    id: 14,
    title: "Assorted Household Items",
    description: "A box of various household goods including tools, decorations, and more.",
    category: "other",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1716203045308-e497c8337b96?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXNzb3J0ZWQlMjBIb3VzZWhvbGQlMjBJdGVtc3xlbnwwfHwwfHx8MA%3D%3D",
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    status: "available",
    claims: [],
    posterId: "user12",
    posterName: "David King"
    }

];


// Categories
export const categories = [
    { id: 'all', name: 'All Categories', icon: 'fa-th' },
    { id: 'furniture', name: 'Furniture', icon: 'fa-couch' },
    { id: 'clothes', name: 'Clothes', icon: 'fa-shirt' },
    { id: 'electronics', name: 'Electronics', icon: 'fa-laptop' },
    { id: 'books', name: 'Books', icon: 'fa-book' },
    { id: 'toys', name: 'Toys & Games', icon: 'fa-gamepad' },
    { id: 'appliances', name: 'Appliances', icon: 'fa-blender' },
    { id: 'other', name: 'Other', icon: 'fa-box' }
];

// Reducer for listings
export const listingsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_LISTING':
            return [...state, action.payload];
        case 'ADD_CLAIM':
            return state.map(item => 
                item.id === action.payload.itemId 
                    ? { 
                        ...item, 
                        claims: [...item.claims, action.payload.claim]
                      }
                    : item
            );
        case 'ACCEPT_CLAIM':
            return state.map(item => 
                item.id === action.payload.itemId 
                    ? { 
                        ...item, 
                        status: 'reserved',
                        claims: item.claims.map(claim => 
                            claim.id === action.payload.claimId 
                                ? { ...claim, status: 'accepted' } 
                                : { ...claim, status: 'rejected' }
                        )
                      }
                    : item
            );
        case 'MARK_TAKEN':
            return state.map(item => 
                item.id === action.payload 
                    ? { ...item, status: 'taken' }
                    : item
            );
        case 'REMOVE_CLAIM':
            return state.map(item => 
                item.id === action.payload.itemId 
                    ? { 
                        ...item, 
                        claims: item.claims.filter(claim => claim.claimerId !== action.payload.claimerId)
                    }
                    : item
            );
        case 'DELETE_ITEM':
            return state.filter(item => item.id !== action.payload);
        case 'SET_LISTINGS':
            return action.payload;
        default:
            return state;
    }
};

// Dark Mode Context
export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });
    
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    
    const toggleDarkMode = () => setDarkMode(!darkMode);
    
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// User Context
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('zeroCostUser');
        return saved ? JSON.parse(saved) : null;
    });
    
    const [showUserSetup, setShowUserSetup] = useState(!currentUser);
    
    const setUser = (user) => {
        const updatedUser = {
            ...currentUser,
            ...user
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('zeroCostUser', JSON.stringify(updatedUser));
        setShowUserSetup(false);
    };
    
    return (
        <UserContext.Provider value={{ currentUser, setUser, showUserSetup, setShowUserSetup }}>
            {children}
        </UserContext.Provider>
    );
};

// App Context
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [listings, dispatch] = useReducer(listingsReducer, []);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        location: '',
        sortBy: 'newest'
    });
    
    // Load listings from localStorage on mount
    useEffect(() => {
        const savedListings = localStorage.getItem('zeroCostListings');
        if (savedListings) {
            dispatch({ type: 'SET_LISTINGS', payload: JSON.parse(savedListings) });
        } else {
            dispatch({ type: 'SET_LISTINGS', payload: initialListings });
        }
    }, []);
    
    // Save listings to localStorage when they change
    useEffect(() => {
        if (listings.length > 0) {
            localStorage.setItem('zeroCostListings', JSON.stringify(listings));
        }
    }, [listings]);
    
    // Filter and sort listings
    const filteredListings = React.useMemo(() => {
        let filtered = listings.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                                item.description.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = filters.category === 'all' || item.category === filters.category;
            const matchesLocation = !filters.location || 
                                  item.location.toLowerCase().includes(filters.location.toLowerCase());
            
            return matchesSearch && matchesCategory && matchesLocation;
        });
        
        // Sort listings
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'popular':
                    return b.claims.length - a.claims.length;
                default:
                    return 0;
            }
        });
        
        return filtered;
    }, [listings, filters]);
    
    const addListing = (listing) => {
        dispatch({ type: 'ADD_LISTING', payload: listing });
    };
    
    const addClaim = (itemId, claim) => {
        dispatch({ type: 'ADD_CLAIM', payload: { itemId, claim } });
    };
    
    const acceptClaim = (itemId, claimId) => {
        dispatch({ type: 'ACCEPT_CLAIM', payload: { itemId, claimId } });
    };
    
    const markTaken = (itemId) => {
        dispatch({ type: 'MARK_TAKEN', payload: itemId });
    };
    
    const deleteItem = (itemId) => {
        dispatch({ type: 'DELETE_ITEM', payload: itemId });
    };
    
    const removeClaim = (itemId, claimerId) => {
        dispatch({ type: 'REMOVE_CLAIM', payload: { itemId, claimerId } });
    };

    return (
        <AppContext.Provider value={{
            listings: filteredListings,
            allListings: listings,
            filters,
            setFilters,
            addListing,
            addClaim,
            acceptClaim,
            markTaken,
            deleteItem,
            removeClaim
        }}>
            {children}
        </AppContext.Provider>
    );
};