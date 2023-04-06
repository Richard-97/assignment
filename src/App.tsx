import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Home } from "routes/Home";
import { Products } from "routes/Products";
import { Cart } from "routes/Cart";
import { Order } from "routes/Order";
import { routes } from "constants/routes";
import { loadProducts } from "redux/features/productSlice";
import { useAppDispatch } from "redux/store";
import { useCart } from "hooks/useCart";
import { colors, components, fonts, textStyles } from "theme";

const defaultTheme = {
  colors,
  components,
  fonts,
  textStyles,
};

const theme = extendTheme(defaultTheme);

export const App = () => {
  const dispatch = useAppDispatch();

  const {
    addProductIntoCartById,
    updateStockByCartItems,
    onProductQuantityUpdated,
  } = useCart();

  useEffect(() => {
    dispatch(loadProducts());
    updateStockByCartItems();
  }, [dispatch, updateStockByCartItems]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
          <Route
            path={routes.PRODUCTS}
            element={<Products onProductClick={addProductIntoCartById} />}
          />
          <Route
            path={routes.CART}
            element={
              <Cart onProductQuantityChange={onProductQuantityUpdated} />
            }
          />
          <Route path={routes.ORDER} element={<Order />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
