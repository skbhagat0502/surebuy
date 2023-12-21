import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";
import { useDispatch, useSelector } from "react-redux";
import { getVariant, clearErrors } from "../../actions/variantAction";
import Loader from "../layout/Loader/Loader";

const ChooseVariant = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { error, loading, variants } = useSelector((state) => state.variants);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getVariant());
  }, [error, dispatch]);

  const questionsArray = [
    {
      id: 100,
      question: "Choose a variant",
      options: variants.map((variant) => variant.variant),
    },
  ];

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
    navigate(`/model/${params.id}/round1`);
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <form
          className="w-full my-20 bg-white shadow-md p-4"
          onSubmit={handleContinue}
        >
          {questionsArray.map((question) => (
            <div
              className="flex flex-col justify-evenly items-start my-8"
              key={question.id}
            >
              <p className="text-black font-semibold">{question.question}</p>
              <div className="flex gap-4 my-2">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="bg-gray-300 px-4 py-2 rounded-md text-xl cursor-pointer"
                  >
                    <input
                      type="radio"
                      required
                      name={`question_${question.id}`}
                      onChange={() =>
                        handleOptionChange(
                          question.id,
                          option,
                          question.question
                        )
                      }
                      className="scale-125 mr-4"
                    />
                    <span>{option}</span>
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
      )}
    </Layout>
  );
};

export default ChooseVariant;
