import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "interfaces/product";
import productsData from "products.json";

interface ProductState {
  products: Product[];
}

interface UpdateStockPayload {
  productId: number;
  newQuantity: number;
  oldProductCartQuantity: number;
}

const initialState: ProductState = {
  products: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateStockQuantity: (
      state,
      action: PayloadAction<UpdateStockPayload>,
    ) => ({
      ...state,
      products: state.products.map((product) =>
        product.id === action.payload.productId
          ? {
              ...product,
              stock_quantity:
                product.stock_quantity +
                action.payload.oldProductCartQuantity -
                action.payload.newQuantity,
            }
          : product,
      ),
    }),
    loadProducts: (state) => ({
      ...state,
      products: productsData,
    }),
  },
});

export default ProductSlice.reducer;
export const { loadProducts, updateStockQuantity } = ProductSlice.actions;
