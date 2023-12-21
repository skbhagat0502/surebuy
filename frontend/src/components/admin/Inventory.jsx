import SideBar from "./SideBar";
import MetaData from "../layout/MetaData";
import Brands from "./Brands";
import Models from "./Models";
import Variants from "./Variants";
import { useState } from "react";
const Inventory = (props) => {
  const [showPage, setShowPage] = useState("Brands");
  return (
    <div className="flex justify-start items-start w-full h-screen pt-10">
      <MetaData title={`Inventory - Admin`} />
      <SideBar screenName="Inventory" />
      <div className="dashboard grow-1 w-full h-full sm:px-10 px-2 flex flex-wrap gap-10 pt-10">
        <div className="flex flex-wrap gap-10 mt-[-100px] max-[500px]:gap-2 max-[500px]:mt-[-3rem] max-[500px]:mx-auto">
          <button
            className={`${
              props.screenName === "Users" ? "bg-gray-800" : "bg-[#BAE8E8]"
            } mt-[5rem] w-[200px] h-[50px] bg-[#52616B] rounded-2xl text-black grid place-items-center text-3xl max-[500px]:w-[max-content] max-[500px]:px-2 max-[500px]:rounded-sm max-[500px]:text-xl`}
            onClick={() => setShowPage("Brands")}
          >
            All Brands
          </button>
          <button
            className={`${
              props.screenName === "Users" ? "bg-gray-800" : "bg-[#BAE8E8]"
            } mt-[5rem] w-[200px] h-[50px] bg-[#52616B] rounded-2xl text-black grid place-items-center text-3xl max-[500px]:w-[max-content] max-[500px]:px-2 max-[500px]:rounded-sm max-[500px]:text-xl`}
            onClick={() => setShowPage("Models")}
          >
            All Models
          </button>
          <button
            className={`${
              props.screenName === "Users" ? "bg-gray-800" : "bg-[#BAE8E8]"
            } mt-[5rem] w-[200px] h-[50px] bg-[#52616B] rounded-2xl text-black grid place-items-center text-3xl max-[500px]:w-[max-content] max-[500px]:px-2 max-[500px]:rounded-sm max-[500px]:text-xl`}
            onClick={() => setShowPage("Variants")}
          >
            All Variants
          </button>
        </div>
        {showPage === "Brands" && <Brands />}
        {showPage === "Models" && <Models />}
        {showPage === "Variants" && <Variants />}
      </div>
    </div>
  );
};
export default Inventory;
