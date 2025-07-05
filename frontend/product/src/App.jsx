import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Header from "./component/Header";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setDataProduct, loadUserCart } from './redux/slice/productSlice';
import { loginRedux } from './redux/slice/userSlice';

export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  // ✅ Fetch all product data
  useEffect(() => {
    // axios.get(`http://localhost:7000/api/products`)
    axios.get(`https://e-commerce-backend-6kxk.onrender.com/api/products`)
      .then((res) => {
        dispatch(setDataProduct(res.data));
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
      });
  }, [dispatch]);

  // ✅ Restore user and cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(loginRedux(parsedUser));

      // ✅ Load cart from localStorage for this user
      if (parsedUser.user?.email) {
        dispatch(loadUserCart(parsedUser.user.email));
      }
    }

    // Optional: try fetching user from token
    if (!storedUser && token) {
      axios.get(`http://localhost:7000/api/auth/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          dispatch(loginRedux(res.data));

          // ✅ Load cart for fetched user
          if (res.data.user?.email) {
            dispatch(loadUserCart(res.data.user.email));
          }
        })
        .catch((err) => {
          console.error("Error fetching user data: ", err);
        });
    }

    setisLoading(false);
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}
