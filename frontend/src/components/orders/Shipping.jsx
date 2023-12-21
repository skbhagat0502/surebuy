import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { State } from "country-state-city";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../layout/Header/Navbar";
import { createOrder } from "../../actions/orderAction";
import { getModelDetails, clearErrors } from "../../actions/modelAction";
import axios from "axios";
import { Result } from "../DeviceEvaluation/Result";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { error, model } = useSelector((state) => state.modelDetails);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getModelDetails(params.id));
  }, [error, dispatch]);
  const shippingSubmit = async (e) => {
    e.preventDefault();
    let itemPrice;
    try {
      const response = await axios.post(`/api/v1/model/${params.id}`, {
        result: Result,
        price: model.price,
      });
      itemPrice = response.data.newPrice;
    } catch (error) {
      console.error(error);
      toast.error("Error creating an order!");
    }
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        address,
        city,
        state,
        pinCode,
        phoneNo,
      })
    );
    const usersAddress = JSON.parse(localStorage.getItem("shippingInfo"));
    const modelId = JSON.parse(localStorage.getItem("model"));
    const itemCondition = JSON.parse(localStorage.getItem("result"));
    const receivingCost = 0;
    const totalPrice = model?.price;
    const order = {
      usersAddress,
      modelId,
      itemCondition,
      receivingCost,
      itemPrice,
      totalPrice,
    };
    dispatch(createOrder(order));
    toast.success("Device sold Successfully.");
    navigate("/");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <Navbar />
      <div className="shippingContainer mt-20">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <TransferWithinAStationIcon />

              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type="submit"
              value="Confirm Selling"
              className="shippingBtn text-xl text-white"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
