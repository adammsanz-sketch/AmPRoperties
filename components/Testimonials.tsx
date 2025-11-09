import React from 'react';
import type { Testimonial } from '../types';
import TestimonialCard from './TestimonialCard';
import AnimatedSection from './AnimatedSection';

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "HIT Properties made finding our dream home a breeze. Their agents are professional, knowledgeable, and genuinely caring. We couldn't be happier!",
    name: 'Sarah & Tom Wilson',
    role: 'Home Buyer',
    image: 'https://picsum.photos/seed/person1/100/100'
  },
  {
    id: 2,
    quote: "The team was incredibly supportive throughout the entire selling process. They went above and beyond to get us the best deal. Highly recommended!",
    name: 'Michael Chen',
    role: 'Home Seller',
    image: 'https://picsum.photos/seed/person2/100/100'
  },
  {
    id: 3,
    quote: "As a first-time homebuyer, I was nervous, but their guidance was invaluable. They explained everything clearly and made me feel confident in my decisions.",
    name: 'Jessica Miller',
    role: 'Home Buyer',
    image: 'https://picsum.photos/seed/person3/100/100'
  }
];

const Testimonials: React.FC = () => {
  const delays = ['md:delay-100', 'md:delay-200', 'md:delay-300'];
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hit-dark font-heading">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-hit-gray max-w-2xl mx-auto">Read the success stories from our satisfied clients.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} animation="scale-up" delay={delays[index]}>
              <TestimonialCard testimonial={testimonial} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
