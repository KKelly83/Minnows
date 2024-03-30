import React from "react";
import { Flex, Box, Avatar, Text, Stack, Icon } from "@chakra-ui/react";
import { FaGem, FaHeart, FaCoins } from "react-icons/fa";

const Topbar = () => {
  const user = {
    name: "Firstname Lastname",
    avatar: "",
    coin: 40,
    gem: 4,
    heart: 3,
  };

  return (
    <Flex
      p="4"
      justifyContent="end"
      alignItems="center"
      fontSize={"1.2em"}
      fontWeight={"bold"}
    >
      <Flex alignItems="center" mr={"9em"}>
        <Avatar name={user["name"]} src={user["avatar"]} />
        <Text ml="0.2em" fontWeight="bold">
          {user["name"]}
        </Text>
      </Flex>
      <Stack direction="row" spacing="10" alignItems="center" mr={"5em"}>
        <Flex alignItems="center" color={"yellow.400"}>
          <Icon as={FaCoins} mr="2" />
          <Text>{user["coin"]} Coins</Text>
        </Flex>
        <Flex alignItems="center" color={"blue.300"}>
          <Icon as={FaGem} mr="2" />
          <Text>{user["gem"]} Gems</Text>
        </Flex>
        <Flex alignItems="center" color={"red"}>
          <Icon as={FaHeart} mr="2" />
          <Text>{user["heart"]} Hearts</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Topbar;
