import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { updateStockQuantity } from "redux/features/productSlice";
import { useAppDispatch } from "redux/store";
import { getCartItems, setCartItems } from "utils/localStorage";
import { SUCCESS } from "constants/messages";
import { TOAST_POSITION } from "constants/common";

export const useCart = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const addProductIntoCartById = useCallback(
    (productId: number) => {
      const cartItems = getCartItems();

      const existedProduct = cartItems.find(({ id }) => id === productId);

      if (existedProduct) {
        const updatedCartItems = cartItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );

        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = [...cartItems, { id: productId, quantity: 1 }];

        setCartItems(updatedCartItems);
      }

      dispatch(
        updateStockQuantity({
          productId,
          newQuantity: 1,
          oldProductCartQuantity: 0,
        }),
      );

      toast({
        title: SUCCESS.ADD_PRODUCT_INTO_CART,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: TOAST_POSITION,
      });
    },
    [dispatch, toast],
  );

  const onProductQuantityUpdated = useCallback(
    ({
      productId,
      newQuantity,
    }: {
      productId: number;
      newQuantity: number;
    }) => {
      const cartItems = getCartItems();

      const oldProductCartQuantity =
        cartItems.find(({ id }) => id === productId)?.quantity ?? 0;

      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item,
      );

      setCartItems(updatedCartItems);

      dispatch(
        updateStockQuantity({
          productId,
          newQuantity,
          oldProductCartQuantity,
        }),
      );
    },

    [dispatch],
  );

  const updateStockByCartItems = useCallback(() => {
    const cartItems = getCartItems();

    cartItems.forEach((cartItem) =>
      dispatch(
        updateStockQuantity({
          productId: cartItem.id,
          newQuantity: cartItem.quantity,
          oldProductCartQuantity: 0,
        }),
      ),
    );
  }, [dispatch]);

  return {
    addProductIntoCartById,
    onProductQuantityUpdated,
    updateStockByCartItems,
  };
};
