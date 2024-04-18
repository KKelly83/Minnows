import { useState, useEffect } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { fetchCircles, fetchUserCircles } from "../../api/circleController";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserName, fetchUserId } from "../../api/userController";
import { useNavigate } from "react-router-dom";
import FishItem from "./FishItem";

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
  const navigate = useNavigate();
  const [fishes, setFishes] = useState([]);
  const { user } = useAuth0();
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function fetchData() {
      const userid = await fetchUserId(user.sub);
      setUserId(userid[0].user_id);
      if (userid[0].user_id) {
        const fetchedCircles = await fetchUserCircles(userid[0].user_id);
        setFishes(fetchedCircles);
        console.log(fishes);
      }
    }
    fetchData();
  }, []);


  const handleViewCircles = (id, title) => {
    navigate(
      `/circle`
    );
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
        {fishes.map((circle) => (
          <FishItem
            title={circle.title}
            id={circle.id}
          >
          </FishItem>
        ))}
        {/* <Box mb="1">
          <Button 
          onClick={handleViewCircles}
          position="absolute"
          bottom="2em"
          right="40vw"
          colorScheme="teal"
          >
            Join circles
          </Button>
        </Box> */}
      </Box>
    </ChakraProvider>
  );
}