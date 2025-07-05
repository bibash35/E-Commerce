import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice";
import productReducer from "./slice/productSlice"
export default configureStore({
  reducer: {
    user: userReducer,
    product:productReducer
  }
})


