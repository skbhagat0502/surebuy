import React, { useState } from "react";
import surebuyLogo from "../../../assets/surebuyLogo.png";
import Search from "../Search";
import { NavLink } from "react-router-dom";
import LoginSignUp from "../../user/LoginSignUp";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          (
          <nav className="w-full flex-col fixed top-0 left-0 z-10 bg-white">
            <div className="flex justify-center gap-10 px-[10vmax] items-center shadow-sm shadow-slate-300 h-[4rem] max-[500px]:justify-between max-[500px]:px-2 max-[500px]:gap-2">
              <NavLink to="/">
                <img
                  src={surebuyLogo}
                  alt="surebuyLogo"
                  className="w-[150px] cursor-pointer max-[620px]:w-[15vmax] max-[400px]:w-[20vmax]"
                />
              </NavLink>
              <div className="max-[500px]:hidden w-[100%]">
                <Search />
              </div>
              <NavLink
                className="min-[500px]:hidden mr-[6rem] text-2xl"
                to="/search"
              >
                <GoSearch />
              </NavLink>

              {!isAuthenticated && (
                <button
                  className="bg-cyan-500 py-[0.2rem] rounded-md text-white w-28 text-lg"
                  onClick={handleOpen}
                  variant="contained"
                  color="primary"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
          <LoginSignUp open={open} onClose={handleClose} />)
        </>
      )}
    </>
  );
};

export default Navbar;
