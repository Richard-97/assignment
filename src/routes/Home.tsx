import { Link } from "react-router-dom";
import { Text, Button, Flex } from "@chakra-ui/react";
import { Layout } from "layout";
import { routes } from "constants/routes";
import { Header } from "components/Header";

export const Home = () => (
  <Layout>
    <Header title="Home Page" />
    <Flex flexDir="column" gap="6" alignItems="center">
      <Text textStyle="base.400" my="4">
        Welcome to the Assignment!
      </Text>
      <Button as={Link} to={routes.PRODUCTS}>
        Go to the Products Page
      </Button>
    </Flex>
  </Layout>
);
