import React from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaThumbsUp, FaRegComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import  {fetchCircles, submitCircles}  from '../../api/circleController';


const threads = [
  { id: 1, title: "Thread 1", owner: "User1" },
  { id: 2, title: "Thread 2", owner: "User2" },
];

export default function Circle() {
  const navigate = useNavigate();

  const textColor = useColorModeValue("gray.800", "gray.100");

  const handleJoin = (id) => {
    console.log("Joining thread:", id);
  };

  const handleLike = (id) => {
    console.log("Liking thread:", id);
  };

  const handleViewThread = (id) => {
    console.log("Viewing thread:", id);
    navigate('/circle/thread')
  };

  

  return (
    <Box bg={"white"} minH="100vh" p={5}>
      <VStack spacing={4} align="stretch">
        {threads.map((thread) => (
          <Box
            key={thread.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            color={textColor}
            _hover={{cursor:'pointer'}}
            onClick={() => handleViewThread(thread.id)}

          >
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">{thread.title}</Text>
              <Text>Owner: {thread.owner}</Text>
            </HStack>
            <HStack justifyContent="flex-end" spacing={4} mt={2}>
              <Button size="sm" onClick={() => handleJoin(thread.id)}>
                Join
              </Button>
              <IconButton
                aria-label="Like thread"
                icon={<FaThumbsUp />}
                onClick={() => handleLike(thread.id)}
              />
              
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
