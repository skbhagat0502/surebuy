import React, { Fragment, useEffect, useState } from "react";
import "./newItems.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createVariant } from "../../actions/variantAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import { CREATE_VARIANT_RESET } from "../../constants/variantConstant";
import { useNavigate } from "react-router-dom";

const NewVariant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newVariant);

  const [variant, setVariant] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Variant Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: CREATE_VARIANT_RESET });
    }
  }, [dispatch, error, success]);

  const createVariantSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("variant", variant);

    dispatch(createVariant(myForm));
  };

  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title="List Variant" />
      <SideBar />
      <div className="grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newItemContainer">
          <form
            className="createItemForm"
            encType="multipart/form-data"
            onSubmit={createVariantSubmitHandler}
          >
            <h1>List Variant</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Variant Name"
                required
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
              />
            </div>
            <Button
              id="createItemBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              List Variant
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVariant;
