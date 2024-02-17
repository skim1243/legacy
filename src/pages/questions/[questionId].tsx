import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '~/components/Navbar';

// Example question data structure
const questions = [
  {
    id: 1,
    text: 'When faced with a challenge, what motivates you the most?',
    options: [
      { id: 'q1_civic', value: 'Civic', label: 'Civic: Creating a positive impact on others' },
      // ... Add other options here
    ],
  },
  // ... Add more question objects here
];

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { questionId } = router.query;
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(parseInt(questionId as string));

  useEffect(() => {
    if (questionId) {
      setCurrentQuestion(parseInt(questionId as string));
    }
  }, [questionId]);

  const question = questions.find(q => q.id === currentQuestion);

  if (!question) {
    // If the question doesn't exist, you can redirect, show a 404, etc.
    return <div>Question not found</div>;
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const goToNextQuestion = () => {
    const nextQuestionId = currentQuestion + 1;
    if (nextQuestionId <= questions.length) {
      router.push(`/questions/${nextQuestionId}`);
    } else {
      router.push('/results'); // or whatever your results path is
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
        {/* ... Progress Bar and other content */}
        <div className="w-full max-w-xl mt-8 p-4 border border-gray-300 shadow-sm rounded-md">
          <h2 className="text-2xl font-bold">Question {currentQuestion}</h2>
          <p className="my-4">{question.text}</p>
          <form>
            {question.options.map(option => (
              <label key={option.id} className="block cursor-pointer hover:scale-110 transition-transform">
                <input
                  type="radio"
                  name={`question${currentQuestion}`}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={() => handleOptionChange(option.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </form>
        </div>
        {/* Navigation Button */}
        <div className="flex justify-center mt-8">
          <button onClick={goToNextQuestion} disabled={!selectedOption} className={`rounded-full py-2 px-4 bg-[#1F2A37] text-white ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <span className="text-xl">&gt;</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
