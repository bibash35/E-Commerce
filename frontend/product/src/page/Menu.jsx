// import React from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { addCartItem } from '../redux/slice/productSlice';
// import AllProduct from '../component/AllProduct';
// import { baseUrl } from '../Url';


// export default function Menu() {
//   const { filterby } = useParams();
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const productData = useSelector((state) => state.product.productList);


//   const productDisplay = productData.filter((el) => el._id === filterby)[0];
//   const handleAddCartProduct = (e) => {
//     dispatch(addCartItem(productDisplay))
//   };

//   const handleBuy = ()=>{
//     dispatch(addCartItem(productDisplay))
//       navigate("/cart")
//   }
//    const getImageUrl = (img) => {
//     return img?.startsWith("http") ? img : `http://localhost:7000${img}`;
//   }
//   return (
//     <>
//      <div className="p-2 md:p-4">
//       <div className="w-full max-w-4xl m-auto md:flex bg-white">
//         <div className="max-w-sm  overflow-hidden w-full p-5">
//           {/* <img
//             src={`http://localhost:7000${productDisplay?.image}`}
//             className="hover:scale-105 transition-all h-full"
//           /> */}
//           <img
//             src={getImageUrl(productDisplay?.image)}
//             alt={productDisplay?.name}
//             className="hover:scale-105 transition-all h-full "
//           />
          
//         </div>
//         <div className="flex flex-col gap-1">
//           <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
//             {productDisplay?.name}
//           </h3>
//           <p className=" text-slate-500  font-medium text-2xl">{productDisplay?.category}</p>
//           <p className=" font-bold md:text-2xl">
//             <span className="text-red-500 ">₹</span>
//             <span>{productDisplay?.price}</span>
//           </p>
//           <div className="flex gap-3">
//           <button onClick={handleBuy} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Buy</button>
//           <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Add Cart</button>
//           </div>
//           <div>
//             <p className="text-slate-600 font-medium">Description : </p>
//             <p>{productDisplay?.description}</p>
//           </div>
//         </div>
//       </div>

//       <AllProduct heading={"Related Product"}/>
//     </div>
//     </>
//   )
// }

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCartItem } from '../redux/slice/productSlice';
import AllProduct from '../component/AllProduct';

export default function Menu() {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.find((el) => el._id === filterby);

  const getImageUrl = (img) => {
    return img?.startsWith("http") ? img : `http://localhost:7000${img}`;
  };

  const handleAddCartProduct = () => {
    if (!user) {
      navigate("/login", { state: { from: `/menu/${filterby}` } });
      return;
    }

    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    if (!user) {
      navigate("/login", { state: { from: `/menu/${filterby}` } });
      return;
    }

    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={getImageUrl(productDisplay?.image)}
            alt={productDisplay?.name}
            className="hover:scale-105 transition-all h-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay?.name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">{productDisplay?.category}</p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay?.price}</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleBuy}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
          </div>

          <div>
            <p className="text-slate-600 font-medium">Description:</p>
            <p>{productDisplay?.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} />
    </div>
  );
}
