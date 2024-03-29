// Achievements.tsx
import React, { useState } from 'react';
import Navbar from '~/components/Navbar';
import DropdownComponent from '~/components/DropdownComponent';
import { useRouter } from 'next/router';
import { db } from '../../firebase'; // Make sure the path is correct
import { collection, addDoc } from 'firebase/firestore';

const Achievements: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle navigation
  const navigateToQuestions = () => {
    void router.push('/questions/1'); // Navigate to the first question page
  };

  const [formData, setFormData] = useState({
    fullName: '',
    countriesLivedIn: [],
    citizenships: [],
    favoriteFood: '',
    achievements: Array.from({ length: 5 }, () => ''),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      // Handling achievements input
      setFormData((prev) => ({
        ...prev,
        achievements: prev.achievements.map((ach, i) => (i === index ? value : ach)),
      }));
    } else {
      // Handling other inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'achievements'), formData);
      console.log('Document written with ID: ', docRef.id);
      navigateToQuestions();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="container mx-auto flex min-h-screen flex-col justify-center">
        <div className="flex flex-wrap items-start justify-center md:flex-nowrap">
          {/* Header */}
          <div className="w-full px-4 py-2 md:w-1/3">
            <h1 className="text-5xl font-bold leading-tight">
              Highlight
              <br />
              Your
              <br />
              Achievements
            </h1>
          </div>
          {/* Inputs and Achievements */}
          <div className="flex w-full flex-wrap md:w-2/3">
            {/* First Column */}
            <div className="w-full p-4 md:w-1/2">
              <div className="mb-4">
                <label htmlFor="fullName" className="mb-2 block font-semibold">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  type="text"
                  placeholder="First name and Last name"
                  className="w-full rounded bg-[#E0ECFD66] p-2 text-[#333333]"
                  onChange={handleChange}
                />
              </div>
              {/* Replace DropdownComponent with actual dropdowns if needed */}
              <div className="mb-4">
                <label className="mb-2 block font-semibold">
                  Countries Lived In
                </label>
                <DropdownComponent />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Citizenships</label>
                <DropdownComponent />
              </div>
              <div>
                <label htmlFor="favoriteFood" className="mb-2 block font-semibold">
                  Favorite Food
                </label>
                <input
                  id="favoriteFood"
                  name="favoriteFood"
                  required
                  type="text"
                  placeholder="Your favorite food"
                  className="w-full rounded bg-[#E0ECFD66] p-2 text-[#333333]"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Second Column */}
            <div className="w-full p-4 md:w-1/2">
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Achievements</label>
                {formData.achievements.map((achievement, index) => (
                  <input
                    key={index}
                    name={`achievement${index}`}
                    type="text"
                    placeholder={`Achievement ${index + 1}`}
                    value={achievement}
                    className="mb-6 w-full rounded bg-[#E0ECFD66] p-2 text-[#333333]"
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="rounded-full bg-[#1F2A37] px-4 py-2 text-white"
          >
            <span className="text-xl">&gt;</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Achievements;
