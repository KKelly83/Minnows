import React from "react";
import {
  Box,
  Heading,
  Center,
  Avatar,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function PostItem({ authorName, title, content }) {
  // const authorName = "";
  // const authorAvatar = "";
  // const title = "test";
  // const content = "test";
  // const likes = 0;
  // const commentsNumber = 0;

  return (
    <Box w={"full"} p={"1em"} boxShadow={"lg"} borderRadius={"lg"} bg={"white"}>
      <Box display={"flex"}>
        <Avatar></Avatar>
        <Text mr={"1em"} fontSize={"1em"}>
          {authorName}
        </Text>
        <Heading>{title}</Heading>
      </Box>
      <Box mt={"1em"}>{content}</Box>
      <ButtonGroup mt={"1em"}>
        <Button>Likes</Button>
        <Button> Dislike button</Button>
        <Button>Share</Button>
        <Button>Comment</Button>
        <Button>Help</Button>
      </ButtonGroup>
    </Box>
  );
}
