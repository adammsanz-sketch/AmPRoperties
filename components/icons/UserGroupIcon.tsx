
import React from 'react';

export const UserGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
    >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0112 15.75c-2.071 0-3.75-1.679-3.75-3.75S9.929 8.25 12 8.25c2.071 0 3.75 1.679 3.75 3.75-0 2.071-1.679 3.75-3.75 3.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5S14.485 15 12 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5a1.5 1.5 0 113 0v3a1.5 1.5 0 01-3 0v-3z" />
  </svg>
);
