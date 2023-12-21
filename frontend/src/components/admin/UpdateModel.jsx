import React, { useEffect, useState } from "react";
import "./newItems.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getModelDetails,
  updateModel,
} from "../../actions/modelAction";
import { getBrand } from "../../actions/brandAction";
import { getVariant } from "../../actions/variantAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { toast } from "react-toastify";
import { UPDATE_MODEL_RESET } from "../../constants/modelConstant";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";

const UpdateModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { error, model } = useSelector((state) => state.modelDetails);
  const { brands } = useSelector((state) => state.brands);
  const { variants } = useSelector((state) => state.variants);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.model);

  const [modelName, setModelName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [variantsArray, setVariantsArray] = useState([]);
  const [price, setPrice] = useState("0");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const modelId = params.id;

  useEffect(() => {
    if (!model || model._id !== modelId) {
      dispatch(getModelDetails(modelId));
    } else {
      setModelName(model.model);
      setSelectedBrand(model.brand);
      setVariantsArray(model.variants.map((variant) => variant));
      setPrice(model.price);
      setOldImage(model.image);
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
      toast.success("Model Updated Successfully");
      navigate("/admin/inventory");
      dispatch({ type: UPDATE_MODEL_RESET });
    }
    dispatch(getBrand());
    dispatch(getVariant());
  }, [dispatch, error, isUpdated, model, modelId, updateError, navigate]);

  const updateModelSubmitHandler = (e) => {
    e.preventDefault();

    if (!modelName || !selectedBrand || !price || !variantsArray) {
      toast.warning("Please fill all the details!");
      return;
    }

    const myForm = new FormData();
    myForm.set("model", modelName);
    myForm.set("brand", selectedBrand);
    myForm.set("price", price);

    if (image) {
      myForm.set("image", image);
    }

    variantsArray.forEach((variant) => {
      myForm.append("variants[]", variant);
    });

    dispatch(updateModel(modelId, myForm));
  };

  const updateModelImagesChange = (e) => {
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

  const handleVariantSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedVariants = selectedOptions.map((option) => option.value);
    setVariantsArray(selectedVariants);
  };

  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title="Update Model" />
      <SideBar />
      <div className="grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newItemContainer">
          <form
            className="createItemForm h-[90%]"
            encType="multipart/form-data"
            onSubmit={updateModelSubmitHandler}
          >
            <h1>Update Model</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Model Name"
                required
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Choose Brand</option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.brand}>
                    {brand.brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                onChange={handleVariantSelection}
                multiple
                value={variantsArray}
              >
                <option value="">Choose Variants</option>
                {variants?.map((variant) => (
                  <option key={variant.id} value={variant.variant}>
                    {variant.variant}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div id="createItemFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateModelImagesChange}
              />
            </div>
            {oldImage && (
              <div id="createItemFormImage">
                <img src={oldImage?.url} alt="Old Model Image Preview" />
              </div>
            )}
            {image && (
              <div id="createItemFormImage">
                <img src={image} alt="Model Preview" />
              </div>
            )}

            <Button
              id="createItemBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Model
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
