import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import "../admin/ProcessOrder.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Header/Navbar";
const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);

  const date = new Date(order?.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <>
      <Navbar />
      <div className="flex justify-start items-start w-full h-screen pt-10">
        <MetaData title="Your Sellings" />
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
                    </tbody>
                  </table>

                  <Typography>Device Condition</Typography>
                  <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden mb-8">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border px-4 py-2">Question</th>
                        <th className="border px-4 py-2">Selected Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.itemCondition &&
                        order.itemCondition.map((condition) => (
                          <tr key={condition.id}>
                            <td className="border px-4 py-2">
                              {condition.question}
                            </td>
                            <td className="border px-4 py-2">
                              {condition.selectedOption}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
