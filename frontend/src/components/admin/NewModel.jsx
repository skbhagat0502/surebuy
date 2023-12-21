import React, { useEffect, useState } from "react";
import "./newItems.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createModel } from "../../actions/modelAction";
import { getVariant } from "../../actions/variantAction";
import { getBrand } from "../../actions/brandAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { toast } from "react-toastify";
import { CREATE_MODEL_RESET } from "../../constants/modelConstant";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const NewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newModel);
  const { brands } = useSelector((state) => state.brands);
  const { variants } = useSelector((state) => state.variants);
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [variantsArray, setVariantsArray] = useState([]);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Model Listed Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: CREATE_MODEL_RESET });
    }
    dispatch(getVariant());
    dispatch(getBrand());
  }, [dispatch, error, success]);

  const createModelSubmitHandler = (e) => {
    e.preventDefault();

    if (!model || !brand || !price || !image || !variantsArray.length) {
      toast.warning("Please fill all the details!");
      return;
    }

    const myForm = new FormData();
    myForm.set("model", model);
    myForm.set("brand", brand);
    myForm.set("price", price);
    myForm.set("image", image);

    variantsArray.forEach((variant) => {
      myForm.append("variants[]", variant);
    });

    dispatch(createModel(myForm));
  };

  const createModelImagesChange = (e) => {
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

  const handleVariantSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedVariants = selectedOptions.map((option) => option.value);
    setVariantsArray(selectedVariants);
  };

  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title="List Model" />
      <SideBar />
      <div className="grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newItemContainer">
          <form
            className="createItemForm h-[90%]"
            encType="multipart/form-data"
            onSubmit={createModelSubmitHandler}
          >
            <h1>List Model</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Model Name"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setBrand(e.target.value)} value={brand}>
                <option value="">Choose Brand</option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand._id}>
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
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div id="createItemFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createModelImagesChange}
              />
            </div>

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
              List Model
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewModel;
