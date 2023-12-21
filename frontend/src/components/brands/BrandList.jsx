import { useSelector, useDispatch } from "react-redux";
import Layout from "../layout/Layout";
import { Fragment, useEffect } from "react";
import { getBrand } from "../../actions/brandAction";
import { clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { NavLink } from "react-router-dom";
const BrandList = () => {
  const { error, loading, brands } = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getBrand());
  }, []);
  return (
    <Fragment>
      <Layout>
        <div className="w-full my-[5rem] grid place-items-center">
          <h6 className="w-full text-2xl font-bold text-center mb-[1.5rem]">
            All Brands
          </h6>
          {loading ? (
            <Loader />
          ) : (
            <div className="w-5/6 flex gap-10 flex-wrapd">
              {brands.map((brand) => (
                <NavLink
                  key={brand._id}
                  className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] bg-[#f5f5f5] grid place-items-center rounded-full shadow-lg shadow-gray-300 cursor-pointer overflow-hidden"
                  to={`/brand/${brand._id}`}
                >
                  <img src={brand.image.url} alt={brand.name} />
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </Fragment>
  );
};
export default BrandList;
