// LoginForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import app from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const validateEmail = (email: string) => {
    return email.match(/@uni.minerva\.edu$/);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(!validateEmail(email)); // Set email error state based on validation
    if (email && password && validateEmail(email)) {
      const authAction = isRegister
        ? createUserWithEmailAndPassword(auth, email, password)
        : signInWithEmailAndPassword(auth, email, password);
  
      authAction
        .then(() => {
          // Navigate on successful signup/login
          return router.push("/Achievements");
        })
        .then(() => {
          console.log("Navigation successful");
        })
        .catch((error) => {
          console.error("Failed to authenticate or navigate:", error);
          alert("Authentication failed. Please try again.");
        });
    } else {
      alert("Please use a Minerva email address and fill in the password field.");
    }
  };
  
  

  const toggleRegister = () => {
    setIsRegister(!isRegister);
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
        className={`w-full rounded bg-[#E0ECFD66] p-2 text-[#333333] outline-none transition duration-300 ease-in-out ${
          emailError ? "focus:ring-2 focus:ring-red-500 border border-red-500" : "focus:ring-2 focus:ring-[#111928]"
        }`}
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
        {isRegister ? "Register" : "Log In"}
      </button>
      <button
        type="button"
        onClick={toggleRegister}
        className="text-sm text-[#1F2A37] underline"
      >
        {isRegister
          ? "Already have an account? Log In"
          : "Don't have an account? Register"}
      </button>
    </form>
  );
};

export default LoginForm;