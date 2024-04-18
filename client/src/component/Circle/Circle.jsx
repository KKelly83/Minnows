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
} from "@chakra-ui/react";
import { fetchCircles, submitCircles } from "../../api/circleController";
import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CircleItem from "./CircleItem";
import AddCircle from "./AddCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserName, fetchUserId } from "../../api/userController";

export default function Circle() {
  const [circles, setCircles] = useState([]);
  const { user } = useAuth0();
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedCircles = await fetchCircles();
      const userid = await fetchUserId(user.sub);
      setUserId(userid[0].user_id);

      const circlesWithAuthorNames = await Promise.all(
        fetchedCircles.map(async (circle) => {
          const authorName = await fetchUserName(circle.author_id);
          return { ...circle, authorName };
        })
      );
      setCircles(circlesWithAuthorNames);
    }
    fetchData();
  }, []);

  async function handleCircleSubmit(title, content) {
    const message = await submitCircles({ title, content, userId });
    alert(message);
    const fetchedCircles = await fetchCircles();
    const circlesWithAuthorNames = await Promise.all(
      fetchedCircles.map(async (circle) => {
        const authorName = await fetchUserName(circle.author_id);
        return { ...circle, authorName };
      })
    );
    setCircles(circlesWithAuthorNames);
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
              authorName={circle.authorName[0].name}
              title={circle.title}
              content={circle.content}
              id={circle.id}
              date={circle.created_at}
              curUser={userId}
            ></CircleItem>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
