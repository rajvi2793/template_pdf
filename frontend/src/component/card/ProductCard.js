import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const { name, description, price, image } = props.product;

  return (
    <Card maxW="xs" borderRadius="md" maxH="500px" flex="wrap">
      <CardBody maxH="sm">
        <Image
          src={props.product.image}
          alt="Thiss is not rendering"
          borderRadius="sm"
        />
        <Stack>
          <Heading size="md">{props.product.name}</Heading>
          <Text>{props.product.description}</Text>
        </Stack>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default ProductCard;
