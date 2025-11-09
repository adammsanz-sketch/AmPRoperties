import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-hit-light-gray p-8 rounded-lg shadow-md h-full flex flex-col">
      <p className="text-hit-gray italic mb-6 flex-grow">"{testimonial.quote}"</p>
      <div className="flex items-center">
        <img className="w-16 h-16 rounded-full mr-4" src={testimonial.image} alt={testimonial.name} />
        <div>
          <h4 className="font-bold text-hit-dark text-lg font-heading">{testimonial.name}</h4>
          <p className="text-hit-gray">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
