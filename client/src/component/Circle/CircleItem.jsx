import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { HStack, Box, Text, Button, IconButton, Flex } from "@chakra-ui/react";
import { joinCircle } from "../../api/circleController";


export default function CircleItem({ authorName, title, content, id, date, curUser }) {
  async function handleJoin (event, id) {
    const data =  await joinCircle(id, curUser);
    alert(data);
  }
  const handleLike = (event, id) => {
    event.stopPropagation();
  };
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      color={"gray.800"}
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
          <Button size="sm" onClick={(event) => handleJoin(event, id)}>
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
