import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getBrand, clearErrors, deleteBrand } from "../../actions/brandAction";
import { DELETE_BRAND_RESET } from "../../constants/brandConstant";
import BasicModal from "../layout/Modal";
import { toast } from "react-toastify";
import "./UserList.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const Brands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, brands } = useSelector((state) => state.brands);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.brand);

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const deleteBrandHandler = (id) => {
    setSelectedBrandId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedBrandId) {
      dispatch(deleteBrand(selectedBrandId));
      setSelectedBrandId(null);
      setOpenModal(false);
      toast.success("Brand Deleted Successfully");
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
      dispatch({ type: DELETE_BRAND_RESET });
    }

    dispatch(getBrand());
  }, [dispatch, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "Brand ID", minWidth: 200, flex: 0.8 },
    {
      field: "brandName",
      headerName: "Brand Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "brandImage",
      headerName: "Brand Logo",
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
            <Link to={`/admin/brand/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteBrandHandler(params.getValue(params.id, "id"))
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

  brands &&
    brands.forEach((brand) => {
      rows.push({
        id: brand._id,
        brandName: brand?.brand,
        brandImage: brand?.image?.url,
      });
    });

  rows.reverse();
  return (
    <div className="flex flex-col justify-start items-start w-full h-screen">
      <MetaData title={`ALL Brands - Admin`} />
      <h1 id="userListHeading">ALL BRANDS</h1>
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
export default Brands;
