import { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { ListingsGrid } from './components/ListingsGrid';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AddListingForm } from './components/AddListingForm';
import { UserSetupModal } from './components/UserSetupModal';
import { Profile } from './components/Profile';
import { About } from './components/About';
import { Contact } from './components/Contact';

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { showUserSetup } = useContext(UserContext);
  
  return (
    <Router >
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4 animate-fade-in">
                      Give. Take. Share.
                    </h2>
                    <p className="text-xl mb-8 animate-fade-in">
                      Join our community in reducing waste and helping others
                    </p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors ripple animate-bounce-in"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Post Your First Item
                    </button>
                  </div>
                </section>
                
                <SearchFilters />
                <ListingsGrid />
              </>
            } />
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-2">
                <i className="fas fa-recycle text-primary-400 mr-2"></i>
                ZeroCost - Making the world a better place, one free item at a time
              </p>
              <p className="text-gray-400 text-sm">
                © 2025 ZeroCost. Built with ❤️ for the community.
              </p>
            </div>
          </div>
        </footer>
        
        {showUserSetup && <UserSetupModal />}
        {showAddForm && <AddListingForm onClose={() => setShowAddForm(false)} />}
        <FloatingActionButton onClick={() => setShowAddForm(true)} />
      </div>
    </Router>
  );
};

export default App;