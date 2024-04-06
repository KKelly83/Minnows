import React from "react";
import {
  Box,
  Heading,
  Input,
  Flex,
  VStack,
  InputLeftElement,
  Icon,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { fetchCircles, submitCircles } from "../../api/circleController";
import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";

import CircleItem from "./CircleItem";
import AddCircle from "./AddCircle";

export default function Circle() {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchCircles();
      setCircles(fetchedData);
    }
    fetchData();
  }, [fetchCircles]);

  async function handleCircleSubmit(title, content) {
    const message = await submitCircles({ title, content });
    alert(message);
    const fetchedData = await fetchCircles();
    setCircles(fetchedData);
  }

  return (
    <Box p={"1em"} overflowY="auto" position="relative" h={"100%"}>
      <Box mt={"2em"} mb={"2em"}>
        <Flex justify={"space-between"} mb={"0.3em"}>
          <Heading>Welcome to Minnows</Heading>
          <AddCircle handleCircleSubmit={handleCircleSubmit} />
        </Flex>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={IoSearchSharp} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search by author name, title content"
          />
        </InputGroup>
      </Box>

      <Box bg={"white"} minH="100vh" p={5}>
        <VStack spacing={4} align="stretch">
          {circles.map((circle, index) => (
            <CircleItem
              key={index}
              authorName={circle.author_id}
              title={circle.title}
              content={circle.content}
              id={circle.id}
              date={circle.created_at}
            ></CircleItem>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
