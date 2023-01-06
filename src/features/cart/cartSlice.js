import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";

const initState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const URL = "http://localhost:9000/posts"

export const getCartItems = createAsyncThunk("cart/getCartItems",(name)=>{
  return (
    fetch(URL).then(res=>res.json()).catch(err=>{console.log(err);})
  ) 
})



const cartSlice = createSlice({
  name: "cart",
  initialState: initState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getCartItems.pending,(cart,action)=>{
      cart.isLoading = true;
    })
    builder.addCase(getCartItems.fulfilled,(cart,action)=>{
      cart.isLoading = false;
      cart.cartItems = action.payload;
    })
    builder.addCase(getCartItems.rejected,(cart,action)=>{
      cart.isLoading = false
      cart.cartItems = []
    })
  }
});

export const { clearCart, removeItem, increase, decrease ,calculateTotals} = cartSlice.actions;

export default cartSlice;
