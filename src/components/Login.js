import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdUnlock } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

const Login = () => {
  const auth = useSelector((state) => state.auth);

  const [loginData, setloginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  // login handle
  const loginHandle = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      return alert("Please fill up all information");
    }
    dispatch(loginUser({ email, password }));
    // alert
    if (auth.loginStatus === "rejected" && auth.loginError) {
      alert(auth.loginError);
    }
  };
  return (
    <div>
      <div className="container mx-auto flex items-center justify-center h-screen">
        <div className="from  w-3/4 sm:w-2/4 mx-auto  bg-slate-100 px-4 py-4 xl:w-1/3 shadow-lg shadow-slate-200">
          <h1 className=" text-center my-8 text-xl font-medium text-blue-600  sm:text-2xl">
            Login
          </h1>
          <form onSubmit={loginHandle}>
            <div>
              <p className=" mb-2 text-base  font-medium   text-slate-700">
                Email
              </p>
              <div className="flex  items-center w-full relative">
                <MdOutlineMail className=" text-zinc-400 bg-white text-xl  font-medium absolute " />

                <input
                  className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base pl-6"
                  onChange={(e) =>
                    setloginData({
                      ...loginData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={loginData.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <p className="mt-2 mb-2 text-base  font-medium   text-slate-700">
                Password
              </p>
              <div className="flex  items-center w-full relative">
                <IoMdUnlock className=" text-zinc-400 bg-white text-xl  font-medium absolute " />
                <input
                  className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base pl-6"
                  onChange={(e) =>
                    setloginData({
                      ...loginData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={loginData.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <input
              className=" mt-4 text-lg font-medium w-full bg-blue-600 rounded text-white border-2 border-blue-600 px-1 hover:bg-white hover:text-blue-700 hover:font-semibold transition-all duration-300 delay-300"
              type="submit"
              value="Submit"
            />
          </form>
          <div className="flex flex-col sm:flex-row sm:gap-2 gap-1 py-4">
            <p> Have not a account ? </p>
            <Link
              className=" decoration-solid underline decoration-blue-600 text-blue-600"
              to="/login"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
