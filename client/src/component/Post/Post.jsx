import React, { useState, useEffect } from "react";
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
  FaShare,
  FaExclamationCircle,
  FaChevronDown,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserId, fetchUserName } from "../../api/userController";
import { fetchPosts, submitPost } from "../../api/postController";
import PostItem from "./PostItem";
import AddPost from "./AddPost";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { circleTitle, circleId, threadId } = useParams();
  const [userId, setUserId] = useState();
  const { user } = useAuth0();
  const [threadAuthor, setThreadAuthor] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPosts = await fetchPosts(threadId);
      const userid = await fetchUserId(user.sub);
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
  }, [user.sub, setPosts, threadId]);

  async function handlePostSubmit(title, content) {
    const message = await submitPost({ title, content, threadId, userId });
    alert(message);
    const fetchedPosts = await fetchPosts(threadId);
    const postsWithAuthorNames = await Promise.all(
      fetchedPosts.map(async (post) => {
        const authorName = await fetchUserName(post.author_id);
        return { ...post, authorName };
      })
    );
    setPosts(postsWithAuthorNames);
  }

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
            Posted by  post.time
          </Text>
        </HStack>
        <Badge colorScheme={"red"}>Hot</Badge>
      </HStack>
      <Text fontWeight="bold" my={2}>
        post.title
      </Text>
      <HStack my={2}>
        <AddPost handlePostSubmit={handlePostSubmit} />
        <IconButton aria-label="Share" icon={<FaShare />} />
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

      <VStack align="stretch" spacing={4}>
        {posts.map((post, index) => (
          <PostItem
            key={index}
            authorName={post.authorName[0].name}
            title={post.title}
            content={post.content}
            circleId={circleId}
            threadTitle={circleTitle}
            threadId={post.thread_id}
          />
        ))}
      </VStack>
    </VStack>
  );
};

export default PostPage;
