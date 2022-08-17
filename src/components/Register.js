import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../features/authSlice";
import { FaUser } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { IoMdUnlock } from "react-icons/io";
import { toast } from "react-toastify";
const Register = () => {
  const [regiUser, setRegiUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const dispatch = useDispatch();

  const registerHandle = (e) => {
    const { firstName, lastName, email, password, rePassword } = regiUser;
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !rePassword) {
      return alert("Please fill up all information");
    }
    if (password !== rePassword) {
      return alert("password not match");
    }
    const user = { firstName, lastName, email, password };

    dispatch(registerUser(user));
    setRegiUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    });
    if (localStorage.getItem("token")) {
      toast.success(`Registered successfully `, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className=" ">
      <div className="container mx-auto flex items-center justify-center h-screen ">
        <div className="from w-3/4 sm:w-2/4 mx-auto  bg-slate-100 px-4 py-4 xl:w-1/3 shadow-lg shadow-slate-200">
          <h1 className=" text-center mt-4 mb-4 text-xl font-medium text-blue-600  sm:text-2xl">
            Sing up
          </h1>
          <form onSubmit={registerHandle}>
            <div>
              <div className="flex items-center mb-2 gap-1">
                <FaUser className=" text-blue-400" />
                <p className=" text-base  font-medium   text-slate-700">
                  First name
                </p>
              </div>
              <input
                onChange={(e) =>
                  setRegiUser({
                    ...regiUser,
                    [e.target.name]: e.target.value,
                  })
                }
                value={regiUser.firstName}
                className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base "
                name="firstName"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div>
              <div className="flex items-center mb-2 mt-2 gap-1">
                <FaUser className=" text-blue-400" />
                <p className=" text-base  font-medium   text-slate-700 ">
                  Last name
                </p>
              </div>

              <input
                className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base "
                onChange={(e) =>
                  setRegiUser({
                    ...regiUser,
                    [e.target.name]: e.target.value,
                  })
                }
                value={regiUser.lastName}
                name="lastName"
                type="text"
                placeholder="LastName"
              />
            </div>
            <div>
              <div className="flex items-center mb-2 mt-2 gap-1">
                <MdMarkEmailRead className=" text-blue-400" />
                <p className=" text-base  font-medium    text-slate-700">
                  Email
                </p>
              </div>

              <input
                className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base "
                onChange={(e) =>
                  setRegiUser({
                    ...regiUser,
                    [e.target.name]: e.target.value,
                  })
                }
                value={regiUser.email}
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <div className="flex items-center mb-2 mt-2 gap-1">
                <IoMdUnlock className=" text-blue-400" />
                <p className=" text-base  font-medium   text-slate-700 ">
                  Password
                </p>
              </div>

              <input
                className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base "
                onChange={(e) =>
                  setRegiUser({
                    ...regiUser,
                    [e.target.name]: e.target.value,
                  })
                }
                value={regiUser.password}
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <div className="flex items-center mb-2 mt-2 gap-1">
                <IoMdUnlock className=" text-blue-400" />
                <p className=" text-base  font-medium   text-slate-700 ">
                  Conform password
                </p>
              </div>

              <input
                className=" border-b-2  w-full outline-none border-slate-300 px-2 font-medium text-slate-700 text-base "
                onChange={(e) =>
                  setRegiUser({
                    ...regiUser,
                    [e.target.name]: e.target.value,
                  })
                }
                value={regiUser.rePassword}
                name="rePassword"
                type="password"
                placeholder="Conform your password"
              />
            </div>
            <input
              className=" mt-4 text-lg font-medium w-full bg-blue-600 rounded text-white border-2 border-blue-600 px-1 hover:bg-white hover:text-blue-700 hover:font-semibold transition-all duration-300 delay-300"
              type="submit"
              value="Submit"
            />
          </form>
          <div className="flex flex-col sm:flex-row sm:gap-2 gap-1 py-4">
            <p>Have already an acount? </p>
            <Link
              className=" decoration-solid underline decoration-blue-600 text-blue-600"
              to="/login"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
