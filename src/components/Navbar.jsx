import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cartR);
  return (
    <div>
      <nav className=" bg-cyan-600 flex justify-between items-center w-full px-4 py-3 sm:px-0  sm:justify-around">
        <div className="logo">
          <Link
            className=" text-white hover:text-blue-600 font-semibold sm:font-bold text-xl sm:text-2xl transition-colors delay-300 duration-300"
            to="/"
          >
            Online <span>Shop</span>
          </Link>
        </div>
        <div className="nav-bag flex gap-2 items-center">
          <Link to="/cart" className="flex items-center gap-2">
            <FaShoppingCart className="text-white text-xl sm:text-2xl" />
            <div className="full-round bg-yellow-400">
              <b className=" text-blue-900 text-lg sm:text-xl ">
                {cartTotalQuantity}
              </b>
            </div>
          </Link>
          {/* register login home */}
          <div className="flex gap-2 items-center">
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeClassName" : "notActivestyle"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeClassName" : "notActivestyle"
              }
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeClassName" : "notActivestyle"
              }
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
