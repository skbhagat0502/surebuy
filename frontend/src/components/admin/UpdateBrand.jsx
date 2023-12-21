import React, { useEffect, useState } from "react";
import "./newItems.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getBrandDetails,
  updateBrand,
} from "../../actions/brandAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { toast } from "react-toastify";
import { UPDATE_BRAND_RESET } from "../../constants/brandConstant";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";

const UpdateBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { error, brand } = useSelector((state) => state.brandDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.brand);

  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const brandId = params.id;
  useEffect(() => {
    if (!brand || brand._id !== brandId) {
      dispatch(getBrandDetails(brandId));
    } else {
      setBrandName(brand.brand);
      setOldImage(brand.image);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Brand Updated Successfully");
      navigate("/admin/inventory");
      dispatch({ type: UPDATE_BRAND_RESET });
    }
  }, [dispatch, error, isUpdated, brand, brandId, updateError, navigate]);

  const updateBrandSubmitHandler = (e) => {
    e.preventDefault();

    if (!brandName) {
      toast.warning("Please fill all the details!");
      return;
    }

    const myForm = new FormData();
    myForm.set("brand", brandName);
    if (image) {
      myForm.set("image", image);
    }
    dispatch(updateBrand(brandId, myForm));
  };

  const updateBrandImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage(null);
    setOldImage(null);

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
      <MetaData title="Update Brand" />
      <SideBar />
      <div className="grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newItemContainer">
          <form
            className="createItemForm h-[90%]"
            encType="multipart/form-data"
            onSubmit={updateBrandSubmitHandler}
          >
            <h1>Update Brand</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Brand Name"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div id="createItemFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateBrandImagesChange}
              />
            </div>
            {oldImage && (
              <div id="createItemFormImage">
                <img src={oldImage?.url} alt="Old Brand logo Preview" />
              </div>
            )}
            {image && (
              <div id="createItemFormImage">
                <img src={image} alt="Brand logo Preview" />
              </div>
            )}

            <Button
              id="createItemBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Brand
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrand;
