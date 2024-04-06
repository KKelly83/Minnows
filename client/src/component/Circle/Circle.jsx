import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { fetchCircles, submitCircles } from "../../api/circleController";
import { useState, useEffect } from "react";
import CircleItem from "./CircleItem";

export default function Circle() {
  const [circles, setCircles] = useState([]);
  const [circle, setCircle] = useState({ title: "", content: "" });
  const { title, content } = circle;

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchCircles();
      setCircles(fetchedData);
    }
    fetchData();
  }, [fetchCircles]);

  return (
    <Box bg={"white"} minH="100vh" p={5}>
      <VStack spacing={4} align="stretch">
        {circles.map((circle, index) => (
          <CircleItem
            key={index}
            authorName={circle.author_id}
            title={circle.title}
            content={circle.content}
          ></CircleItem>
        ))}
      </VStack>
    </Box>
  );
}
