import React from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";

const MainSection: React.FC = () => {
  return (
    <main className="flex flex-col items-center align-middle justify-between bg-[#FFFFFF] md:py-0 md:px-24 sm:px-4 sm:py-10 md:flex-row" style={{ minHeight: "calc(100vh - 80px)" }}>
      <Image
        src="/minerva.svg"
        alt="Logo"
        width={250}
        height={250}
        className="mx-2 mb-4 inline-block md:mb-0"
      />
      <div className="flex flex-col items-center mx-auto mb-4 max-w-md border rounded-lg p-4 text-[#111928] shadow-md md:mx-0 md:mb-0">
        <h1 className="text-center mb-8 text-xl font-bold md:text-3xl">
          Log in to take the survey
        </h1>
        <p className="text-center mb-2">
          Take the Survey in preparation for the Foundation Week. Contact us if
          you encounter any issues!
        </p>
        <button className="rounded-lg bg-[#1F2A37] px-4 py-2 mt-8 mb-6 text-white transition duration-300 ease-in-out hover:bg-[#0a1e29]">
          Contact Us
        </button>
      </div>
      <LoginForm />
    </main>
  );
};

export default MainSection;
