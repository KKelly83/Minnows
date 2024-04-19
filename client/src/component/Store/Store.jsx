import React from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  Badge,
  Icon,
  useToast,
  Divider,
} from "@chakra-ui/react";

import Topbar from "./Topbar";
import { PiCoinVerticalFill } from "react-icons/pi";

const storeItems = [
  {
    id: 1,
    title: "Avatar Accessories",
    description: "Customize your Avatar!",
    price: 70,
    imageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    title: "New Avatar",
    description: "Stand out from the crowd",
    price: 20,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png",
  },
  {
    id: 3,
    title: "T-Shirt",
    description: "High quality t-shirts",
    price: 40,
    imageUrl:
      "https://i.etsystatic.com/36038936/r/il/cccf8e/4067511429/il_570xN.4067511429_i6e7.jpg",
  },
];

const StoreItem = ({ item }) => {
  const toast = useToast();

  const redeemItem = () => {
    toast({
      title: `You redeemed ${item.title}!`,
      description: "Congulations, Have the nice day",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.200"
      color="white"
      p={"0.5em"}
    >
      <Image
        src={item.imageUrl}
        fit="cover"
        w="100%"
        h={"13em"}
        borderRadius={"lg"}
      />

      <Box p={"0.5em"}>
        <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box color={'black'}>
            <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </Box>
          <Button onClick={redeemItem} colorScheme="orange" size="sm">
            <Icon as={PiCoinVerticalFill} color={"yellow"}></Icon>
            {item.price} Coins
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Store = () => {
  return (
    <Box>
      <Topbar></Topbar>
      <Divider></Divider>
      <Box p={"1em"}>
        <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={8}>
          {storeItems.map((item) => (
            <StoreItem key={item.id} item={item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Store;
