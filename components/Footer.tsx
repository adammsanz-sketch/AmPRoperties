import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { LocationIcon } from './icons/LocationIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { TiktokIcon } from './icons/TiktokIcon';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-white text-hit-dark border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div className="lg:col-span-1">
                <a href="#" className="inline-block mb-4">
                     <img src="https://i.imgur.com/rL339yP.png" alt="HIT Properties Logo" className="h-10"/>
                </a>
              <p className="text-hit-gray max-w-md text-sm">
                HIT PROPERTIES SDN BHD provides expert property management services, optimizing value and ensuring hassle-free ownership.
              </p>
            </div>
            
            {/* Useful Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-heading">Useful Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-hit-gray hover:text-hit-red">Home</a></li>
                <li><a href="#" className="text-hit-gray hover:text-hit-red">About</a></li>
                <li><a href="#" className="text-hit-gray hover:text-hit-red">Contact</a></li>
              </ul>
            </div>
            
            {/* Our Services */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-heading">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-hit-gray hover:text-hit-red">Buy &amp; Rent Property</a></li>
                <li><a href="#" className="text-hit-gray hover:text-hit-red">Sell Properties</a></li>
                <li><a href="#" className="text-hit-gray hover:text-hit-red">Land Sales or Lease</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-heading">Contact Us</h4>
              <ul className="space-y-3 text-hit-gray">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-hit-red flex-shrink-0 mt-1"/>
                  <span>+6011-39417267</span>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon className="w-5 h-5 text-hit-red flex-shrink-0 mt-1"/>
                  <span>muhdakram36@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <LocationIcon className="w-5 h-5 text-hit-red flex-shrink-0 mt-1"/>
                  <span>123 Jalan Properti, Kuala Lumpur, Malaysia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-hit-gray text-sm text-center sm:text-left mb-4 sm:mb-0">
                    &copy; {new Date().getFullYear()} HIT PROPERTIES. All rights reserved.
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="text-hit-gray hover:text-hit-red"><WhatsappIcon /></a>
                    <a href="#" className="text-hit-gray hover:text-hit-red"><FacebookIcon /></a>
                    <a href="#" className="text-hit-gray hover:text-hit-red"><TwitterIcon /></a>
                    <a href="#" className="text-hit-gray hover:text-hit-red"><InstagramIcon /></a>
                    <a href="#" className="text-hit-gray hover:text-hit-red"><LinkedinIcon /></a>
                    <a href="https://www.tiktok.com/@muhdakram.36" target="_blank" rel="noopener noreferrer" className="text-hit-gray hover:text-hit-red"><TiktokIcon /></a>
                </div>
            </div>
        </div>
      </footer>
    </>
  );
};

// FIX: Added default export to the Footer component, which was missing and causing an import error.
export default Footer;