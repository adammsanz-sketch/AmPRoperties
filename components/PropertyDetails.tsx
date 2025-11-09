import React from 'react';
import type { Property } from '../types';
import { BedIcon } from './icons/BedIcon';
import { BathIcon } from './icons/BathIcon';
import { AreaIcon } from './icons/AreaIcon';
import { HeartIcon } from './icons/HeartIcon';
import { LocationIcon } from './icons/LocationIcon';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
  isSaved: boolean;
  onSaveToggle: (id: number) => void;
  onInquiry: (property: Property) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose, isSaved, onSaveToggle, onInquiry }) => {

  // Handle clicks on the modal content to prevent closing when user interacts with the details
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const displayImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://placehold.co/800x600?text=No+Image';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-details-title"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden transform animate-scale-up"
        onClick={handleContentClick}
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={displayImage}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
           {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 id="property-details-title" className="text-2xl md:text-3xl font-bold text-hit-dark font-heading leading-tight">{property.name}</h2>
              <div className="flex items-center text-hit-gray mt-2">
                <LocationIcon className="w-4 h-4 mr-2" />
                <span>{property.address}</span>
              </div>
            </div>
             <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none -mt-2 -mr-2 p-2"
                aria-label="Close property details"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
          </div>

          <p className="text-3xl font-bold text-hit-red font-heading mb-4">${property.price.toLocaleString()}</p>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4 text-center mb-6 pb-6 border-b">
            <div className="flex flex-col items-center justify-center">
              <BedIcon className="w-7 h-7 text-hit-dark mb-1" />
              <span className="font-semibold">{property.beds}</span>
              <span className="text-sm text-hit-gray">Beds</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <BathIcon className="w-7 h-7 text-hit-dark mb-1" />
              <span className="font-semibold">{property.baths}</span>
              <span className="text-sm text-hit-gray">Baths</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <AreaIcon className="w-7 h-7 text-hit-dark mb-1" />
              <span className="font-semibold">{property.area.toLocaleString()}</span>
              <span className="text-sm text-hit-gray">sqft</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6 flex-grow">
            <h3 className="text-xl font-semibold text-hit-dark font-heading mb-2">About this property</h3>
            <p className="text-hit-gray leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Agent & Actions */}
          <div className="mt-auto pt-6 border-t">
             <div className="flex items-center mb-4">
                <img src="https://picsum.photos/seed/agent1/100/100" alt="Listing Agent" className="w-14 h-14 rounded-full mr-4"/>
                <div>
                    <p className="font-bold text-hit-dark">Akram Halim</p>
                    <p className="text-sm text-hit-gray">Listing Agent</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                 <button 
                    onClick={() => onInquiry(property)}
                    className="flex-1 bg-hit-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                    Send Inquiry
                 </button>
                 <button
                    onClick={() => onSaveToggle(property.id)}
                    className="p-3 rounded-lg bg-hit-light-gray hover:bg-gray-200 transition-colors"
                    aria-label={isSaved ? 'Unsave property' : 'Save property'}
                 >
                    <HeartIcon
                        className={`w-6 h-6 ${isSaved ? 'text-hit-red' : 'text-hit-dark'}`}
                        filled={isSaved}
                    />
                 </button>
             </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-up {
            animation: scaleUp 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;