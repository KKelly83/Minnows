import { React, useState, useEffect } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserId, fetchUserName } from "../../api/userController";

const PostPage = () => {
  const navigate = useNavigate();
  const { circleTitle, circleId, threadId } = useParams();
  const [userId, setUserId] = useState();
  const { user } = useAuth0();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedPosts = await fetchPosts(threadId);
      const userid = await fetchUserId(user.sub);
      console.log(1);
      setUserId(userid[0].user_id);
      const postWithAuthorNames = await Promise.all(
        fetchedPosts.map(async (post) => {
          const authorName = await fetchUserName(post.author_id);
          return { ...post, authorName };
        })
      );
      setPosts(postWithAuthorNames);
    }
    fetchData();
  }, [user.sub, setUserId]);

  const goBack = () => {
    console.log(threadId);
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
            Posted by u/ author name post.time
          </Text>
        </HStack>
        <Badge colorScheme={"red"}>Hot</Badge>
      </HStack>
      <Text fontWeight="bold" my={2}>
        post.title
      </Text>
      <HStack my={2}>
        <IconButton aria-label="Comment" icon={<FaRegCommentAlt />} />
        <IconButton aria-label="Share" icon={<FaShare />} />
        <IconButton aria-label="Save" icon={<FaSave />} />
        <IconButton aria-label="Hide" icon={<FaEyeSlash />} />
        <IconButton aria-label="Report" icon={<FaExclamationCircle />} />
      </HStack>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          Sort By: Best
        </MenuButton>
        <MenuList>
          <MenuItem>Best</MenuItem>
          <MenuItem>New</MenuItem>
          <MenuItem>Top</MenuItem>
        </MenuList>
      </Menu>
      <Divider my={4} />

      <VStack spacing={"1em"} overflowY="auto" h="75%" mt="1em" pb="10em">
        {posts.map((post, index) => (
          <Box p={4} bg="gray.50" key={index}>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="bold">
                {post.authorName}
              </Text>
              <Text fontSize="sm">time</Text>
            </HStack>
            <Text mt={2}>{post.content}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default PostPage;
