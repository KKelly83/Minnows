import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function CommentItem({
  authorName,
  content,
  threadTitle,
  threadId,
}) {
  const navigate = useNavigate();

  return (
    <Box p={4} bg="gray.50">
      <HStack justifyContent="space-between">
        <Text fontSize="xs" fontWeight="bold">
          {authorName}
        </Text>
        {/* <Text fontSize="sm">time</Text> */}
      </HStack>
      <Text mt={"0.5em"} fontSize={"md"}>
        {content}
      </Text>
    </Box>
  );
}
