import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";
import brokenScratchImage from "../../assets/brokenscratch.png";
import visibleLinesImage from "../../assets/visiblelines.png";
import scratchDentImage from "../../assets/scratchdent.png";
import panelImage from "../../assets/panel.png";
import { FaArrowRight } from "react-icons/fa";

const questionsArray = [
  {
    id: 400,
    imgUrl: brokenScratchImage,
    question: "Broken/scratch on device screen",
  },
  {
    id: 500,
    question: "Dead spot/visible lines on screen",
    imgUrl: visibleLinesImage,
  },
  {
    id: 600,
    question: "Scratch/Dent on device body",
    imgUrl: scratchDentImage,
  },
  {
    id: 700,
    question: "Device panel missing/broken",
    imgUrl: panelImage,
  },
];

const Round2 = () => {
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
              questionsArray.find((q) => q.id === questionId)?.question ||
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
              questionsArray.find((q) => q.id === questionId)?.question ||
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

    for (const singleResult of sortedResult) {
      if (singleResult.id === 400 && singleResult.selectedOption === "Yes") {
        navigate(`/model/${params.id}/round2-sub1`);
        return;
      } else if (
        singleResult.id === 500 &&
        singleResult.selectedOption === "Yes"
      ) {
        navigate(`/model/${params.id}/round2-sub2`);
        return;
      } else if (
        singleResult.id === 600 &&
        singleResult.selectedOption === "Yes"
      ) {
        navigate(`/model/${params.id}/round2-sub3`);
        return;
      } else if (
        singleResult.id === 700 &&
        singleResult.selectedOption === "Yes"
      ) {
        navigate(`/model/${params.id}/round2-sub4`);
        return;
      }
    }
    navigate(`/model/${params.id}/round3`);
  };

  return (
    <Layout>
      <div className="w-full my-20 bg-white shadow-md p-4">
        <p className="text-xl">
          Select screen/body defects that are applicable!
        </p>
        <div className="flex justify-evenly items-start my-8 flex-wrap">
          {questionsArray.map((question) => (
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

export default Round2;
