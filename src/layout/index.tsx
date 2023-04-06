import { FC, ReactNode } from "react";
import { Container } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => (
  <Container maxW="1400px">{children}</Container>
);
