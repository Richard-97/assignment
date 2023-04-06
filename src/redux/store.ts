import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ProductSlice } from "redux/features/productSlice";
import { OrderSlice } from "redux/features/orderSlice";

export const store = configureStore({
  reducer: {
    products: ProductSlice.reducer,
    orderProducts: OrderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
