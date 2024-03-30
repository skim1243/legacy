import React, { useState, useEffect } from "react";
import Navbar from "~/components/Navbar";
import { db } from "./../../firebase"; // Adjust the path based on your actual file structure
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const FinalPage: React.FC = () => {
  const [vibe, setVibe] = useState<string>("evaluating...");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const evaluateResponses = async () => {
      const responsesRef = doc(db, "responses", user.uid);
      try {
        const docSnap = await getDoc(responsesRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const tally: { [key: string]: number } = { Civic: 0, Legion: 0, Liberty: 0, North: 0, Tower: 0 };

          Object.values(data).forEach((value) => {
            // Assuming each value is a string that matches the keys in `tally`
            if (typeof value === "string" && tally.hasOwnProperty(value)) {
              tally[value]++;
            }
          });

          // Determine the highest tally
          const highestCategory = Object.entries(tally).reduce((a, b) => a[1] > b[1] ? a : b)[0];

          // Map to adjectives
          const adjectives = {
            Civic: "Community-Oriented",
            Legion: "Resilient",
            Liberty: "Independent",
            North: "Visionary",
            Tower: "Courageous",
          };

          setVibe(adjectives[highestCategory as keyof typeof adjectives]);
        } else {
          console.log("No responses document found for the user.");
          setVibe("Could not determine your Minerva vibe.");
        }
      } catch (error) {
        console.error("Error getting document:", error);
        setVibe("Error calculating vibe.");
      }
    };

    evaluateResponses();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/Visual.svg)", backgroundSize: "200% 200%" }}>
        <h1 className="text-center text-5xl font-bold">Congratulations<br />for your completion</h1>
        <p className="mt-4 text-2xl">Your Minerva vibe is <span className="text-orange-500">{vibe}</span></p>
      </main>
    </>
  );
};

export default FinalPage;
