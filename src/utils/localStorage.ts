import { CartItem } from "interfaces/product";
import { LOCAL_STORAGE_CART_KEY } from "constants/common";

export const getCartItems = () => {
  const cartItems: CartItem[] = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CART_KEY) || "[]",
  );

  return cartItems;
};

export const setCartItems = (newItems: CartItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newItems));
};
