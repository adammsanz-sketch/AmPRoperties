import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { KeyIcon } from './icons/KeyIcon';
import AnimatedSection from './AnimatedSection';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <SearchIcon className="w-12 h-12 text-hit-red" />,
      title: 'Find Property',
      description: 'Search from thousands of properties for sale and rent.'
    },
    {
      icon: <UserGroupIcon className="w-12 h-12 text-hit-red" />,
      title: 'Meet Agent',
      description: 'Our certified agents are here to help you find your dream home.'
    },
    {
      icon: <KeyIcon className="w-12 h-12 text-hit-red" />,
      title: 'Close the Deal',
      description: 'We will handle all the paperwork to make your dream a reality.'
    }
  ];
  const delays = ['md:delay-100', 'md:delay-200', 'md:delay-300'];

  return (
    <section className="py-20 bg-hit-light-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hit-dark font-heading">How It Works</h2>
            <p className="mt-4 text-lg text-hit-gray max-w-2xl mx-auto">Finding your new home is easy with our simple three-step process.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <AnimatedSection key={index} delay={delays[index]}>
              <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                <div className="flex justify-center items-center mb-6 w-20 h-20 mx-auto bg-red-100 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-hit-dark mb-2 font-heading">{step.title}</h3>
                <p className="text-hit-gray">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
