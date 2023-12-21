import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";
import { FaArrowRight } from "react-icons/fa";
import brokenPanelImage from "../../assets/brokenpanel.png";
import backPanelImage from "../../assets/backpanel.png";
import noDefectPanelImage from "../../assets/nopanel.png";
import curvedPanelImage from "../../assets/curvedpanel.jpg";
import looseScreenImage from "../../assets/loosescreen.jpg";
import noBentImage from "../../assets/nobent.jpg";

const subQuestionsArray4 = [
  {
    id: 21,
    question: "Cracked/ broken side or back panel",
    imgUrl: brokenPanelImage,
  },
  {
    id: 22,
    question: "Missing side or back panel",
    imgUrl: backPanelImage,
  },
  {
    id: 23,
    question: "No defect on side or back panel",
    imgUrl: noDefectPanelImage,
  },
  {
    id: 24,
    question: "Bent/ curved panel",
    imgUrl: curvedPanelImage,
  },
  {
    id: 25,
    question: "Loose screen (Gap in screen and body)",
    imgUrl: looseScreenImage,
  },
  {
    id: 26,
    question: "Phone not bent",
    imgUrl: noBentImage,
  },
];

const Round2sub4 = () => {
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
              subQuestionsArray4.find((q) => q.id === questionId)?.question ||
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
              subQuestionsArray4.find((q) => q.id === questionId)?.question ||
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
          Tell us more about your device's body defects?
        </p>
        <div className="flex justify-evenly items-start my-8 flex-wrap">
          {subQuestionsArray4.map((question) => (
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

export default Round2sub4;
