import { useState, useEffect } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useNavigate } from "react-router-dom";

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



export default function FishItem({ title, id }) {
    const direction = Math.random() > 0.5 ? "swimRight" : "swimLeft";
    const duration = 15
    const navigate = useNavigate();
    const handleFishClicked = (title, id) => {
        navigate(
        `/home/thread/${encodeURIComponent(title)}/${encodeURIComponent(id)}`
        );
    };

    return (
        <Button
            fontSize={"5em"}
            color={"blue.200"}
            bg={"blue.200"}
            _hover={{ fontSize: "6em", color: "black" }}
            key={id}
            position="absolute"
            top={`${Math.random() * 80 + 10}%`}
            animation={`${direction} ${duration}s linear infinite`}
            onClick={(event) => handleFishClicked(title, id)}
            w={0}
            h={0}
            >
            <Box
                transform={
                direction === "swimRight" ? "scaleX(-1)" : "scaleX(1)"
                }
            >
                <Text
                fontSize={"0.5em"}
                transform={
                    direction === "swimRight" ? "scaleX(-1)" : "scaleX(1)"
                }
                mb={"-0.5em"}
                >
                {title}
                </Text>
                🐟
            </Box>
            </Button>
    );
}
