import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "~/components/Navbar";
import { db } from "./../../../firebase";
import { doc, collection, updateDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


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
    text: "When you encounter a problem, what is your typical approach to finding a solution?",
    options: [
      { id: "q4_vista", value: "Vista", label: "Breaking it down into smaller parts and analyzing each one" },
      { id: "q4_plaza", value: "Plaza", label: "Asking for advice or help from others" },
      {
        id: "q4_ocean",
        value: "Ocean",
        label: "Trying out different solutions until one works",
      },
      {
        id: "q4_lands",
        value: "Lands",
        label: "Researching and gathering as much information as possible",
      },
      { id: "q4_reserve", value: "Reserve", label: "Trusting your intuition and making a quick decision" },
    ],
  },

  {
    id: 5,
    text: "When faced with a difficult decision, which factor is most important to you?",
    options: [
      { id: "q5_vista", value: "Vista", label: "The impact it will have on others" },
      { id: "q5_plaza", value: "Plaza", label: "The potential risk or reward" },
      {
        id: "q5_ocean",
        value: "Ocean",
        label: "The alignment with your values and beliefs",
      },
      {
        id: "q5_lands",
        value: "Lands",
        label: "The long-term consequences",
      },
      { id: "q5_reserve", value: "Reserve", label: "Solving an issue in the short-term first." },
    ],
  },

  {
    id: 6,
    text: "Which of these quotes resonates with you the most?",
    options: [
      { id: "q6_vista", value: "Vista", label: "'The only true wisdom is in knowing you know nothing.' - Socrates" },
      { id: "q6_plaza", value: "Plaza", label: "'The greatest glory in living lies not in never falling, but in rising every time we fall.' - Nelson Mandela" },
      {
        id: "q6_ocean",
        value: "Ocean",
        label: "'Life is like riding a bicycle. To keep your balance, you must keep moving.' - Albert Einstein",
      },
      {
        id: "q6_lands",
        value: "Lands",
        label: "'You miss 100% of the shots you don't take.' - Wayne Gretzky",
      },
      { id: "q6_reserve", value: "Reserve", label: "'It does not matter how slowly you go as long as you do not stop.' - Confucius" },
    ],
  },

  {
    id: 7,
    text: "'Which of the following best describes your view on travel?'",
    options: [
      {
        id: "q7_field",
        value: "Field",
        label: "It's a way to learn about new culture",
      },
      {
        id: "q7_mason",
        value: "Mason",
        label: "It's a chance to conquer new territories",
      },
      {
        id: "q7_gate",
        value: "Gate",
        label: "It's a way to defend individual rights",
      },
      {
        id: "q7_labyrinth",
        value: "Labyrinth",
        label: "It's an opportunity to explore the unknown",
      },
      {
        id: "q7_laurel",
        value: "Laurel",
        label: "I haven't traveled enough to have a strong opinion",
      },
    ],
  },

  {
  id: 8, 
    text: "How do you approach new ideas or experiences?",
    options: [
      {
        id: "q8_field",
        value: "Field",
        label: "Working with others to achieve a common goal",
      },
      {
        id: "q8_mason",
        value: "Mason",
        label: "Setting small, achievable goals",
      },
      {
        id: "q8_gate",
        value: "Gate",
        label: "Sticking to your principles and beliefs",
      },
      {
        id: "q8_labyrinth",
        value: "Labyrinth",
        label: "Embracing the unknown and taking risks",
      },
      {
        id: "q8_laurel",
        value: "Laurel",
        label: "I am open to new ideas, but prefer to research and analyze before trying them.",
      },
    ],
  },

  {
    id: 9,
    text: "When you encounter a problem, what is your typical approach to finding a solution?",
    options: [
      {
         id: "q9_vista", value: "Vista", label: "Vista: Breaking it down into smaller parts and analyzing each one" 
      },
        { id: "q9_plaza", value: "Plaza", label: "Plaza: Asking for advice or help from others" },
        { id: "q9_ocean", value: "Ocean", label: "Ocean: Trying out different solutions until one works" },
        { id: "q9_lands", value: "Lands", label: "Lands: Researching and gathering as much information as possible" },
        { id: "q9_reserve", value: "Reserve", label: "Reserve: Trusting your intuition and making a quick decision" }
    ]
  },

  {
  id: 10,
    text: "What is your approach to personal growth?",
    options: [
      {
        id: "q10_field",
        value: "Field",
        label: "Nurturing and supporting each other through teamwork",
      },
      {
        id: "q10_mason",
        value: "Mason",
        label: "Striving towards the next goal or challenges",
      },
      {
        id: "q10_gate",
        value: "Gate",
        label: "Be positive about the journey, even when it's difficult",
      },
      {
        id: "q10_labyrinth",
        value: "Labyrinth",
        label: "To explore new ideas",
      },
      {
        id: "q10_laurel",
        value: "Laurel",
        label: "Embracing lifelong learning",
      },
    ],
  },

  {
    id: 11,
    text: "When faced with a difficult decision, what is your approach?",
    options: [
      {
        id: "q11_circuit",
        value: "Circuit",
        label: "Analyzing all the options and weighing the pros and cons"
      },
      {
        id: "q11_eureka",
        value: "Eureka",
        label: "Continuous improvement and setting new goals"
      },
      {
        id: "q11_gate",
        value: "Gate",
        label: "Sticking to your moral and ethical principles"
      },
      {
        id: "q11_labyrinth",
        value: "Labyrinth",
        label: "Trusting your gut instincts and taking a leap of faith"
      },
      {
        id: "q11_laurel",
        value: "Laurel",
        label: "Seeking balance and harmony in all aspects of the situation"
      }
    ]
  },

  {
    id: 12,
    text: "How do you typically approach setting and achieving goals?",
    options: [
      {
        id: "q12_civic",
        value: "Civic",
        label: "By breaking them down into smaller, manageable steps"
      },
      {
        id: "q12_eureka",
        value: "Eureka",
        label: "By setting ambitious and challenging targets"
      },
      {
        id: "q12_gate",
        value: "Gate",
        label: "By aligning your goals with your personal values and beliefs"
      },
      {
        id: "q12_labyrinth",
        value: "Labyrinth",
        label: "By constantly adapting and revising your goals as circumstances change"
      },
      {
        id: "q12_laurel",
        value: "Laurel",
        label: "By striving for a sense of balance and fulfillment in all areas of your life"
      }
    ]
  }, 

  {
    id: 13,
    text: "Which of the following best describes your attitude towards risk-taking?",
    options: [
      {
        id: "q13_civic",
        value: "Civic",
        label: "You prefer to play it safe and avoid taking unnecessary risks"
      },
      {
        id: "q13_eureka",
        value: "Eureka",
        label: "You enjoy taking calculated risks that push you out of your comfort zone"
      },
      {
        id: "q13_gate",
        value: "Gate",
        label: "You only take risks that align with your personal values and principles"
      },
      {
        id: "q13_labyrinth",
        value: "Labyrinth",
        label: "You embrace risk-taking as an essential part of personal growth and development"
      },
      {
        id: "q13_laurel",
        value: "Laurel",
        label: "You seek balance and harmony in your approach to risk-taking, carefully considering the potential rewards and consequences"
      }
    ]
  }, 
  {
    id: 14,
    text: "Which of the following best describes your approach to building lasting connections?",
    options: [
      {
        id: "q14_pier",
        value: "Pier",
        label: "Building a strong foundation before embarking on new relationships"
      },
      {
        id: "q14_cable",
        value: "Cable",
        label: "Honoring and nurturing existing relationships"
      },
      {
        id: "q14_chronicle",
        value: "Chronicle",
        label: "Communicating honestly and authentically with others"
      },
      {
        id: "q14_pyramid",
        value: "Pyramid",
        label: "Fostering a strong sense of self and identity"
      },
      {
        id: "q14_laurel",
        value: "Laurel",
        label: "Cultivating deep and profound connections with others"
      }
    ]
  },
  {
    id: 15,
    text: "When encountering new challenges, what is your preferred approach?",
    options: [
      {
        id: "q15_pier",
        value: "Pier",
        label: "By standing firm and facing the challenges head on at the edge of a pier."
      },
      {
        id: "q15_cable",
        value: "Cable",
        label: "Finding groups of people with shared problems and working it all out"
      },
      {
        id: "q15_chronicle",
        value: "Chronicle",
        label: "Documenting and preserving experiences for future reflection"
      },
      {
        id: "q15_pyramid",
        value: "Pyramid",
        label: "Building a strong foundation and steadily rising to the top"
      },
      {
        id: "q15_laurel",
        value: "Laurel",
        label: "Looking for multiple people you trust to help with the issue"
      }
    ]
  }, 

  {
    id: 16,
    text: "How do you prefer to resolve conflicts or disagreements with others?",
    options: [
      {
        id: "q16_pier",
        value: "Pier",
        label: "Addressing the issue directly and honestly with the person involved, aiming for a mutual understanding"
      },
      {
        id: "q16_cable",
        value: "Cable",
        label: "Bringing in diverse perspectives to find a solution that accommodates everyone's needs"
      },
      {
        id: "q16_chronicle",
        value: "Chronicle",
        label: "Reflecting on past experiences to find a resolution strategy that worked in similar situations"
      },
      {
        id: "q16_pyramid",
        value: "Pyramid",
        label: "Focusing on the underlying issues and working together to build a stronger relationship"
      },
      {
        id: "q16_laurel",
        value: "Laurel",
        label: "Seeking guidance from trusted mentors or experts to mediate the conflict"
      }
    ]
  } 

];

