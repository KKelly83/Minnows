// Topbar component
import React, { useState, useEffect } from "react";
import { Flex, Avatar, Text, Stack, Icon } from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";
import { subscribeToCoinChanges } from "../../api/coinController";

const Topbar = ({ user_Id }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    avatar: "",
    coin: 0
  });

 useEffect(() => {
    const updateCoins = (newCoins) => {
        setUser(prevState => ({
            ...prevState,
            coin: newCoins || 0
        }));
    };

    if (user_Id) {
        const unsubscribe = subscribeToCoinChanges(user_Id, updateCoins);
        return () => unsubscribe();  // Cleanup subscription on component unmount or userId change
    }
}, [user_Id]);

  return (
    <Flex p="4" justifyContent="end" alignItems="center" fontSize="1.2em" fontWeight="bold">
      <Flex alignItems="center" mr="1em" color="yellow.400">
        <Icon as={FaCoins} mr="2" />
        <Text>{user.coin} Coins</Text>
      </Flex>
      <Flex alignItems="center" mr="1em">
        <Avatar name={user.name} src={user.avatar} />
        <Text ml="0.2em" fontWeight="bold">
          {user.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Topbar;
