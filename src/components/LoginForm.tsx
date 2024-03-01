// LoginForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    return email.match(/@uni.minerva\.edu$/);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password && validateEmail(email)) {
      try {
        await router.push("/Achievements");
      } catch (error) {
        console.error("Failed to navigate to Achievements", error);
      }
    } else {
      alert(
        "Please use a Minerva email address and fill in the password field.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col space-y-4 p-4 md:mx-0"
    >
      <input
        type="email"
        placeholder="Minerva email"
        required
        className="w-full rounded bg-[#E0ECFD66] p-2 text-[#333333] outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-[#111928]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full rounded bg-[#E0ECFD66] p-2 text-[#333333] outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-[#111928]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-[#1F2A37] px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-[#0a1e29]"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
