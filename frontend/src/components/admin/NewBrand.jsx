import React, { Fragment, useEffect, useState } from "react";
import "./newItems.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBrand } from "../../actions/brandAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { toast } from "react-toastify";
import { CREATE_BRAND_RESET } from "../../constants/brandConstant";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const NewBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newBrand);

  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Brand Listed Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: CREATE_BRAND_RESET });
    }
  }, [dispatch, error, success]);

  const createBrandSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("brand", brand);
    myForm.set("image", image);
    dispatch(createBrand(myForm));
  };
  const createBrandImagesChange = (e) => {
    const files = Array.from(e.target.files);

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
  };

  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title="List Brand" />
      <SideBar />
      <div className="dashboard grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newItemContainer">
          <form
            className="createItemForm"
            encType="multipart/form-data"
            onSubmit={createBrandSubmitHandler}
          >
            <h1>List Brand</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Brand Name"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div id="createItemFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createBrandImagesChange}
              />
            </div>

            {image && (
              <div id="createItemFormImage">
                <img src={image} alt="Brand Preview" />
              </div>
            )}

            <Button
              id="createItemBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              List Brand
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBrand;
