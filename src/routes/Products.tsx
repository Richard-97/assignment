import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Layout } from "layout";
import { useAppSelector } from "redux/store";
import { Header } from "components/Header";
import { ProductItem } from "components/ProductItem";
import { ItemsWrapper } from "components/ItemsWrapper";
import { routes } from "constants/routes";

interface Props {
  onProductClick: (id: number) => void;
}

export const Products: FC<Props> = ({ onProductClick }) => {
  const products = useAppSelector((state) => state.products.products);

  return (
    <Layout>
      <Header title="Products" />
      <Flex flexDirection="column">
        <Button
          as={Link}
          to={routes.CART}
          alignSelf="center"
          rightIcon={<ChevronRightIcon />}
        >
          Open Cart
        </Button>
        <ItemsWrapper py="6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              name={product.name}
              price={product.unit_price_incl_vat}
              isDisabled={product.stock_quantity <= 0}
              onSubmit={() => {
                onProductClick(product.id);
              }}
            />
          ))}
        </ItemsWrapper>
      </Flex>
    </Layout>
  );
};
