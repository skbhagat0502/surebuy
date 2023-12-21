import React, { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 345,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  borderRadius: "14px",
};

const LoginSignUp = ({ open = false, onClose }) => {
  const [page, setPage] = useState("login");

  const handleSetPage = () => {
    if (page === "login") setPage("register");
    else setPage("login");
  };
  const [loginUser, setLoginUser] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const handleLoginChange = (e) => {
    setLoginUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterChange = (e) => {
    setRegisterUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerUser.name.trim()) {
      toast.warning("Please enter your name!");
    }
    if (!registerUser.email.trim()) {
      toast.warning("Please enter your email!");
    }
    if (!registerUser.phone.trim()) {
      toast.warning("Please enter your phone number!");
    }
    if (!registerUser.password.trim()) {
      toast.warning("Please enter a password!");
    }
    dispatch(register(registerUser));
    setRegisterUser({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
    onClose();
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginUser.emailOrPhone.trim()) {
      toast.warning("Please enter your email or phone!");
    }
    if (!loginUser.password.trim()) {
      toast.warning("Please enter your password!");
    }
    dispatch(login(loginUser.emailOrPhone, loginUser.password));
    setLoginUser({
      emailOrPhone: "",
      password: "",
    });
    onClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="grid align-items-center">
              <h6 id="modal-modal-title" className="text-2xl font-bold pl-5">
                {page === "login" ? "Login" : "Register"}
              </h6>
              {page === "login" ? (
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-5 p-5 duration-500 transition-all"
                >
                  <div className="flex flex-col gap-5">
                    <label>Enter your Email or Phone number</label>
                    <input
                      type="text"
                      required
                      className="border border-slate-400 h-8 pl-2"
                      placeholder="Email or Phone"
                      onChange={handleLoginChange}
                      value={loginUser.emailOrPhone}
                      name="emailOrPhone"
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <label>Enter your Password</label>
                    <input
                      type="password"
                      required
                      className="border border-slate-400 h-8 pl-2"
                      placeholder="Password"
                      onChange={handleLoginChange}
                      value={loginUser.password}
                      name="password"
                    />
                    <NavLink to="/forgotpassword" className="text-blue-500">
                      forgot password
                    </NavLink>
                  </div>
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </form>
              ) : (
                <form
                  onSubmit={handleRegister}
                  className="flex flex-col gap-5 p-5 duration-500 transition-all"
                >
                  <div className="flex flex-col gap-5">
                    <label>Enter your Name</label>
                    <input
                      type="text"
                      required
                      className="border border-slate-400 h-8 outline-none px-3"
                      placeholder="Your name"
                      name="name"
                      value={registerUser.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <label>Enter your Email</label>
                    <input
                      type="email"
                      required
                      className="border border-slate-400 h-8 outline-none px-3"
                      placeholder="Email"
                      name="email"
                      value={registerUser.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <label>Enter your Phone</label>
                    <input
                      type="text"
                      required
                      className="border border-slate-400 h-8 px-3 outline-none px-3"
                      placeholder="Phone Number"
                      name="phone"
                      value={registerUser.phone}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <label>Enter your Password</label>
                    <input
                      type="password"
                      required
                      className="border border-slate-400 h-8 px-3 outline-none"
                      placeholder="Password"
                      name="password"
                      value={registerUser.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <Button type="submit" variant="contained" color="primary">
                    Register
                  </Button>
                </form>
              )}
              <br />
              <p className="text-center m-0">OR</p>
              <br />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSetPage}
                sx={{ margin: "0 1.4rem" }}
              >
                {page === "login" ? "Register" : "Login"}
              </Button>
            </Box>
          </Modal>
        </div>
      )}
    </Fragment>
  );
};
export default LoginSignUp;
