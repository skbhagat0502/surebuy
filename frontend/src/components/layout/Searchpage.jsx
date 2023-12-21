import Search from "./Search";
import Layout from "./Layout";
import Metadata from "./Metadata";
import { Fragment, useState } from "react";
const SearchPage = () => {
  return (
    <Fragment>
      <Metadata title={`Search brands, models`} />
      <Layout>
        <div className="w-full h-[2.5rem] mt-[5rem]">
          <Search />
        </div>
      </Layout>
    </Fragment>
  );
};
export default SearchPage;
