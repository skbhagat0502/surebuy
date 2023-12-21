import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";
import frontCameraImage from "../../assets/frontcamera.jpg";
import backCameraImage from "../../assets/backcamera.jpg";
import volumeButtonImage from "../../assets/volumebutton.jpg";
import fingerTouchImage from "../../assets/fingertouch.jpg";
import wifiImage from "../../assets/wifiimage.jpg";
import batteryImage from "../../assets/battery.jpg";
import speakerImage from "../../assets/speaker.jpg";
import powerbutton from "../../assets/powerbutton.jpg";
import chargingPortImage from "../../assets/chargingport.jpg";
import faceImage from "../../assets/face.jpg";
import silentButtonImage from "../../assets/silentbutton.png";
import audioImage from "../../assets/audio.png";
import cameraGlassImage from "../../assets/cameraglass.png";
import blutoothImage from "../../assets/blutooth.png";
import vibratorImage from "../../assets/vibrator.png";
import microphoneImage from "../../assets/microphone.png";
import proximityImage from "../../assets/proximity.png";
import { FaArrowRight } from "react-icons/fa";

const questionsArray = [
  {
    id: 27,
    question: "Front Camera not working",
    imgUrl: frontCameraImage,
  },
  {
    id: 28,
    question: "Back Camera not working",
    imgUrl: backCameraImage,
  },
  {
    id: 29,
    question: "Volume Button not working",
    imgUrl: volumeButtonImage,
  },
  {
    id: 30,
    question: "Finger Touch not working",
    imgUrl: fingerTouchImage,
  },
  {
    id: 31,
    question: "WiFi not working",
    imgUrl: wifiImage,
  },
  {
    id: 32,
    question: "Battery Faulty",
    imgUrl: batteryImage,
  },
  {
    id: 33,
    question: "Speaker Faulty",
    imgUrl: speakerImage,
  },
  {
    id: 34,
    question: "Power Button not working",
    imgUrl: powerbutton,
  },
  {
    id: 35,
    question: "Charging Port not working",
    imgUrl: chargingPortImage,
  },
  {
    id: 36,
    question: "Face Sensor not working",
    imgUrl: faceImage,
  },
  {
    id: 37,
    question: "Silent Button not working",
    imgUrl: silentButtonImage,
  },
  {
    id: 38,
    question: "Audio Receiver not working",
    imgUrl: audioImage,
  },
  {
    id: 39,
    question: "Camera Glass Broken",
    imgUrl: cameraGlassImage,
  },
  {
    id: 40,
    question: "Bluetooth not working",
    imgUrl: blutoothImage,
  },
  {
    id: 41,
    question: "Vibrator is not working",
    imgUrl: vibratorImage,
  },
  {
    id: 42,
    question: "Microphone not working",
    imgUrl: microphoneImage,
  },
  {
    id: 43,
    question: "Proximity Sensor not working",
    imgUrl: proximityImage,
  },
];

const Round3 = () => {
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
    navigate(`/model/${params.id}/round4`);
  };
  return (
    <Layout>
      <div className="w-full my-20 bg-white shadow-md p-4">
        <p className="text-xl">Functional or Physical Problems</p>
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

export default Round3;
