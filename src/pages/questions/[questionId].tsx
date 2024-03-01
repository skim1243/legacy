import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "~/components/Navbar";

// Example question data structure
const questions = [
  {
    id: 1,
    text: "When faced with a challenge, what motivates you the most?",
    options: [
      {
        id: "q1_civic",
        value: "Civic",
        label: "Creating a positive impact on others",
      },
      {
        id: "q1_legion",
        value: "Legion",
        label: "To defend what you believe in",
      },
      {
        id: "q1_liberty",
        value: "Liberty",
        label: "Explore new ideas and freedoms",
      },
      {
        id: "q1_north",
        value: "North",
        label:
          "The potential to achieve something greater than what currently exists",
      },
      {
        id: "q1_tower",
        value: "Tower",
        label: "The courage to face your fears and explore new perspectives",
      },
    ],
  },
  {
    id: 2,
    text: "What motivates you to take any action?",
    options: [
      {
        id: "q2_civic",
        value: "Civic",
        label: "A desire to be responsible and serve others",
      },
      { id: "q2_legion", value: "Legion", label: "A strong belief in a cause" },
      {
        id: "q2_liberty",
        value: "Liberty",
        label: "A longing for individual autonomy and selection",
      },
      { id: "q2_north", value: "North", label: "A hope for a better future" },
      {
        id: "q2_tower",
        value: "Tower",
        label: "I am willing to build my bravery",
      },
    ],
  },
  {
    id: 3,
    text: "What is your preferred way to contribute to society?",
    options: [
      {
        id: "q3_civic",
        value: "Civic",
        label: "Volunteering for social causes",
      },
      {
        id: "q3_legion",
        value: "Legion",
        label: "Participating in a team sport",
      },
      {
        id: "q3_liberty",
        value: "Liberty",
        label: "Attending a political rally",
      },
      { id: "q3_north", value: "North", label: "Exploring the outdoors" },
      { id: "q3_tower", value: "Tower", label: "Attending an art exhibition" },
    ],
  },
  {
    id: 4,
    text: "What kind of challenge are you most drawn to?",
    options: [
      { id: "q4_civic", value: "Civic", label: "Solving a complex problem" },
      { id: "q4_legion", value: "Legion", label: "Conquering an opponent" },
      {
        id: "q4_liberty",
        value: "Liberty",
        label: "Defending individual rights",
      },
      {
        id: "q4_north",
        value: "North",
        label: "Engaging in exterior activities",
      },
      { id: "q4_tower", value: "Tower", label: "Personas overcoming problems" },
    ],
  },
  {
    id: 5,
    text: "Which of these quotes resonates with you the most?",
    options: [
      {
        id: "q5_civic",
        value: "Civic",
        label: '"Be the change you wish to see in the world."',
      },
      {
        id: "q5_legion",
        value: "Legion",
        label:
          '"Victory at all costs, victory in spite of all terror, victory however long and hard the road may be; for without victory, there is no survival."',
      },
      {
        id: "q5_liberty",
        value: "Liberty",
        label:
          '"Freedom is not the absence of commitment, but the ability to choose - and commit myself to - what is best for me."',
      },
      {
        id: "q5_north",
        value: "North",
        label:
          '"The future belongs to those who believe in the beauty of their dreams."',
      },
      {
        id: "q5_tower",
        value: "Tower",
        label: '"Courage is not the absence of fear, but the triumph over it."',
      },
    ],
  },
  {
    id: 6,
    text: "What do you consider to be the most important aspect of your personal well-being?",
    options: [
      {
        id: "q6_civic",
        value: "Civic",
        label: "Eating healthily and taking care of your physical health",
      },
      {
        id: "q6_legion",
        value: "Legion",
        label: "Balancing self-care with responsibilities",
      },
      {
        id: "q6_liberty",
        value: "Liberty",
        label: "Building self-worth and finding purpose in life",
      },
      {
        id: "q6_north",
        value: "North",
        label: "Effective stress management and resilience",
      },
      {
        id: "q6_tower",
        value: "Tower",
        label: "Seeking help and guidance from others when necessary",
      },
    ],
  },
];

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { questionId } = router.query;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<number>(
    parseInt(questionId as string),
  );

  useEffect(() => {
    if (questionId) {
      setCurrentQuestion(parseInt(questionId as string));
    }
  }, [questionId]);

  const question = questions.find((q) => q.id === currentQuestion);

  if (!question) {
    // If the question doesn't exist, you can redirect, show a 404, etc.
    return <div>Question not found</div>;
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const goToNextQuestion = async () => {
    const nextQuestionId = currentQuestion + 1;
    if (nextQuestionId <= questions.length) {
      try {
        await router.push(`/questions/${nextQuestionId}`);
      } catch (error) {
        console.error("Failed to navigate to the next question", error);
      }
    } else {
      try {
        await router.push("/Final"); // Redirect to Final.tsx
      } catch (error) {
        console.error("Failed to navigate to the final page", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        {/* ... Progress Bar and other content */}
        <div className="mt-8 w-full max-w-xl rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Question {currentQuestion}
          </h2>
          <p className="mb-6">{question.text}</p>
          <form>
            {question.options.map((option) => (
              <label
                key={option.id}
                className="mb-4 block cursor-pointer rounded-md bg-[#E0D6D680] p-4 transition-transform hover:scale-105"
              >
                <input
                  type="radio"
                  name={`question${currentQuestion}`}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={() => handleOptionChange(option.value)}
                  className="mr-2"
                />
                <span className="text-lg text-[#333333]">{option.label}</span>
              </label>
            ))}
          </form>
        </div>
        {/* Navigation Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={goToNextQuestion}
            disabled={!selectedOption}
            className={`rounded-full bg-[#1F2A37] px-4 py-2 text-white ${!selectedOption ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="text-xl">&gt;</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
