import { useEffect, useState } from "react";
import { useAppSelector } from "redux/store";
import { nonNullable } from "utils/common";
import { ProductInCartDetails } from "interfaces/product";
import { getCartItems } from "utils/localStorage";

export const useCartItems = () => {
  const products = useAppSelector((state) => state.products.products);

  const [cartItems, setCartItems] = useState<ProductInCartDetails[]>([]);

  useEffect(() => {
    const items = getCartItems();

    const itemsWithAdditionalDetails: ProductInCartDetails[] = items
      .map(({ id, quantity }) => {
        const productByItemId = products.find((product) => product.id === id);

        if (productByItemId) {
          return {
            ...productByItemId,
            quantity,
          } as ProductInCartDetails;
        }

        return null;
      })
      .filter(nonNullable)
      .filter(({ quantity }) => quantity !== 0);

    setCartItems(itemsWithAdditionalDetails);
  }, [products]);

  const getTotalExcludedVatPrice = () =>
    cartItems
      .reduce(
        (acc, { unit_price_incl_vat: price, quantity, vat_category: vat }) => {
          const tax = (100 - vat) / 100;
          const priceWithoutVat = price * quantity * tax;

          return acc + priceWithoutVat;
        },
        0,
      )
      .toFixed(2);

  const getTotalItemsPrice = () =>
    cartItems
      .reduce((acc, { unit_price_incl_vat: price, quantity }) => {
        const fullProductPrice = price * quantity;

        return acc + fullProductPrice;
      }, 0)
      .toFixed(2);

  const getTotalItemsPricePerVat = (vat: number) =>
    cartItems
      .reduce(
        (
          acc,
          { unit_price_incl_vat: price, quantity, vat_category: vatCategory },
        ) => {
          if (vatCategory === vat) {
            const tax = vat / 100;

            const fullTaXPrice = price * quantity * tax;

            return acc + fullTaXPrice;
          }

          return acc;
        },
        0,
      )
      .toFixed(2);

  return {
    cartItems,
    getTotalItemsPricePerVat,
    getTotalItemsPrice,
    getTotalExcludedVatPrice,
  };
};
