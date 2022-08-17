import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import {
  removeToCart,
  decrementToCart,
  incrementToCart,
  clearCart,
  getCartToTal,
} from "../features/cartSlice";
import { useEffect } from "react";
const Cart = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cartR
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartToTal());
  }, [dispatch, cartItems]);
  return (
    <div className=" container mx-auto p-2">
      <h1 className=" text-2xl text-center font-semibold text-cyan-700 my-8">
        Shopping Cart
      </h1>
      {cartItems.length > 0 ? (
        <div>
          <hr className="my-5" />
          <table className=" w-full rounded">
            <thead>
              <tr>
                <th className="font-semibold text-cyan-700">PRODUCT</th>
                <th className="font-semibold text-cyan-700">PRICE</th>
                <th className="font-semibold text-cyan-700">QUANTITY</th>
                <th className="font-semibold text-cyan-700">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="item-flex gap-2">
                      <img
                        className=" w-10"
                        src={item.image}
                        alt="phone Image"
                      />
                      <div>
                        <h1 className=" text-base mb-1">{item.desc}</h1>
                        <button
                          onClick={() => dispatch(removeToCart(item))}
                          className=" text-sm border-2 px-2 rounded border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all delay-300 duration-300 font-medium text-cyan-500"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      $ <b>{item.price}</b>
                    </td>

                    <td className="text-center">
                      <button
                        className=" text-cyan-600 text-lg border-2  border-cyan-400 mr-1 w-fit h-fit px-2  hover:text-red-600 hover:bg-cyan-400 transition-colors delay-300 duration-300"
                        onClick={() => dispatch(decrementToCart(item))}
                      >
                        -
                      </button>
                      {item.cartQuantity}
                      <button
                        className=" text-cyan-600 text-lg border-2  border-cyan-400 ml-1 w-fit h-fit px-2  hover:text-white hover:bg-cyan-400 transition-colors delay-300 duration-300"
                        onClick={() => dispatch(incrementToCart(item))}
                      >
                        +
                      </button>
                    </td>
                    <td className="text-center ">
                      $ <b>{item.price * item.cartQuantity}</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full flex justify-between mt-8">
            <button
              className=" text-base border-2 px-4
              py-1 rounded hover:border-cyan-400 bg-cyan-500 text-white transition-all delay-300 duration-300 font-medium hover:text-cyan-500
               hover:bg-white w-fit h-fit "
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <div>
              <div className="flex justify-between">
                <h1>Subtotal </h1>
                <span>
                  $ <b>{cartTotalAmount}</b>
                </span>
              </div>
              <p className=" text-sm sm:text-base mt-2 mb-2">
                Taxes and Shopping calculated at checkout
              </p>
              <button
                className=" text-base border-2 px-4
              py-1 rounded hover:border-cyan-400 bg-cyan-500 text-white transition-all delay-300 duration-300 font-medium hover:text-cyan-500
               hover:bg-white w-full h-fit "
              >
                Check out
              </button>
              <div className="mt-2">
                <Link className="flex justify-center items-center gap-1" to="/">
                  <BsArrowLeft className=" text-cyan-700 text-lg font-medium" />
                  <span className=" text-cyan-700 text-lg font-medium">
                    Start Shopping
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className=" text-center text-red-600 text-lg  mb-4">
            Your cart is currently empty
          </h1>
          <div>
            <Link className="flex justify-center items-center gap-1" to="/">
              <BsArrowLeft className=" text-green-700 text-lg font-medium" />
              <span className=" text-green-700 text-lg font-medium">
                Start Shopping
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
