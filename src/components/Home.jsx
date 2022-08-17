import React from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";
const Home = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <div>
      {isLoading ? (
        <div>
          <h1 className=" text-center mt-8">Loding....</h1>
        </div>
      ) : error ? (
        <div>
          <h1>{error}</h1>
        </div>
      ) : (
        <div className="container mx-auto text-xl text-cyan-700 font-semibold">
          <h1 className=" text-center my-4 sm:my-8"> New Arrivals</h1>
          <div className=" flex flex-col-reverse gap-4 items-center sm:flex-row-reverse sm:items-start sm:justify-start ">
            {data?.map((item) => {
              return (
                <div className="cart" key={item._id}>
                  <img
                    className="mobile-image"
                    src={item.image}
                    alt="mobileimage"
                  />
                  <div className="flex justify-between mt-4">
                    <h2>{item.desc}</h2>
                    <h2>${item.price}</h2>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(addToCard(item));
                    }}
                    className="add-to-cart"
                  >
                    Add To Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
