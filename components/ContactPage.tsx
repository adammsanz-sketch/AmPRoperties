import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { LocationIcon } from './icons/LocationIcon';

interface ContactPageProps {
  onContactSubmit: (name: string, email: string, subject: string, message: string) => { success: boolean, message: string };
}

const ContactPage: React.FC<ContactPageProps> = ({ onContactSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name || !email || !subject || !message) {
        setStatus({ type: 'error', message: 'Please fill out all fields.' });
        return;
    }

    const result = onContactSubmit(name, email, subject, message);
    setStatus({ type: result.success ? 'success' : 'error', message: result.message });

    if (result.success) {
      // Clear form on success
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-hit-dark font-heading">Get In Touch</h1>
            <p className="mt-4 text-lg text-hit-gray max-w-2xl mx-auto">We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="fade-in-right">
            <div className="bg-hit-light-gray p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-hit-dark font-heading mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-hit-gray">Full Name</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red" />
                </div>
                 <div>
                  <label htmlFor="email" className="block text-sm font-medium text-hit-gray">Email Address</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red" />
                </div>
                 <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-hit-gray">Subject</label>
                  <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-hit-gray">Message</label>
                  <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hit-red focus:border-hit-red"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full py-3 px-4 bg-hit-red text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hit-red transition-colors">
                    Send Message
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
          
          {/* Contact Info */}
          <AnimatedSection animation="fade-in-left" delay="md:delay-200">
             <div className="space-y-8">
                <h2 className="text-2xl font-bold text-hit-dark font-heading">Contact Information</h2>
                 <ul className="space-y-6 text-hit-gray text-lg">
                    <li className="flex items-start gap-4">
                      <PhoneIcon className="w-6 h-6 text-hit-red flex-shrink-0 mt-1"/>
                      <div>
                        <h3 className="font-semibold text-hit-dark">Phone</h3>
                        <span>+6011-39417267</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <MailIcon className="w-6 h-6 text-hit-red flex-shrink-0 mt-1"/>
                       <div>
                        <h3 className="font-semibold text-hit-dark">Email</h3>
                        <span>muhdakram36@gmail.com</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <LocationIcon className="w-6 h-6 text-hit-red flex-shrink-0 mt-1"/>
                       <div>
                        <h3 className="font-semibold text-hit-dark">Address</h3>
                        <span>123 Jalan Properti, Kuala Lumpur, Malaysia</span>
                      </div>
                    </li>
                  </ul>
                  {/* You can add a map here if needed */}
                  <div className="h-64 bg-gray-200 rounded-lg shadow-md mt-8">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127484.992289417!2d101.614834!3d3.139003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4936d5b0983d%3A0x447e5e3b624751f3!2sKuala%20Lumpur%2C%20Federal%20Territory%20of%20Kuala%20Lumpur%2C%20Malaysia!5e0!3m2!1sen!2sus!4v1678886543210!5m2!1sen!2sus"
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                        >
                      </iframe>
                  </div>
             </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;