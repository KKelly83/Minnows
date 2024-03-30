import React, { useState } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import AddFish from "./AddFish";

const GlobalStyles = css`
  @keyframes swimRight {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100vw);
    }
  }

  @keyframes swimLeft {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

export default function Fishes() {
  const [fishes, setFishes] = useState([]);

  const addFishToPond = (name, description) => {
    const direction = Math.random() > 0.5 ? "swimRight" : "swimLeft";
    const newFish = {
      id: fishes.length,
      name: name,
      description: description,
      duration: 15,
      direction: direction,
    };
    setFishes([...fishes, newFish]);
  };

  return (
    <ChakraProvider>
      <Global styles={GlobalStyles} />
      <Box
        position="relative"
        w="100%"
        h="100vh"
        bg="blue.200"
        overflow="hidden"
      >
        {fishes.map((fish) => (
          <Button
            fontSize={"5em"}
            color={"blue.200"}
            bg={"blue.200"}
            _hover={{ fontSize: "6em", color: "black" }}
            key={fish.id}
            position="absolute"
            top={`${Math.random() * 80 + 10}%`}
            animation={`${fish.direction} ${fish.duration}s linear infinite`}
            onClick={() =>
              alert(`Thread: ${fish.name}! \r Description: ${fish.description}`)
            }
            w={0}
            h={0}
          >
            <Box
              transform={
                fish.direction === "swimRight" ? "scaleX(-1)" : "scaleX(1)"
              }
            >
              <Text
                fontSize={"0.5em"}
                transform={
                  fish.direction === "swimRight" ? "scaleX(-1)" : "scaleX(1)"
                }
                mb={"-0.5em"}
              >
                {fish.name}
              </Text>
              🐟
            </Box>
          </Button>
        ))}
        <AddFish addFishToPond={addFishToPond} />
      </Box>
    </ChakraProvider>
  );
}
