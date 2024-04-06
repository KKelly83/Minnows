import React from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaRegComments } from "react-icons/fa";
import { HStack, Box, Text, Button, IconButton } from "@chakra-ui/react";

export default function CircleItem({ authorName, title, content }) {
  const navigate = useNavigate();

  const handleJoin = (event, id) => {
    event.stopPropagation();
    console.log("Joining thread:", id);
  };
  const handleLike = (event, id) => {
    event.stopPropagation();
    console.log("Liking thread:", id);
  };
  const handleViewThread = (threadTitle) => {
    console.log("Viewing thread:", title);
    navigate(`/circle/thread/${encodeURIComponent(threadTitle)}`);
  };
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      color={"gray.800"}
      _hover={{ cursor: "pointer" }}
      onClick={() => handleViewThread(title)}
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="bold">{title}</Text>
        <Text>Owner: {authorName}</Text>
      </HStack>
      <HStack justifyContent="flex-end" spacing={4} mt={2}>
        <Button size="sm" onClick={(event) => handleJoin(event, title)}>
          Join
        </Button>
        <IconButton
          aria-label="Like thread"
          icon={<FaThumbsUp />}
          onClick={(event) => handleLike(event, title)}
        />
      </HStack>
    </Box>
  );
}
