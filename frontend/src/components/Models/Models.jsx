import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getModel, clearErrors } from "../../actions/modelAction";
import Loader from "../layout/Loader/Loader";
import { NavLink } from "react-router-dom";

const Models = () => {
  const { error, loading, models } = useSelector((state) => state.models);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getModel());
  }, [dispatch, error]);

  return (
    <div className="w-full mt-5 mb-[5rem] grid place-items-center">
      <h6 className="w-full text-2xl font-bold text-center mb-[1.5rem]">
        Top Selling Models
      </h6>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-5/6 flex gap-10 overflow-x-scroll scrollbar-hide">
          {models &&
            models.map((model) => (
              <NavLink
                key={model._id}
                className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] bg-[#f5f5f5] grid place-items-center rounded-full shadow-lg shadow-gray-300 cursor-pointer overflow-hidden"
                to={`/model/${model._id}`}
              >
                <img src={model.image.url} alt={model.name} />
              </NavLink>
            ))}
        </div>
      )}
    </div>
  );
};

export default Models;
