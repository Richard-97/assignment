import { FC } from "react";
import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { CURRENCIES } from "constants/common";

const IMAGE_HEIGHT = 260;

interface Props {
  name: string;
  price: number;
  onSubmit: () => void;
  unit?: string;
  isDisabled: boolean;
}

export const ProductItem: FC<Props> = ({
  name,
  price,
  unit = CURRENCIES.EURO,
  onSubmit,
  isDisabled,
}) => (
  <Flex flexDirection="column" w="auto">
    <Box h={IMAGE_HEIGHT} w="100%" bg="gray.200" borderRadius="4" />
    <Flex flexDirection="column">
      <Text textStyle="base.300" fontWeight="semibold" my="3">
        {name}
      </Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Text>{`${price.toFixed(2)} ${unit}`}</Text>
        <Tooltip label={isDisabled ? "Stock is empty" : ""}>
          <Button onClick={onSubmit} isDisabled={isDisabled}>
            Add to cart
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  </Flex>
);
