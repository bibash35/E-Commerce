import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const initialState = {
  productList: [],
  cartItem: [],
  searchTerm: '',
  filteredProducts: [],
};

// Helper function to get user email from localStorage
const getUserEmail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.user?.email || null;
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart, email) => {
  if (email) {
    localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
      state.filteredProducts = [...action.payload]; // initially, all products are shown
    },

    addCartItem: (state, action) => {
      const existingItem = state.cartItem.find((el) => el._id === action.payload._id);
      const userEmail = getUserEmail();

      if (existingItem) {
        toast.error("Item already in cart");
      } else {
        toast.success("Item added to Cart");
        const total = action.payload.price;
        state.cartItem.push({ ...action.payload, qty: 1, total });
        saveCartToLocalStorage(state.cartItem, userEmail);
      }
    },

    deleteCartItem: (state, action) => {
      const userEmail = getUserEmail();
      toast("One item deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      saveCartToLocalStorage(state.cartItem, userEmail);
    },

    increaseQty: (state, action) => {
      const userEmail = getUserEmail();
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = ++state.cartItem[index].qty;
      const price = state.cartItem[index].price;
      const total = price * qty;
      state.cartItem[index].total = total;
      saveCartToLocalStorage(state.cartItem, userEmail);
    },

    decreaseQty: (state, action) => {
      const userEmail = getUserEmail();
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        qty--;
        state.cartItem[index].qty = qty;
        const price = state.cartItem[index].price;
        const total = price * qty;
        state.cartItem[index].total = total;
        saveCartToLocalStorage(state.cartItem, userEmail);
      }
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    clearCart: (state) => {
      const userEmail = getUserEmail();
      state.cartItem = [];
      saveCartToLocalStorage([], userEmail);
    },

    loadUserCart: (state, action) => {
      const userEmail = action.payload;
      const storedCart = localStorage.getItem(`cart_${userEmail}`);
      if (storedCart) {
        state.cartItem = JSON.parse(storedCart);
      } else {
        state.cartItem = [];
      }
    },
  },
});

// Selector to get total number of items in cart
export const selectCartItemCount = (state) => {
  return state.product.cartItem.reduce((acc, item) => acc + item.qty, 0);
};

// Export actions
export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  setSearchTerm,
  clearCart,
  loadUserCart,
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;

