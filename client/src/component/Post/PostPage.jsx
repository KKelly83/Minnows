import React from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  Divider,
  Image,
} from "@chakra-ui/react";
import {
  FaRegCommentAlt,
  FaShare,
  FaSave,
  FaEyeSlash,
  FaExclamationCircle,
  FaChevronDown,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const navigate = useNavigate();
  const { circleTitle, circleId } = useParams();

  // Dummy data for the post and comments
  const postData = {
    username: "[deleted]",
    time: "11 months ago",
    title: "What secret are you keeping from your significant other?",
    body: "", // post body if needed
    isArchived: true,
    comments: [
      {
        username: "Wangzhaojun1314",
        comment:
          "As an AI language model, I don't have personal experiences, emotions, or a significant other. Therefore, I don't have any secrets to keep from anyone. However, if you have a question or need advice regarding relationships or any other topic, feel free to ask, and I'll do my best to assist you.",
        time: "11 mo. ago",
      },
    ],
  };

  const goBack = () => {
    navigate(
      `/circle/thread/${encodeURIComponent(circleTitle)}/${encodeURIComponent(
        circleId
      )}`
    );
  };

  return (
    <VStack align="stretch" p={5}>
      <HStack justifyContent="space-between">
        <HStack>
          <IconButton
            aria-label="Go back"
            icon={<FaArrowLeft />}
            onClick={goBack}
            size="sm"
            alignSelf="flex-start"
            position={"fixed"}
            top={"1em"}
            left={"20vw"}
          />
          <Text fontSize="sm" ml={"2em"}>
            Posted by u/{postData.username} {postData.time}
          </Text>
        </HStack>
        <Badge colorScheme={postData.isArchived ? "red" : "green"}>
          {postData.isArchived ? "Archived" : "Active"}
        </Badge>
      </HStack>

      {/* Post Title */}
      <Text fontWeight="bold" my={2}>
        {postData.title}
      </Text>

      {/* Action Buttons */}
      <HStack my={2}>
        <IconButton aria-label="Comment" icon={<FaRegCommentAlt />} />
        <IconButton aria-label="Share" icon={<FaShare />} />
        <IconButton aria-label="Save" icon={<FaSave />} />
        <IconButton aria-label="Hide" icon={<FaEyeSlash />} />
        <IconButton aria-label="Report" icon={<FaExclamationCircle />} />
      </HStack>

      {/* Archived Warning */}
      {postData.isArchived && (
        <Box my={2} p={2} bg="yellow.100">
          <Text fontSize="sm">
            This thread is archived. New comments cannot be posted and votes
            cannot be cast.
          </Text>
        </Box>
      )}

      {/* Sorting Options */}
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          Sort By: Best
        </MenuButton>
        <MenuList>
          <MenuItem>Best</MenuItem>
          <MenuItem>New</MenuItem>
          <MenuItem>Top</MenuItem>
          {/* More sorting options */}
        </MenuList>
      </Menu>

      <Divider my={4} />

      {/* Comments Section */}
      <VStack align="stretch" spacing={4}>
        {postData.comments.map((comment, index) => (
          <Box key={index} p={4} bg="gray.50">
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="bold">
                {comment.username}
              </Text>
              <Text fontSize="sm">{comment.time}</Text>
            </HStack>
            <Text mt={2}>{comment.comment}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default PostPage;
