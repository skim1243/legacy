import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 max-w-md md:mx-0">
      <input
        type="text"
        placeholder="Minerva email"
        className="w-full bg-[#E0ECFD66] text-[#333333] rounded p-3 outline-none focus:ring-2 focus:ring-[#111928] transition duration-300 ease-in-out"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full bg-[#E0ECFD66] text-[#333333] rounded p-3 outline-none focus:ring-2 focus:ring-[#111928] transition duration-300 ease-in-out"
      />
      <button className="rounded-lg bg-[#1F2A37] px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-[#0a1e29]">
        Log In
      </button>
      <button className="mt-2 rounded-lg bg-[#1F2A37] px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-[#0a1e29]">
        Register
        </button>
    </div>
  );
};

export default LoginForm;
