import React from "react";
import {
  Box,
  Heading,
  Center,
  Avatar,
  Text,
  Button,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function CircleItem({ authorName, title, content }) {
  const navigate = useNavigate();

  const handleViewThread = (id) => {
    console.log("Viewing thread:", id);
    navigate("/circle/thread/post");
  };

  
  return (
    <Box
      w={"full"}
      p={"1em"}
      boxShadow={"lg"}
      borderRadius={"lg"}
      bg={"white"}
      onClick={() => handleViewThread()}
      _hover={{ cursor: "pointer" }}
    >
      

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
