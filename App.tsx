import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import PropertyDetails from './components/PropertyDetails';
import type { Property, User } from './types';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './components/ContactPage';

// Moved from FeaturedProperties to be accessible at the App level
const initialProperties: Property[] = [];


const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'saved'>('all');
  const [currentPage, setCurrentPage] = useState<'home' | 'signin' | 'signup' | 'admin' | 'contact'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Effect to load properties from localStorage or initialize
  useEffect(() => {
    try {
      const storedProperties = window.localStorage.getItem('allProperties');
      if (storedProperties) {
        setProperties(JSON.parse(storedProperties));
      } else {
        setProperties(initialProperties);
        window.localStorage.setItem('allProperties', JSON.stringify(initialProperties));
      }
    } catch (error) {
      console.error("Could not load properties from localStorage", error);
      setProperties(initialProperties);
    }
  }, []);

  // Effect to persist user session on page load
  useEffect(() => {
    try {
        const storedUser = window.localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Could not load current user from localStorage", error);
    }
  }, []);

  // Effect to load saved properties when user logs in
  useEffect(() => {
    if (currentUser) {
      try {
        const saved = window.localStorage.getItem(`savedProperties_${currentUser.email}`);
        setSavedPropertyIds(saved ? JSON.parse(saved) : []);
      } catch (error) {
        console.error("Could not parse saved properties for user", error);
        setSavedPropertyIds([]);
      }
    } else {
      // Clear saved properties when user logs out
      setSavedPropertyIds([]);
    }
  }, [currentUser]);

  // Effect to save properties to localStorage when the list changes for a logged-in user
  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(`savedProperties_${currentUser.email}`, JSON.stringify(savedPropertyIds));
    }
  }, [savedPropertyIds, currentUser]);
  
  // Effect to handle body scroll when modal is open
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProperty]);

  // Protect admin route
  useEffect(() => {
    if (currentPage === 'admin' && currentUser?.role !== 'admin') {
      setCurrentPage('home');
    }
  }, [currentPage, currentUser]);

  const handleAddProperty = (newPropertyData: Omit<Property, 'id'>) => {
    setProperties(prevProperties => {
      const newProperty: Property = {
        ...newPropertyData,
        id: Date.now(), // Unique ID based on timestamp
      };
      const updatedProperties = [...prevProperties, newProperty];
      window.localStorage.setItem('allProperties', JSON.stringify(updatedProperties));
      alert('Property added successfully!');
      return updatedProperties;
    });
  };
  
  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(prevProperties => {
      const updatedProperties = prevProperties.map(p =>
        p.id === updatedProperty.id ? updatedProperty : p
      );
      window.localStorage.setItem('allProperties', JSON.stringify(updatedProperties));
      alert('Property updated successfully!');
      return updatedProperties;
    });
  };

  const handleDeleteProperty = (id: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prevProperties => {
        const updatedProperties = prevProperties.filter(p => p.id !== id);
        window.localStorage.setItem('allProperties', JSON.stringify(updatedProperties));
        return updatedProperties;
      });
    }
  };

  const handleSaveToggle = (id: number) => {
    if (!currentUser) {
      alert('Please sign in to save properties.');
      // Close modal if open before navigating
      if (selectedProperty) setSelectedProperty(null);
      handlePageNavigate('signin');
      return;
    }
    setSavedPropertyIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(prevId => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  
  const handleSectionNavigate = (view: 'all' | 'saved') => {
    if (view === 'saved' && !currentUser) {
      handlePageNavigate('signin');
      return;
    }
    setViewMode(view);
    // If not on the home page, switch to it first
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Use a timeout to allow the home page to render before scrolling
      setTimeout(() => {
        const propertiesSection = document.getElementById('properties-section');
        if (propertiesSection) {
          propertiesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
       const propertiesSection = document.getElementById('properties-section');
        if (propertiesSection) {
          propertiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handlePageNavigate = (page: 'home' | 'signin' | 'signup' | 'admin' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }
  
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleDeselectProperty = () => {
    setSelectedProperty(null);
  };

  const handleSignUp = (name: string, email: string, password: string): { success: boolean, message: string } => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some((user: any) => user.email === email);
    if (userExists) {
      return { success: false, message: 'User with this email already exists.' };
    }
    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return { success: true, message: 'Sign up successful! Please sign in.' };
  };

  const handleSignIn = (email: string, password: string): { success: boolean, message: string } => {
    // Hardcoded admin credentials check
    if (email.toLowerCase() === 'muhdakram36@gmail.com' && password === 'akram1992') {
      const adminUser: User = { name: 'Admin Akram', email, role: 'admin' };
      setCurrentUser(adminUser);
      window.localStorage.setItem('currentUser', JSON.stringify(adminUser));
      handlePageNavigate('admin');
      return { success: true, message: 'Admin sign in successful!' };
    }

    // Regular user check
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: any) => u.email === email && u.password === password);
    if (user) {
      const loggedInUser: User = { name: user.name, email: user.email, role: 'user' };
      setCurrentUser(loggedInUser);
      window.localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      handlePageNavigate('home');
      return { success: true, message: 'Sign in successful!' };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    window.localStorage.removeItem('currentUser');
    handlePageNavigate('home');
  };
  
  const handleContactSubmit = (name: string, email: string, subject: string, message: string): { success: boolean; message: string; } => {
    try {
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = { name, email, subject, message, date: new Date().toISOString() };
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      return { success: true, message: 'Your message has been sent successfully!' };
    } catch (error) {
      console.error('Failed to save contact submission', error);
      return { success: false, message: 'Failed to send message. Please try again.' };
    }
  };


  const propertiesToDisplay = viewMode === 'saved'
    ? properties.filter(p => savedPropertyIds.includes(p.id))
    : properties;

  const renderCurrentPage = () => {
    const header = (
        <Header 
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onSectionNavigate={handleSectionNavigate} 
          onPageNavigate={handlePageNavigate}
          onMenuOpen={() => setIsSidebarOpen(true)}
        />
    );
    const sidebar = (
       <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onSectionNavigate={handleSectionNavigate}
          onPageNavigate={handlePageNavigate}
        />
    );


    switch (currentPage) {
      case 'admin':
        return <AdminDashboard 
            onSignOut={handleSignOut} 
            onNavigateHome={() => handlePageNavigate('home')} 
            properties={properties}
            onAddProperty={handleAddProperty}
            onUpdateProperty={handleUpdateProperty}
            onDeleteProperty={handleDeleteProperty}
        />;
      case 'signin':
        return <SignIn 
          onNavigateHome={() => handlePageNavigate('home')} 
          onNavigateSignUp={() => handlePageNavigate('signup')}
          onSignIn={handleSignIn}
        />;
      case 'signup':
        return <SignUp 
          onNavigateHome={() => handlePageNavigate('home')} 
          onNavigateSignIn={() => handlePageNavigate('signin')} 
          onSignUp={handleSignUp}
        />;
      case 'contact':
        return (
          <div className="flex flex-col flex-1">
            {sidebar}
            {header}
            <ContactPage onContactSubmit={handleContactSubmit} />
            <Footer />
          </div>
        )
      case 'home':
      default:
        return (
          <div className="flex flex-col flex-1">
            {sidebar}
            {header}
            <main>
              <Hero />
              <HowItWorks />
              <FeaturedProperties
                title={viewMode === 'saved' ? 'Saved Properties' : 'Featured Properties'}
                properties={propertiesToDisplay}
                savedPropertyIds={savedPropertyIds}
                onSaveToggle={handleSaveToggle}
                onSelectProperty={handleSelectProperty}
              />
              <WhyChooseUs />
              <Testimonials />
            </main>
            <Footer />
          </div>
        );
    }
  };

  return (
    <div className="bg-white font-sans text-hit-gray relative min-h-screen">
       {renderCurrentPage()}
       {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={handleDeselectProperty}
          isSaved={savedPropertyIds.includes(selectedProperty.id)}
          onSaveToggle={handleSaveToggle}
        />
       )}
    </div>
  );
};

export default App;
