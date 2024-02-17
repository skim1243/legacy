import React from "react";
import Navbar from "~/components/Navbar";
import Link from "next/link";
import Image from "next/image"; // If you want to use Next.js Image component

const FinalPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/Visual.svg)",
          backgroundSize: "200% 200%",
        }}
      >
        <h1 className="text-center text-5xl font-bold">
          Congratulations
          <br />
          for your completion
        </h1>
        <p className="mt-4 text-2xl">
          Your Minerva vibe is{" "}
          <span className="text-orange-500">Goal Oriented</span>
        </p>
        <button className="mt-8 rounded-full bg-blue-600 px-4 py-2 text-white">
          <Link className="text-white no-underline" href="/FinalDetails">
              View Details to your personality
          </Link>
        </button>
      </main>
    </>
  );
};

export default FinalPage;
