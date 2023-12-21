import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./SideBar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import "./processOrder.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const dispatch = useDispatch();
  const params = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id, isUpdated, updateError]);

  const date = new Date(order?.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title="Process Order" />
      <SideBar />
      <div className="dashboard grow-1 w-full h-full px-10 flex flex-wrap gap-10">
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="processOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="confirmshippingArea">
                <Typography>User Details</Typography>
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden mb-8">
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Name</td>
                      <td className="border px-4 py-2">
                        {order.user && order.user.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Phone</td>
                      <td className="border px-4 py-2">
                        {order.user && order.user.phone}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Email</td>
                      <td className="border px-4 py-2">
                        {order.user && order.user.email}
                      </td>
                    </tr>
                    {/* Add more user details if needed */}
                  </tbody>
                </table>

                <Typography>Shipping Info</Typography>
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden mb-8">
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Address</td>
                      <td className="border px-4 py-2">
                        {order.usersAddress &&
                          `${order.usersAddress.address}, ${order.usersAddress.city}, ${order.usersAddress.state}, ${order.usersAddress.pinCode}`}
                      </td>
                    </tr>
                    {/* Add more shipping details if needed */}
                  </tbody>
                </table>

                <Typography>Order Details</Typography>
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden mb-8">
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Amount Payable</td>
                      <td className="border px-4 py-2">
                        {order.itemPrice && order.itemPrice}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Date & Time</td>
                      <td className="border px-4 py-2">{formattedDate}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Order Status</td>
                      <td className="border px-4 py-2">
                        <span
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </span>
                      </td>
                    </tr>
                    {/* Add more order details if needed */}
                  </tbody>
                </table>

                <Typography>Device Condition</Typography>
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden mb-8">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border px-4 py-2">ID</th>
                      <th className="border px-4 py-2">Selected Option</th>
                      <th className="border px-4 py-2">Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.itemCondition &&
                      order.itemCondition.map((condition) => (
                        <tr key={condition.id}>
                          <td className="border px-4 py-2">{condition.id}</td>
                          <td className="border px-4 py-2">
                            {condition.selectedOption}
                          </td>
                          <td className="border px-4 py-2">
                            {condition.question}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "successfull" && (
                        <option value="Out for Receiving">
                          Out for Receiving
                        </option>
                      )}

                      {order.orderStatus === "Out for Receiving" && (
                        <option value="Received">Received</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;
