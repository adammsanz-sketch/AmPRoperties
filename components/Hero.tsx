import React from 'react';
import HeroSearchForm from './HeroSearchForm';

const Hero: React.FC = () => {
  return (
    <section 
        className="relative bg-cover bg-center text-white overflow-hidden min-h-[500px] md:min-h-[600px]" 
    >
        <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" alt="Modern house interior" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center pt-24 pb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight font-heading">Find Your Dream Home With Us</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Discover the best properties for sale and rent in your area.</p>
            
            <HeroSearchForm />
        </div>
    </section>
  );
};

export default Hero;