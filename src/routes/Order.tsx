import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { setOrderProducts } from "redux/features/orderSlice";
import { Layout } from "layout";
import { Header } from "components/Header";
import { routes } from "constants/routes";
import { CURRENCIES } from "constants/common";

export const Order = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const products = useAppSelector((state) => state.orderProducts.orderProducts);
  const totalPrice = useAppSelector((state) => state.orderProducts.totalPrice);

  const isCartEmpty = products.length <= 0;

  return (
    <Layout>
      <Header
        title={isCartEmpty ? "Order summary" : "Thank you for your order"}
      />
      <Flex flexDirection="column" alignItems="center">
        {isCartEmpty ? (
          <>
            <Text mb="4" textStyle="base.300">
              Order is empty
            </Text>
            <Button
              as={Link}
              to={routes.PRODUCTS}
              leftIcon={<ChevronLeftIcon />}
            >
              Go back to product
            </Button>
          </>
        ) : (
          <>
            <Flex flexDirection="column" mt="6" mb="10">
              {products.map(({ id, name, quantity }, index, items) => (
                <Flex key={id} flexDirection="column">
                  <Flex gap="6" px="4" py="1.5">
                    <Text textStyle="base.300" w="30px" textAlign="center">
                      {quantity}x
                    </Text>
                    <Text textStyle="base.300">{name}</Text>
                  </Flex>
                  {items.length - 1 !== index && <Divider />}
                </Flex>
              ))}
            </Flex>
            <Text textStyle="base.300" mb="12">
              Please send us the payment of{" "}
              <Text
                as="span"
                textStyle="base.400"
              >{`${totalPrice} ${CURRENCIES.EURO}`}</Text>{" "}
              to our bitcoin address.
            </Text>
            <Button
              onClick={() => {
                dispatch(
                  setOrderProducts({
                    products: [],
                    totalPrice: null,
                  })
                );
                navigation(routes.PRODUCTS);
              }}
            >
              Continue shopping
            </Button>
          </>
        )}
      </Flex>
    </Layout>
  );
};
