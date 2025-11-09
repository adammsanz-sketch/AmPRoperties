import React, { useState, useEffect } from 'react';
import type { Property, User } from '../types';
import AnimatedSection from './AnimatedSection';
import { BedIcon } from './icons/BedIcon';
import { BathIcon } from './icons/BathIcon';
import { AreaIcon } from './icons/AreaIcon';

interface InquiryPageProps {
  property: Property;
  currentUser: User | null;
  onInquirySubmit: (name: string, email: string, phone: string, message: string, propertyId: number, propertyName: string) => { success: boolean, message: string };
  onNavigateHome: () => void;
}

const InquiryPage: React.FC<InquiryPageProps> = ({ property, currentUser, onInquirySubmit, onNavigateHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
    setMessage(`I am interested in the property "${property.name}" located at ${property.address}. Please provide me with more information.`);
  }, [currentUser, property]);
  
  const displayImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://placehold.co/800x600?text=No+Image';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name || !email || !message) {
        setStatus({ type: 'error', message: 'Please fill out all required fields (Name, Email, Message).' });
        return;
    }

    const result = onInquirySubmit(name, email, phone, message, property.id, property.name);
    setStatus({ type: result.success ? 'success' : 'error', message: result.message });

    if (result.success) {
      // Clear form on success
      setName(currentUser?.name || '');
      setEmail(currentUser?.email || '');
      setPhone('');
      setMessage('');
    }
  };

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-hit-dark font-heading">Property Inquiry</h1>
            <p className="mt-4 text-lg text-hit-gray max-w-2xl mx-auto">Fill out the form below. Our agent will get in touch with you shortly.</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inquiry Form */}
          <AnimatedSection animation="fade-in-right">
            <div className="bg-hit-light-gray p-8 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold text-hit-dark font-heading mb-6">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="inquiry-name" className="block text-sm font-medium text-hit-gray">Full Name</label>
                  <input type="text" id="inquiry-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red" />
                </div>
                 <div>
                  <label htmlFor="inquiry-email" className="block text-sm font-medium text-hit-gray">Email Address</label>
                  <input type="email" id="inquiry-email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red" />
                </div>
                 <div>
                  <label htmlFor="inquiry-phone" className="block text-sm font-medium text-hit-gray">Phone Number (Optional)</label>
                  <input type="tel" id="inquiry-phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red" />
                </div>
                <div>
                  <label htmlFor="inquiry-message" className="block text-sm font-medium text-hit-gray">Message</label>
                  <textarea id="inquiry-message" value={message} onChange={e => setMessage(e.target.value)} required rows={6} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full py-3 px-4 bg-hit-red text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hit-red transition-colors">
                    Send Inquiry
                  </button>
                </div>
                {status && (
                    <div className={`p-4 rounded-md text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status.message}
                    </div>
                )}
              </form>
            </div>
          </AnimatedSection>
          
          {/* Property Info */}
          <AnimatedSection animation="fade-in-left" delay="md:delay-200">
             <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-hit-dark font-heading mb-6">Regarding Property</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                    <img className="w-full h-56 object-cover" src={displayImage} alt={property.name} />
                    <div className="p-6">
                        <p className="text-2xl font-bold text-hit-red font-heading">${property.price.toLocaleString()}</p>
                        <h3 className="text-xl font-semibold text-hit-dark mt-2 truncate font-heading">{property.name}</h3>
                        <p className="text-hit-gray mt-1 truncate">{property.address}</p>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-hit-gray">
                        <div className="flex items-center gap-2">
                            <BedIcon className="w-5 h-5 text-hit-dark" />
                            <span>{property.beds} Beds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BathIcon className="w-5 h-5 text-hit-dark" />
                            <span>{property.baths} Baths</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AreaIcon className="w-5 h-5 text-hit-dark" />
                            <span>{property.area.toLocaleString()} sqft</span>
                        </div>
                        </div>
                    </div>
                </div>
                <button onClick={onNavigateHome} className="mt-6 w-full text-center px-4 py-3 bg-hit-dark text-white rounded-md font-semibold hover:bg-gray-700 transition-colors">
                    Browse Other Properties
                </button>
             </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
};

export default InquiryPage;
