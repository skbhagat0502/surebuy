import { Fragment, useEffect } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getModelDetails, clearErrors } from "../../actions/modelAction";
import Loader from "../layout/Loader/Loader";
import { FaArrowRight } from "react-icons/fa";
import MetaData from "../layout/MetaData";

const Model = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const modelId = params.id;
  const { error, loading, model } = useSelector((state) => state.modelDetails);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getModelDetails(modelId));
  }, [modelId, error, dispatch]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={model.model} />
          <div className="my-20">
            <p className="text-2xl font-300 ml-12 my-4">
              Sell old {model.model}
            </p>
            <div className="w-[83vw] max-[500px]:w-full h-[max-content] py-8 bg-white shadow-[0_0px_60px_-25px_rgba(0,0,0,0.5)] flex items-center mx-auto rounded-md max-[870px]:w-[50vw] flex-col">
              <div className="w-1/3 min-w-[20rem] h-full grid place-items-center max-[850px]:w-1/2">
                <img src={model?.image?.url} alt={model?.model} />
              </div>
              <div className="flex flex-col justify-center items-center grow max-[700px]:items-center max-[700px]:text-center">
                <p className="text-2xl font-300 mb-4">{model.model}</p>
                <p className="mb-4">
                  Get upto
                  <br />
                  <span className="text-3xl font-bold text-green-300 mb-8">
                    {`₹${model.price}`}
                  </span>
                </p>
                <NavLink
                  className="bg-black flex text-white justify-center items-center gap-4 px-4 py-2 rounded-lg mb-4 shadow-md shadow-white"
                  to={`/model/${modelId}/choosevariant`}
                >
                  Get Exact Value
                  <i>
                    <FaArrowRight />
                  </i>
                </NavLink>
                <p className="h-100px bg-yellow-100 px-4 py-2 w-full">
                  The price stated above depends on the condition of the product
                  and is not final.The final price will be quoted at the end of
                  the diagnosis.
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Layout>
  );
};
export default Model;
