import React from 'react';
import type { Property } from '../types';
import { BedIcon } from './icons/BedIcon';
import { BathIcon } from './icons/BathIcon';
import { AreaIcon } from './icons/AreaIcon';
import { HeartIcon } from './icons/HeartIcon';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onSaveToggle: (id: number) => void;
  onSelectProperty: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSaved, onSaveToggle, onSelectProperty }) => {
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    onSaveToggle(property.id);
  };

  const displayImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://placehold.co/800x600?text=No+Image';


  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => onSelectProperty(property)}
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={displayImage} alt={property.name} />
        <button
          onClick={handleSaveClick}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-hit-red"
          aria-label={isSaved ? 'Unsave property' : 'Save property'}
        >
          <HeartIcon
            className={`w-6 h-6 ${isSaved ? 'text-hit-red' : 'text-hit-dark'}`}
            filled={isSaved}
          />
        </button>
      </div>
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
  );
};

export default PropertyCard;
