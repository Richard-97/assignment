import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderProduct {
  id: number;
  name: string;
  quantity: number;
}

interface OrderState {
  orderProducts: OrderProduct[];
  totalPrice: number | null;
}

interface OrderPayload {
  products: OrderProduct[];
  totalPrice: number | null;
}

const initialState: OrderState = {
  orderProducts: [],
  totalPrice: null,
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderProducts: (state, action: PayloadAction<OrderPayload>) => ({
      ...state,
      totalPrice: action.payload.totalPrice,
      orderProducts: action.payload.products,
    }),
  },
});

export default OrderSlice.reducer;
export const { setOrderProducts } = OrderSlice.actions;
