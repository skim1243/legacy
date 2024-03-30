// Achievements.tsx
import React from 'react';
import Navbar from './Navbar';
import * as RadixSelect from '@radix-ui/react-select';
import countriesList from 'countries-list'; // Import the countries-list library

// Import the Navbar component
const Achievements: React.FC = () => {
  // Get the list of countries from the countries-list library
  const countries = Object.values(countriesList.countries);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Header */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">Highlight Your achievements</h1>
          </div>
          {/* Inputs and Achievements */}
          <div className="w-full md:w-1/2 space-y-4">
            {/* Full Name Input */}
            <input
              type="text"
              placeholder="First name and Last name"
              className="w-full bg-[#E0ECFD66] text-[#333333] rounded p-4"
            />
            {/* Dropdowns and Inputs for Profile Details */}
            <RadixSelect.Root>
              <RadixSelect.Trigger className="w-full bg-[#E0ECFD66] text-[#333333] rounded p-4">
                <RadixSelect.Value placeholder="Select a country" />
              </RadixSelect.Trigger>
              <RadixSelect.Content>
                <RadixSelect.ScrollUpButton>Scroll Up</RadixSelect.ScrollUpButton>
                <RadixSelect.Viewport>
                  {countries.map((country) => (
                    <RadixSelect.Item key={country.name} value={country.name}>
                      {country.name}
                    </RadixSelect.Item>
                  ))}
                </RadixSelect.Viewport>
                <RadixSelect.ScrollDownButton>Scroll Down</RadixSelect.ScrollDownButton>
              </RadixSelect.Content>
            </RadixSelect.Root>
            {/* ... similar input and select elements ... */}

            {/* Achievements List */}
            <div className="space-y-2">
              <div className="font-semibold">Please list your achievements (100 words per item)</div>
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Achievement ${index + 1}`}
                  className="w-full bg-[#E0ECFD66] text-[#333333] rounded p-4"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Navigation Button */}
        <div className="flex justify-center mt-8">
          <button className="rounded-full p-4 bg-[#1F2A37] text-white">
            <span className="text-xl"></span>
          </button>
        </div>
      </main>
    </>
  );
};

export default Achievements;