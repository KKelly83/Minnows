import React from "react";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Button,
  ButtonGroup,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CircleItem({
  authorName,
  title,
  content,
  circleId,
  threadTitle,
  threadId,
}) {
  const navigate = useNavigate();

  const handleViewThread = (circleTitle, circleId, threadId, threadTitle, threadContent, authorName) => {
    console.log(authorName);
    navigate(`/home/thread/${encodeURIComponent(circleTitle)}/${encodeURIComponent(circleId)}/${encodeURIComponent(threadId)}/${encodeURIComponent(threadTitle)}/${encodeURIComponent(threadContent)}/${encodeURIComponent(authorName)}/post`);
  };

  return (
    <Box
      w={"full"}
      p={"1em"}
      boxShadow={"lg"}
      borderRadius={"lg"}
      bg={"white"}
      onClick={() => handleViewThread(threadTitle, circleId, threadId, title, content, authorName)}

      _hover={{ cursor: "pointer" }}
    >
      <Box display={"flex"}>
        <HStack>
          <VStack>
            <Avatar></Avatar>
            <Text mr={"1em"} fontSize={"1em"}>
              {authorName}
            </Text>
          </VStack>
          <Heading>{title}</Heading>
        </HStack>
        
      </Box>
      <Box mt={"1em"}>{content}</Box>
      <ButtonGroup mt={"1em"}>
        {/* <Button>Likes</Button>
        <Button> Dislike button</Button>
        <Button>Share</Button> */}
        <Button>Comment</Button>
        {/* <Button>Help</Button> */}
      </ButtonGroup>
    </Box>
  );
}
