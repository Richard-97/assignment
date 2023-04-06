import { FC, ReactNode } from "react";
import { BoxProps, Grid } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: ReactNode;
}

export const ItemsWrapper: FC<Props> = ({ children, ...props }) => (
  <Grid
    gap="12"
    justifyContent="center"
    templateColumns="repeat(auto-fit,minmax(380px, auto))"
    {...props}
  >
    {children}
  </Grid>
);
