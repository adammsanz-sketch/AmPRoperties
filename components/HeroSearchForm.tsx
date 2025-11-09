import React from 'react';

const HeroSearchForm: React.FC = () => {
  return (
    <div className="mt-8 w-full max-w-4xl">
      <form className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl md:flex md:items-center md:gap-4 space-y-4 md:space-y-0">
        <div className="flex-grow">
          <label htmlFor="location" className="sr-only">Location</label>
          <input 
            type="text" 
            id="location"
            placeholder="Enter a city, neighborhood, or address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-hit-red focus:outline-none text-hit-dark" 
          />
        </div>
        <div className="flex-shrink-0">
          <label htmlFor="status" className="sr-only">Status</label>
          <select 
            id="status"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-hit-red focus:outline-none text-hit-dark bg-white"
          >
            <option>For Sale</option>
            <option>For Rent</option>
          </select>
        </div>
        <div className="flex-shrink-0">
          <button 
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="w-full md:w-auto bg-hit-red text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors text-lg"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearchForm;
