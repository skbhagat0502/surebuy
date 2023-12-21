import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import profilePic from "../../assets/profile.png";
import { FaRegListAlt, FaUsers } from "react-icons/fa";
import { MdOutlineInventory2, MdLogout } from "react-icons/md";
import { clearErrors, logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isAuthenticated } = useSelector((state) => state.user);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors(error));
    }
  }, [error, isAuthenticated]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    navigate("/");
  };

  const sidebarClass = `z-30 max-[420px]:w-full w-72 h-full bg-white border-r-2 border-[#BAE8E8] flex flex-col justify-start fixed items-start left-0 top-0 ${
    isSidebarOpen ? "visible" : "hidden"
  }`;

  return (
    <Fragment>
      <i
        className="absolute z-40 right-20 top-[1rem] text-3xl cursor-pointer"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu />
      </i>
      <div className={`${sidebarClass} pl-10`}>
        <div className="flex flex-col justify-center items-center ml-6">
          <img src={profilePic} alt="admin profile pic" className="w-32" />
          Hello {user?.name ? `${user?.name.split(" ")[0]}!` : "there!"}
        </div>
        <div className="flex flex-col justify-between items-start pt-5 mt-20 h-full py-[5rem]">
          <div>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
            >
              <i
                className={`${
                  props.screenName === "Dashboard"
                    ? "bg-gray-800"
                    : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <FaRegListAlt />
              </i>
              Dashboard
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => navigate("/admin/orders")}
            >
              <i
                className={`${
                  props.screenName === "Orders" ? "bg-gray-800" : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <FaRegListAlt />
              </i>
              Orders
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => navigate("/admin/inventory")}
            >
              <i
                className={`${
                  props.screenName === "Inventory"
                    ? "bg-gray-800"
                    : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <MdOutlineInventory2 />
              </i>
              Inventory
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => {
                navigate("/admin/users");
              }}
            >
              <i
                className={`${
                  props.screenName === "Users" ? "bg-gray-800" : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <FaUsers />
              </i>
              All Users
            </button>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <button
              className="flex gap-2 items-center justify-center text-xl"
              onClick={() => navigate("/")}
            >
              <i className="p-2 rounded-md bg-[#BAE8E8] text-white">
                <IoHomeOutline />
              </i>
              Go Home
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl"
              onClick={handleLogout}
            >
              <i className="p-2 rounded-md bg-[#BAE8E8] text-white">
                <MdLogout />
              </i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
