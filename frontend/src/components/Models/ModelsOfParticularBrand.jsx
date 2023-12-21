import React, { Fragment, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrandDetails, clearErrors } from "../../actions/brandAction";
import Layout from "../../components/layout/Layout";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/Metadata";

const ModelsOfParticularBrand = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { error, loading, brand } = useSelector((state) => state.brandDetails);
  const brandId = params.id;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getBrandDetails(brandId));
  }, [dispatch, error, brandId]);
  const modelsOfParticularBrand = brand?.modelsOfParticularBrand;
  return (
    <Fragment>
      <MetaData title={`${brand.brand} mobile phones`} />
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-14 mx-[6vmax] max-[420px]:mx-2">
            <h6 className="text-3xl font-300 px-2">
              Sell Your {brand?.brand} mobile phones at best price.
            </h6>
            <p className="font-bold text-xl mt-10">Select model</p>
            <div className="flex flex-wrap gap-10 max-[500px]:gap-4 mx-auto my-10 mb-20">
              {modelsOfParticularBrand ? (
                modelsOfParticularBrand.map((model) => (
                  <NavLink
                    key={model._id}
                    className="w-40 h-40 bg-white shadow-lg rounded-lg overflow-hidden grid place-items-center"
                    to={`/model/${model._id}`}
                  >
                    <img
                      src={model.image.url}
                      alt={model.model}
                      className="w-32 h-32 object-cover"
                    />
                    <p className="text-center my-2">{model.model}</p>
                  </NavLink>
                ))
              ) : (
                <p>
                  OOPS
                  <br />
                  No models found for this brand!
                </p>
              )}
            </div>
          </div>
        )}
      </Layout>
    </Fragment>
  );
};

export default ModelsOfParticularBrand;
