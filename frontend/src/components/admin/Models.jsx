import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getModel, clearErrors, deleteModel } from "../../actions/modelAction";
import { DELETE_MODEL_RESET } from "../../constants/modelConstant";
import BasicModal from "../layout/Modal";
import { toast } from "react-toastify";
import "./UserList.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
const Models = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, models } = useSelector((state) => state.models);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.model);

  const [selectedModelId, setSelectedModelId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const deleteModelHandler = (id) => {
    setSelectedModelId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedModelId) {
      dispatch(deleteModel(selectedModelId));
      setSelectedModelId(null);
      setOpenModal(false);
      toast.success("Model Deleted Successfully!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/inventory");
      dispatch({ type: DELETE_MODEL_RESET });
    }

    dispatch(getModel());
  }, [dispatch, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "MODEL ID", minWidth: 200, flex: 0.8 },
    {
      field: "modelName",
      headerName: "Model Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "variants",
      headerName: "Variants",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "modelImage",
      headerName: "Model Image",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "basePrice",
      headerName: "Base Price",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/model/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteModelHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  models &&
    models.forEach((model) => {
      rows.push({
        id: model._id,
        modelName: model?.model,
        brandName: model?.brand,
        variants: model?.variants,
        modelImage: model?.image?.url,
        basePrice: model?.price,
      });
    });
  rows.reverse();
  return (
    <div className="flex flex-col justify-start items-start w-full h-screen">
      <MetaData title={`ALL Models - Admin`} />
      <h1 id="userListHeading">ALL MODELS</h1>
      <div className="flex justify-start items-start w-full h-screen pt-10">
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="userListTable"
              autoHeight
            />
          </div>
        )}
      </div>

      <BasicModal
        text="Are you sure that you want to delete!"
        btnText1="No"
        btnText2="Yes"
        open={openModal}
        handleClose={handleModalClose}
        handleConfirmation={handleConfirmation}
      />
    </div>
  );
};
export default Models;
