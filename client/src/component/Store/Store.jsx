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
    title: "Travel Ticket",
    description: "get a flight",
    price: 70,
    imageUrl:
      "https://flyingmag.sfo3.digitaloceanspaces.com/flyingma/wp-content/uploads/2022/06/23090933/AdobeStock_249454423-scaled.jpeg",
  },
  {
    id: 2,
    title: "30-Day Subscription",
    description: "Premium",
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
