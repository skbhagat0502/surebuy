import { useSelector, useDispatch } from "react-redux";
import Layout from "../layout/Layout";
import { Result } from "../DeviceEvaluation/Result";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getModelDetails, clearErrors } from "../../actions/modelAction";
import Loader from "../layout/Loader/Loader";

const Checkout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { error, loading, model } = useSelector((state) => state.modelDetails);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [price, setPrice] = useState(0);
  if (!isAuthenticated) {
    toast.info("Please login to see the final price!");
  }

  if (Result.length === 0) {
    navigate(`/model/${params.id}/choosevariant`);
  }

  localStorage.setItem("result", JSON.stringify(Result));
  localStorage.setItem("model", JSON.stringify(params.id));
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getModelDetails(params.id));
  }, [params.id]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const handlePriceCalculator = async () => {
    try {
      const response = await axios.post(`/api/v1/model/${params.id}`, {
        result: Result,
        price: model.price,
      });

      const calculatedPrice = response.data.newPrice;
      setPrice(calculatedPrice);
      setButtonClicked(true);
    } catch (error) {
      console.error(error);
      toast.error("Error calculating price! Please try later.");
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center my-20">
          <div className="flex justify-center items-center flex-col">
            <button
              className="bg-cyan-500 text-xl text-white px-4 py-2 rounded-md"
              onClick={handlePriceCalculator}
            >
              Click here know your device value
            </button>
            {buttonClicked && (
              <div className="w-full h-48 bg-white flex flex-col justify-center items-center shadow-[0_0px_60px_-25px_rgba(0,0,0,0.5)] mt-10 rounded-md px-2">
                <p className="text-xl font-semibold my-4 max-[500px]:mx-4">
                  Based on your device condition your price is Rs.
                  <span className="text-green-500">{price.toFixed(2)}</span>
                </p>
                <button
                  className="bg-cyan-500 text-xl text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/model/${params.id}/shipping/`)}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;
