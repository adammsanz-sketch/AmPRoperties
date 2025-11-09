import React from 'react';
import { FacebookIcon } from './icons/FacebookIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import type { User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: User | null;
  onSignOut: () => void;
  onSectionNavigate: (view: 'all' | 'saved') => void;
  onPageNavigate: (page: 'home' | 'signin' | 'signup' | 'admin' | 'contact') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentUser, onSignOut, onSectionNavigate, onPageNavigate }) => {
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
    // For 'about', you might scroll to sections or navigate to pages
    setIsOpen(false);
  };

  const handleSignInClick = () => {
    onPageNavigate('signin');
    setIsOpen(false);
  };
  
  const handleSignOutClick = () => {
    onSignOut();
    setIsOpen(false);
  }

  const socialLinks = [
    { href: '#', icon: <FacebookIcon /> },
    { href: '#', icon: <TwitterIcon /> },
    { href: '#', icon: <InstagramIcon /> },
    { href: '#', icon: <LinkedinIcon /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-hit-dark text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="sidebar-title"
      >
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <a href="#" onClick={(e) => {e.preventDefault(); onPageNavigate('home'); setIsOpen(false);}} className="text-2xl font-bold text-white font-heading" id="sidebar-title">
            HIT PROPERTIES
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link);
              }}
              className="block px-3 py-3 rounded-md text-lg font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
          {currentUser?.role === 'admin' && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageNavigate('admin');
                setIsOpen(false);
              }}
              className="block px-3 py-3 rounded-md text-lg font-medium text-hit-red hover:text-white hover:bg-white/10 transition-colors"
            >
              Admin Dashboard
            </a>
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          {currentUser ? (
            <div className="text-center">
              <p className="text-gray-300 mb-3">Welcome, {currentUser.name.split(' ')[0]}</p>
              <button
                onClick={handleSignOutClick}
                className="block w-full text-center px-4 py-3 bg-gray-600 text-white rounded-md font-semibold hover:bg-gray-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
             <button
                onClick={handleSignInClick}
                className="block w-full text-center px-4 py-3 bg-hit-red text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>
          )}
          <div className="flex justify-center space-x-4 mt-6">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-300 hover:text-white">{link.icon}</a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;