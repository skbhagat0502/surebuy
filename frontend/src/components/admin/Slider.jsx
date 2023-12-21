import React, { Fragment, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Fab from "@mui/material/Fab";
import {
  DELETE_BANER_RESET,
  NEW_BANER_RESET,
} from "../../constants/banerConstant";
import DeleteIcon from "@material-ui/icons/Delete";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBaners,
  clearErrors,
  deleteBaner,
  newBaner,
} from "../../actions/banerAction";
import { toast } from "react-toastify";

const Slider = () => {
  const dispatch = useDispatch();
  const { error, loading, baners } = useSelector((state) => state.allBaners);
  const { isDeleted } = useSelector((state) => state.baner);
  const { success } = useSelector((state) => state.newBaner);
  const [image, setImage] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Slide deleted successfully!");
      dispatch({ type: DELETE_BANER_RESET });
    }
    if (success) {
      toast.success("Baner set successfully!");
      dispatch({ type: NEW_BANER_RESET });
    }
    dispatch(getAllBaners());
  }, [dispatch, error, isDeleted, success]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? baners?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === baners?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleDeleteBaner = (banerId) => {
    dispatch(deleteBaner(banerId));
  };

  const handleUpload = async () => {
    const myForm = new FormData();
    myForm.append("image", image);

    dispatch(newBaner(myForm));
    setImage(null);
  };

  const createBanerImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImage(null);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage((old) => (old, reader.result));
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const CenteredUploadButton = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-96 mt-[5rem] max-[420px]:mt-[3rem] relative">
          <div className="w-5/6 h-full m-auto px-2 group max-[420px]:w-full">
            <div
              style={{
                backgroundImage: `url(${
                  baners?.length
                    ? baners[currentIndex]?.image?.url
                    : "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
                })`,
              }}
              className="w-full aspect-video rounded-2xl bg-center bg-cover duration-500 relative"
            >
              {isAuthenticated && user.role === "admin" && (
                <CenteredUploadButton>
                  {!image && (
                    <label className="cursor-pointer bg-white px-4 py-2 rounded-md flex justify-center items-center gap-2">
                      <CloudUploadIcon />
                      Upload file
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={createBanerImagesChange}
                      />
                    </label>
                  )}
                  {image && (
                    <button
                      variant="contained"
                      onClick={handleUpload}
                      className="cursor-pointer bg-white px-4 py-2 rounded-md flex justify-center items-center gap-2"
                    >
                      Submit
                    </button>
                  )}
                </CenteredUploadButton>
              )}
              <BsChevronCompactLeft
                onClick={prevSlide}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 text-4xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
              />
              <BsChevronCompactRight
                onClick={nextSlide}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 text-4xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
              />
            </div>
            {isAuthenticated && user.role === "admin" && (
              <div className="flex gap-4 justify-center items-center mt-[-3rem]">
                <div
                  className="p-2 text-2xl rounded-full bg-black/20 text-white cursor-pointer"
                  onClick={() => handleDeleteBaner(baners[currentIndex]._id)}
                >
                  <Fab color="primary" aria-label="delete">
                    <DeleteIcon />
                  </Fab>
                </div>
              </div>
            )}
            <div className="flex top-4 justify-center py-2">
              {baners &&
                baners.map((baner, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className="text-2xl cursor-pointer"
                  >
                    <RxDotFilled />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Slider;
