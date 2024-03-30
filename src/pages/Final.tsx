import React, { useState, useEffect } from "react";
import Navbar from "~/components/Navbar";
import { db } from "./../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const FinalPage: React.FC = () => {
  const [vibe, setVibe] = useState<string>("evaluating...");

  useEffect(() => {
    const evaluateResponses = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.log("User not logged in");
        setVibe("User not logged in.");
        return;
      }

      try {
        const responsesCollection = collection(db, "responses");
        const q = query(responsesCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No responses document found for the user.");
          setVibe("No response found.");
        } else {
          const responseDoc = querySnapshot.docs.find((doc) => doc.exists());
          if (responseDoc) {
            const data = responseDoc.data();

            const tally: { [key: string]: number } = {};
            Object.values(data).forEach((value) => {
              if (typeof value === "string") {
                tally[value] = (tally[value] ?? 0) + 1;
              }
            });

            // Determine the highest category
            const highestCategory = Object.entries(tally).reduce(
              (a, b) => (a[1] > b[1] ? a : b)
            )[0];

            const adjectives: { [key: string]: string } = {
              Civic: "Community-Oriented",
              Legion: "Resilient",
              Liberty: "Independent",
              North: "Visionary",
              Tower: "Courageous",
              Lands: "Grounded",
              Ocean: "Creative",
              Plaza: "Supportive",
              Reserve: "Thoughtful",
              Vista: "Curious",
              Pier: "Adventurous",
              Cable: "Connected",
              Chronicle: "Goal-Oriented",
              Pyramid: "Meditative",
              Union: "Collaborative",
              Field: "Open-minded",
              Gate: "Welcoming",
              Labyrinth: "Mysterious",
              Laurel: "Connected",
              Mason: "Crafty",
              Circuit: "Innovative",
              Eureka: "Enlightened",
              Hunter: "Focused",
              Mission: "Determined",
              Octagon: "Strategic",
              // Add or adjust adjectives as needed
            };

            // Set the vibe based on the highestCategory, ensure fallback if not found
            setVibe(adjectives[highestCategory] ?? "unique");
          } else {
            console.log("No responses document found for the user.");
            setVibe("No response found.");
          }
        }
      } catch (error) {
        console.error("Error getting document:", error);
        setVibe("Error retrieving responses.");
      }
    };

    evaluateResponses();
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/Visual.svg)", backgroundSize: "200% 200%" }}
      >
        <h1 className="text-center text-5xl font-bold">
          Congratulations
          <br />
          for your completion
        </h1>
        <p className="mt-4 text-2xl">
          Your Minerva vibe is <span className="text-white rounded-xl bg-red-400 bg-opacity-50 p-2">{vibe}</span>
        </p>
      </main>
    </>
  );
};

export default FinalPage;