const auth = getAuth(); // Initialize Firebase Authentication
const user = auth.currentUser;

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { questionId } = router.query;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<number>(1); // Initialize with a default value
  const [responseId, setResponseId] = useState<string | null>(null);

  useEffect(() => {
    if (questionId) {
      const parsedQuestionId = parseInt(questionId as string);
      if (!isNaN(parsedQuestionId)) {
        setCurrentQuestion(parsedQuestionId);
      }
    }
  }, [questionId]);

  useEffect(() => {
    if (questionId) {
      const parsedQuestionId = parseInt(questionId as string, 10);
      if (!isNaN(parsedQuestionId)) {
        setCurrentQuestion(parsedQuestionId);
        setSelectedOption(""); // Reset selected option when the question changes
      }
    }
  }, [questionId]);
  

  const question = questions.find((q) => q.id === currentQuestion) ?? null;

  if (!question) {
    return <div>Question not found</div>;
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const goToNextQuestion = async () => {
    if (!user) {
      alert("You must be signed in to submit your answers.");
      return;
    }

    const responseToStore = {
      [`q${question.id}`]: selectedOption,
      userId: user.uid,
    };

    try {
      if (!responseId && currentQuestion === 1) {
        const docRef = await addDoc(
          collection(db, "responses"),
          responseToStore
        );
        setResponseId(docRef.id);
      } else if (responseId) {
        await updateDoc(doc(db, "responses", responseId), responseToStore);
      }

      const nextQuestionId = currentQuestion + 1;
      if (nextQuestionId <= questions.length) {
        void router.push(`/questions/${nextQuestionId}`);
      } else {
        void router.push("/Final");
      }
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("Failed to save response. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-xl items-center justify-between">
          <div className="w-full max-w-xl rounded-md border border-gray-300 bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">
              Question {currentQuestion}
            </h2>
            <p className="mb-6">{question.text}</p>
            <form>
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className="mb-4 block cursor-pointer rounded-md bg-[#E0D6D680] p-4 transition-transform hover:bg-slate-200 hover:scale-105"
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
          <button
            onClick={goToNextQuestion}
            disabled={!selectedOption}
            className={`ml-4 inline-block rounded-full bg-[#1F2A37] px-4 py-2 text-white hover:bg-slate-700 ${!selectedOption ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="text-xl">&gt;</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
