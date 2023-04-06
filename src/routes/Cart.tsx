import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { times } from "lodash";
import {
  Button,
  Flex,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { Layout } from "layout";
import { setOrderProducts } from "redux/features/orderSlice";
import { useAppDispatch } from "redux/store";
import { useCartItems } from "hooks/useCartItems";
import { CartQuantityChange } from "interfaces/cart";
import { Header } from "components/Header";
import { routes } from "constants/routes";
import { CURRENCIES, SIGNS } from "constants/common";
import { SummaryTableRow } from "components/SummaryTableRow";
import { setCartItems } from "utils/localStorage";

const TABLE_HEADER_LABELS = [
  { label: "Item", minW: "auto" },
  { label: "Quantity", minW: "auto" },
  { label: "Unit Price incl. VAT", minW: "auto" },
  { label: "VAT", minW: "auto" },
  { label: "Total", minW: "130px" },
];

const TABLE_HEADERS_LENGTH = TABLE_HEADER_LABELS.length;

interface Props {
  onProductQuantityChange: (values: CartQuantityChange) => void;
}

export const Cart: FC<Props> = ({ onProductQuantityChange }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    cartItems,
    getTotalExcludedVatPrice,
    getTotalItemsPricePerVat,
    getTotalItemsPrice,
  } = useCartItems();

  const isCartEmpty = cartItems.length <= 0;

  const uniqueVatVategories = [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...new Set(cartItems.map((item) => item.vat_category)),
  ];

  return (
    <Layout>
      <Header title="Cart" />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Flex justifyContent="space-between">
              <Button
                as={Link}
                to={routes.PRODUCTS}
                variant="transparent"
                leftIcon={<ChevronLeftIcon />}
              >
                Back
              </Button>
              <Tooltip label={isCartEmpty ? "Cart is empty" : ""}>
                <Button
                  isDisabled={isCartEmpty}
                  onClick={() => {
                    navigate(routes.ORDER);

                    const orderProducts = cartItems.map(
                      ({ id, name, quantity }) => ({
                        id,
                        name,
                        quantity,
                      })
                    );

                    // eslint-disable-next-line no-console
                    console.log("ORDER DETAILS", {
                      products: orderProducts,
                      totalPrice: Number(getTotalItemsPrice()),
                    });

                    dispatch(
                      setOrderProducts({
                        products: orderProducts,
                        totalPrice: Number(getTotalItemsPrice()),
                      })
                    );

                    setCartItems([]);
                  }}
                >
                  Send order
                </Button>
              </Tooltip>
            </Flex>
          </TableCaption>
          <Thead>
            <Tr>
              {TABLE_HEADER_LABELS.map(({ label, minW }) => (
                <Th key={label} minW={minW}>
                  {label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map(
              ({
                id,
                name,
                quantity,
                unit_price_incl_vat: unitPriceIncVat,
                vat_category: vat,
                stock_quantity: stockQuantity,
              }) => (
                <Tr key={id}>
                  <Td>{name}</Td>
                  <Td>
                    <Flex alignItems="center">
                      <Select
                        value={quantity}
                        onChange={(value) => {
                          onProductQuantityChange({
                            productId: id,
                            newQuantity: Number(value.target.value),
                          });
                        }}
                        size="xs"
                        w="70px"
                      >
                        {times(stockQuantity + quantity).map((item) => (
                          <option key={item} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </Select>
                      <Button
                        variant="transparent"
                        px="0"
                        onClick={() => {
                          onProductQuantityChange({
                            productId: id,
                            newQuantity: 0,
                          });
                        }}
                      >
                        <DeleteIcon color="gray.500" />
                      </Button>
                    </Flex>
                  </Td>
                  <Td>{`${unitPriceIncVat.toFixed(2)} ${CURRENCIES.EURO}`}</Td>
                  <Td>{`${vat} ${SIGNS.PERCENT}`}</Td>
                  <Td>{`${(quantity * unitPriceIncVat).toFixed(2)} ${
                    CURRENCIES.EURO
                  }`}</Td>
                </Tr>
              )
            )}
            <SummaryTableRow
              label="Total excl. VAT"
              value={`${getTotalExcludedVatPrice()} ${CURRENCIES.EURO}`}
              colCount={TABLE_HEADERS_LENGTH}
            />
            {uniqueVatVategories.map((vatCategory) => (
              <SummaryTableRow
                label={`VAT ${vatCategory}%`}
                value={`${getTotalItemsPricePerVat(vatCategory)} ${
                  CURRENCIES.EURO
                }`}
                colCount={TABLE_HEADERS_LENGTH}
              />
            ))}
            <SummaryTableRow
              label="Total"
              value={`${getTotalItemsPrice()} ${CURRENCIES.EURO}`}
              colCount={TABLE_HEADERS_LENGTH}
            />
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
