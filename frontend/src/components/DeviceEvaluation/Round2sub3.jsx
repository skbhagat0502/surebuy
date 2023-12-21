import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";
import { FaArrowRight } from "react-icons/fa";
import moreScratchesImage from "../../assets/morescratches.png";
import twoScratchImage from "../../assets/twoscratch.png";
import noScratchImage from "../../assets/noscratch.jpg";
import majorDentImage from "../../assets/scratchdent.png";
import minorDentImage from "../../assets/minordent.png";
import noDentImage from "../../assets/nodent.png";
const subQuestionsArray3 = [
  {
    id: 15,
    question: "More than 2 scratches",
    imgUrl: moreScratchesImage,
  },
  {
    id: 16,
    question: "1-2 scratches",
    imgUrl: twoScratchImage,
  },
  {
    id: 17,
    question: "No scratches",
    imgUrl: noScratchImage,
  },
  {
    id: 18,
    question: "Major dent(s) or more than 2",
    imgUrl: majorDentImage,
  },
  {
    id: 19,
    question: "1-2 minor dents",
    imgUrl: minorDentImage,
  },
  {
    id: 20,
    question: "No dents",
    imgUrl: noDentImage,
  },
];

const Round2sub3 = () => {
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
              subQuestionsArray3.find((q) => q.id === questionId)?.question ||
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
              subQuestionsArray3.find((q) => q.id === questionId)?.question ||
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
          {subQuestionsArray3.map((question) => (
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

export default Round2sub3;
