import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onSignOut: () => void;
  onSectionNavigate: (view: 'all' | 'saved') => void;
  onPageNavigate: (page: 'home' | 'signin' | 'signup' | 'admin' | 'contact') => void;
  onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onSignOut, onSectionNavigate, onPageNavigate, onMenuOpen }) => {

  const navLinks = [
    { id: 'home', label: 'Home', type: 'page' },
    { id: 'saved', label: 'Saved Properties', type: 'section' },
    { id: 'about', label: 'About Us', type: 'page' },
    { id: 'contact', label: 'Contact Us', type: 'page' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.type === 'section' && (link.id === 'all' || link.id === 'saved')) {
      onSectionNavigate(link.id);
    } else if (link.type === 'page' && (link.id === 'home' || link.id === 'contact')) {
        onPageNavigate(link.id);
    }
    // You can add logic here to scroll to 'About' sections if it exists
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => { e.preventDefault(); onPageNavigate('home');}} className="text-2xl font-bold text-hit-dark font-heading">
              HIT PROPERTIES
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="font-medium text-hit-gray hover:text-hit-red transition-colors"
              >
                {link.label}
              </a>
            ))}
            {currentUser?.role === 'admin' && (
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onPageNavigate('admin'); }}
                className="font-medium text-hit-red hover:text-red-700 transition-colors"
              >
                Admin Dashboard
              </a>
            )}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="font-medium text-hit-dark">Welcome, {currentUser.name.split(' ')[0]}</span>
                <button
                  onClick={onSignOut}
                  className="px-5 py-2 bg-hit-dark text-white rounded-md font-semibold hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageNavigate('signin');
                }}
                className="px-5 py-2 bg-hit-red text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                Sign In
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onMenuOpen}
              className="text-hit-dark focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;