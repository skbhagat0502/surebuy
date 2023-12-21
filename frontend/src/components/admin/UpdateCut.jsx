import React, { useEffect, useState } from "react";
import "./newItems.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getCutDetails, updateCut } from "../../actions/cutAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { toast } from "react-toastify";
import { UPDATE_CUT_CONSTANT_RESET } from "../../constants/cutConstant";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";

const UpdateModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { error, cut } = useSelector((state) => state.cutDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.cut);
  const [cutId, setCutId] = useState(0);
  const [question, setQuestion] = useState("");
  const [cutPercentage, setCutPercentage] = useState(0);
  const cutid = params.id;
  useEffect(() => {
    if (!cut || cut._id !== cutid) {
      dispatch(getCutDetails(cutid));
    } else {
      setCutId(cut.Id);
      setQuestion(cut.question);
      setCutPercentage(cut.cut);
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
      toast.success("Cut Updated Successfully");
      navigate("/admin/inventory");
      dispatch({ type: UPDATE_CUT_CONSTANT_RESET });
    }
  }, [dispatch, error, isUpdated, cut, cutid, updateError, navigate]);

  const updateCutSubmitHandler = (e) => {
    e.preventDefault();

    if (!cutId || !question || !cutPercentage) {
      toast.warning("Please fill all the details!");
      return;
    }

    const myForm = new FormData();
    myForm.set("Id", cutId);
    myForm.set("question", question);
    myForm.set("cut", cutPercentage);

    dispatch(updateCut(cutid, myForm));
  };

  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title="Update Cut" />
      <SideBar />
      <div className="grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newItemContainer">
          <form
            className="createItemForm h-[90%]"
            encType="multipart/form-data"
            onSubmit={updateCutSubmitHandler}
          >
            <h1>Update Cut</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="number"
                placeholder="Cut ID"
                required
                value={cutId}
                onChange={(e) => setCutId(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Question"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Cut Percentage"
                required
                value={cutPercentage}
                onChange={(e) => setCutPercentage(e.target.value)}
              />
            </div>
            <Button
              id="createItemBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Cut
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
