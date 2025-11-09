import React from 'react';
import type { Property } from '../types';
import PropertyCard from './PropertyCard';
import AnimatedSection from './AnimatedSection';

interface FeaturedPropertiesProps {
  title: string;
  properties: Property[];
  savedPropertyIds: number[];
  onSaveToggle: (id: number) => void;
  onSelectProperty: (property: Property) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ title, properties, savedPropertyIds, onSaveToggle, onSelectProperty }) => {
  return (
    <section id="properties-section" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hit-dark font-heading">{title}</h2>
            <p className="mt-4 text-lg text-hit-gray max-w-2xl mx-auto">
              {title === 'Featured Properties'
                ? 'Explore our handpicked selection of featured properties.'
                : 'Your bookmarked properties for quick access.'}
            </p>
          </div>
        </AnimatedSection>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
               <AnimatedSection key={property.id} animation="scale-up" delay={`md:delay-${(index % 3) * 150}`}>
                <PropertyCard 
                  property={property}
                  isSaved={savedPropertyIds.includes(property.id)}
                  onSaveToggle={onSaveToggle}
                  onSelectProperty={onSelectProperty}
                />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-2xl font-semibold text-hit-dark font-heading">
              {title === 'Saved Properties' ? 'No Saved Properties' : 'No Properties Found'}
            </h3>
            <p className="mt-2 text-hit-gray max-w-lg mx-auto">
              {title === 'Saved Properties'
                ? "You haven't saved any properties yet. Click the heart icon on any property to add it to your list!"
                : "Looking for something specific? Try our search bar or contact our consultants for personalized recommendations."
              }
            </p>
          </div>
        )}

        {title === 'Featured Properties' && (
          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-block px-8 py-3 bg-hit-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
            >
              View All Properties
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
