import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getVariant,
  clearErrors,
  deleteVariant,
} from "../../actions/variantAction";
import { DELETE_VARIANT_RESET } from "../../constants/variantConstant";
import BasicModal from "../layout/Modal";
import { toast } from "react-toastify";
import "./UserList.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const Variants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, variants } = useSelector((state) => state.variants);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.variant);

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const deleteVariantHandler = (id) => {
    setSelectedVariantId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedVariantId) {
      dispatch(deleteVariant(selectedVariantId));
      setSelectedVariantId(null);
      setOpenModal(false);
      toast.success("Variant Deleted Successfully!");
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
      dispatch({ type: DELETE_VARIANT_RESET });
    }

    dispatch(getVariant());
  }, [dispatch, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "Variant ID", minWidth: 200, flex: 0.8 },
    {
      field: "variantName",
      headerName: "Variant Name",
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
            <Button
              onClick={() =>
                deleteVariantHandler(params.getValue(params.id, "id"))
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

  variants &&
    variants.forEach((variant) => {
      rows.push({
        id: variant._id,
        variantName: variant?.variant,
      });
    });
  rows.reverse();
  return (
    <div className="flex flex-col justify-start items-start w-full h-screen">
      <MetaData title={`ALL Variants - Admin`} />
      <h1 id="userListHeading">ALL VARIANTS</h1>
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
export default Variants;
