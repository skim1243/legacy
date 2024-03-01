// Achievements.tsx
import React from "react";
import Navbar from "~/components/Navbar";
import DropdownComponent from "~/components/DropdownComponent";
import { useRouter } from "next/router";

const Achievements: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle navigation
  const navigateToQuestions = () => {
    void router.push("/questions/1"); // Navigate to the first question page
  };
  return (
    <>
      <Navbar />
      <main className="container mx-auto flex min-h-screen flex-col justify-center">
        <div className="flex flex-wrap items-start justify-center md:flex-nowrap">
          {/* Header */}
          <div className="w-full px-4 py-2 md:w-1/3">
            <h1 className="text-5xl font-bold leading-tight">
              Highlight
              <br />
              Your
              <br />
              achievements
            </h1>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          </div>
          {/* Inputs and Achievements */}
          <div className="flex w-full flex-wrap md:w-2/3">
            {/* First Column */}
            <div className="w-full p-4 md:w-1/2">
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="First name and Last name"
                  className="w-full rounded bg-[#E0ECFD66] p-2 text-[#333333]"
                />
              </div>
              {/* Assume DropdownComponent is a component that renders a multi-choice dropdown */}
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
                <label className="mb-2 block font-semibold">
                  Favorite Food
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your favorite food"
                  className="w-full rounded bg-[#E0ECFD66] p-2 text-[#333333]"
                />
              </div>
            </div>
            {/* Second Column */}
            <div className="w-full p-4 md:w-1/2">
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Achievements</label>
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Achievement ${index + 1}`}
                    className="mb-6 w-full rounded bg-[#E0ECFD66] p-2 text-[#333333]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={navigateToQuestions}
            className="rounded-full bg-[#1F2A37] px-4 py-2 text-white"
          >
            <span className="text-xl">&gt;</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default Achievements;
