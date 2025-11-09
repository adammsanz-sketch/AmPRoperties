import React from 'react';
import AnimatedSection from './AnimatedSection';

const WhyChooseUs: React.FC = () => {
    const benefits = [
        "Trusted By Thousands",
        "Wide Range Of Properties",
        "Financing Made Easy",
        "See A Property In Person"
    ];

  return (
    <section className="py-20 bg-hit-light-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-in-right">
            <img 
              src="https://picsum.photos/seed/whyus/600/500" 
              alt="Happy family in a new home" 
              className="rounded-lg shadow-2xl"
            />
          </AnimatedSection>
          <AnimatedSection animation="fade-in-left" delay="md:delay-200">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-hit-dark mb-6 font-heading">Why Choose Us?</h2>
              <p className="text-lg text-hit-gray mb-8">
                We provide full service at every step. Our team is dedicated to making your home buying experience seamless and enjoyable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map(benefit => (
                      <div key={benefit} className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-hit-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          <span className="font-semibold text-hit-dark">{benefit}</span>
                      </div>
                  ))}
              </div>
              <div className="mt-10">
                  <a href="#" className="inline-block px-8 py-3 bg-hit-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg">
                      Learn More
                  </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
