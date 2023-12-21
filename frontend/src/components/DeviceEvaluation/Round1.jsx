import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";

const questionsArray = [
  {
    id: 1,
    question: "1.Are you able to make and receive calls?",
    message: "Check your device for cellular network connectivity issues.",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    question: "2.Is your device's touch screen working properly?",
    message: "Check the touch screen functionality of your phone.",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    question: "3.Is your phone's screen original?",
    message:
      'Pick "Yes" if the screen was never changed or was changed by the Authorized Service Center. Pick "No" if the screen was changed at a local shop.',
    options: ["Yes", "No"],
  },
];

const Round1 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState([]);

  if (Result.length === 0) {
    navigate(`/model/${params.id}/choosevariant`);
  }

  const handleOptionChange = (questionId, selectedOption, questionText) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { selectedOption, questionText },
    }));

    setResult((prevResult) => {
      const updatedResult = [...prevResult];
      const index = updatedResult.findIndex((item) => item.id === questionId);

      if (index !== -1) {
        updatedResult[index] = {
          id: questionId,
          selectedOption,
          question: questionText || "Not answered",
        };
      } else {
        updatedResult.push({
          id: questionId,
          selectedOption,
          question: questionText || "Not answered",
        });
      }

      return updatedResult;
    });
  };
  const handleContinue = (e) => {
    e.preventDefault();
    result.forEach((singleResult) => Result.push(singleResult));
    navigate(`/model/${params.id}/round2`);
  };
  return (
    <Layout>
      <form
        className="w-full my-20 bg-white shadow-md p-4"
        onSubmit={handleContinue}
      >
        <p className="mb-8 text-xl">Tell us more about the device.</p>
        {questionsArray.map((question) => (
          <div
            className="flex flex-col justify-evenly items-start my-8"
            key={question.id}
          >
            <p className="text-black font-semibold">{question.question}</p>
            <p className="text-slate-800">{question?.message}</p>
            <div className="flex gap-4 my-2">
              {question.options.map((option) => (
                <label
                  key={option}
                  className="bg-gray-300 px-4 py-2 rounded-md text-xl cursor-pointer"
                >
                  <input
                    type="radio"
                    required
                    name={`question_${question.id}`}
                    onChange={() =>
                      handleOptionChange(question.id, option, question.question)
                    }
                    className="scale-125 mr-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          className="bg-cyan-500 px-4 py-2 rounded-md text-white text-xl"
          type="submit"
        >
          Continue
        </button>
      </form>
    </Layout>
  );
};

export default Round1;
