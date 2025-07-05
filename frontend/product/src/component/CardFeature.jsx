import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from "../redux/slice/productSlice";

export default function CardFeature({ name, category, price, image, loading, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);

  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `http://localhost:7000${image}`
    : '/path/to/default/image.jpg';

  const handleAddCartProduct = () => {
    if (!user) {
      navigate("/login", { state: { from: `/menu/${id}` } });
      return;
    }

    dispatch(addCartItem({
      _id: id,
      name,
      price,
      category,
      image,
    }));
  };

  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col'>
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={imageUrl} alt={name} className="h-full object-contain" />
            </div>
            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>

          <button
            className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}
