import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBrand, clearErrors } from "../../actions/brandAction";
import Loader from "../layout/Loader/Loader";
import { NavLink } from "react-router-dom";
import dotImage from "../../assets/dot.png";

const Brands = () => {
  const dispatch = useDispatch();
  const { error, loading, brands } = useSelector((state) => state.brands);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getBrand());
  }, [dispatch, error]);

  return (
    <div className="w-full mb-[5rem] mt-[2rem] grid place-items-center max-[800px]:mt-[5rem] max-[500px]:mt-[2rem]">
      <h6 className="w-full text-2xl font-bold text-center mb-[1.5rem]">
        Top Selling Brands
      </h6>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-5/6 flex gap-10 overflow-x-scroll scrollbar-hide">
            {brands &&
              brands.map((brand) => (
                <NavLink
                  key={brand._id}
                  className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] bg-[#f5f5f5] grid place-items-center rounded-full shadow-lg shadow-gray-300 cursor-pointer overflow-hidden"
                  to={`/brand/${brand._id}`}
                >
                  <img src={brand.image.url} alt={brand.name} />
                </NavLink>
              ))}
            <NavLink
              className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] bg-[#f5f5f5] grid place-items-center rounded-full shadow-lg shadow-gray-300 cursor-pointer overflow-hidden"
              to={`/brands`}
            >
              <p className="m-0 text-lg">SEE ALL</p>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Brands;
