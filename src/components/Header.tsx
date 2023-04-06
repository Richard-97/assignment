import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

export const Header: FC<Props> = ({ title }) => (
  <Flex justifyContent="center" my="12">
    <Text textStyle="heading32" textAlign="center">
      {title}
    </Text>
  </Flex>
);
