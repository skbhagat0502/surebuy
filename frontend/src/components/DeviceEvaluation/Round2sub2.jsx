import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";
import { FaArrowRight } from "react-icons/fa";
import heavySpotImage from "../../assets/heavyspot.png";
import minorSpotImage from "../../assets/minorspot.png";
import singleSpotImage from "../../assets/singlespot.png";
import nospotImage from "../../assets/nospot.png";
import lineOnDisplayImage from "../../assets/lineondisplay.png";
import fadedDisplayImage from "../../assets/fadeddisplay.png";
import nolineImage from "../../assets/noline.png";

const subQuestionsArray2 = [
  {
    id: 8,
    question: "Large/ heavy visible spots on screen",
    imgUrl: heavySpotImage,
  },
  {
    id: 9,
    question: "3 or more minor spots on screen",
    imgUrl: minorSpotImage,
  },
  {
    id: 10,
    question: "1-2 minor spots on screen",
    imgUrl: singleSpotImage,
  },
  {
    id: 11,
    question: "No spots on screen",
    imgUrl: nospotImage,
  },
  {
    id: 12,
    question: "Visible line(s) on display",
    imgUrl: lineOnDisplayImage,
  },
  {
    id: 13,
    question: "Display faded along edges",
    imgUrl: fadedDisplayImage,
  },
  {
    id: 14,
    question: "No line(s) on Display",
    imgUrl: nolineImage,
  },
];

const Round2sub2 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState([]);

  if (Result.length === 0) {
    navigate(`/model/${params.id}/choosevariant`);
  }

  const handleCheckboxChange = (questionId, isChecked) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: isChecked ? "Yes" : undefined,
    }));

    setResult((prevResult) => {
      const updatedResult = [...prevResult];
      const index = updatedResult.findIndex((item) => item.id === questionId);

      if (index !== -1) {
        if (isChecked) {
          updatedResult[index] = {
            id: questionId,
            selectedOption: "Yes",
            question:
              subQuestionsArray2.find((q) => q.id === questionId)?.question ||
              "Not answered",
          };
        } else {
          updatedResult.splice(index, 1);
        }
      } else {
        if (isChecked) {
          updatedResult.push({
            id: questionId,
            selectedOption: "Yes",
            question:
              subQuestionsArray2.find((q) => q.id === questionId)?.question ||
              "Not answered",
          });
        }
      }

      return updatedResult;
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    result.forEach((singleResult) => Result.push(singleResult));
    const sortedResult = result.sort((a, b) => a.id - b.id);
    navigate(`/model/${params.id}/round3`);
  };
  return (
    <Layout>
      <div className="w-full my-20 bg-white shadow-md p-4">
        <p className="text-xl">
          Tell us more about your device's screen defects?
        </p>
        <div className="flex justify-evenly items-start my-8 flex-wrap">
          {subQuestionsArray2.map((question) => (
            <label>
              <div
                className="w-48 max-[500px]:w-40 max-[500px]:h-48 max-[500px]:py-2 h-56 rounded-md my-2 border rounded-md flex flex-col justify-center items-center cursor-pointer"
                key={question.id}
              >
                <img src={question.imgUrl} alt="" className="w-1/2 h-1/2" />
                <p className="text-center text-sm py-4 w-full">
                  {question.question}
                </p>
                <input
                  type="checkbox"
                  className="scale-150"
                  onChange={(e) =>
                    handleCheckboxChange(question.id, e.target.checked)
                  }
                />
              </div>
            </label>
          ))}
        </div>
        <button
          className="bg-cyan-500 px-4 py-2 rounded-md text-white text-xl flex justify-center items-center gap-4 mx-auto"
          onClick={handleContinue}
        >
          Continue
          <i>
            <FaArrowRight />
          </i>
        </button>
      </div>
    </Layout>
  );
};

export default Round2sub2;
