import React from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { HStack, Box, Text, Button, IconButton, Flex } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserName } from "../../api/userController";

export default function CircleItem({ authorName, title, content, id, date }) {
  const navigate = useNavigate();
  const handleJoin = (event, id) => {
    event.stopPropagation();
  };
  const handleLike = (event, id) => {
    event.stopPropagation();
  };
  const handleViewThread = (id, title) => {
    navigate(
      `/circle/thread/${encodeURIComponent(title)}/${encodeURIComponent(id)}`
    );
  };
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      color={"gray.800"}
      _hover={{ cursor: "pointer" }}
      onClick={() => handleViewThread(id, title)}
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" fontSize={"lg"}>
          {title}
        </Text>
        <Text>Create by: {authorName}</Text>
      </HStack>
      <Flex justify={"space-between"}>
        <Box>
          <Text>{content}</Text>
          <Text>Created At: {date.substring(0, 10)}</Text>
          <Text>? members</Text>
        </Box>

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
      </Flex>
    </Box>
  );
}
