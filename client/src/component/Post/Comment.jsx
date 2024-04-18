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
import { fetchComments, submitComment } from "../../api/commentController";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { circleTitle, circleId, threadId, threadTitle, threadContent, threadAuthor} = useParams();
  const [userId, setUserId] = useState();
  const { user } = useAuth0();
  

  useEffect(() => {
    async function fetchData() {
      const fetchedComments = await fetchComments(threadId);
      const userid = await fetchUserId(user.sub);
      setUserId(userid[0].user_id);
      const commentWithAuthorNames = await Promise.all(
        fetchedComments.map(async (comment) => {
          const authorName = await fetchUserName(comment.author_id);
          return { ...comment, authorName };
        })
      );
      setComments(commentWithAuthorNames);

      
      console.log(comments);
    }
    fetchData();
  }, [user.sub, setComments, threadId]);

  async function handleCommentSubmit(title, content) {
    const message = await submitComment({ title, content, threadId, userId });
    alert(message);
    const fetchedComments = await fetchComments(threadId);
    const commentsWithAuthorNames = await Promise.all(
      fetchedComments.map(async (comment) => {
        const authorName = await fetchUserName(comment.author_id);
        return { ...comment, authorName };
      })
    );
    setComments(commentsWithAuthorNames);
  }

  const goBack = () => {
    navigate(
      `/home/thread/${encodeURIComponent(circleTitle)}/${encodeURIComponent(
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
          <Text fontSize="sm" ml={"2em"} fontWeight={"bold"}>
            {circleTitle}
          </Text>
        </HStack>
        <Badge colorScheme={"red"}>Hot</Badge>
      </HStack>
      <Box p={2}>
        <Text fontSize="sm">
          Posted by {threadAuthor}
        </Text>
        <Text fontSize="lg" fontWeight="bold" mt={2}>
          {threadTitle}
        </Text>
        <Text>
          {threadContent}
        </Text>
      </Box>
      <AddComment handleCommentSubmit={handleCommentSubmit} />
      <Divider my={4} />
      <VStack align="stretch" spacing={4}>
        {comments.map((comment, index) => (
          <CommentItem
            key={index}
            authorName={comment.authorName[0].name}
            title={comment.title}
            content={comment.content}
            circleId={circleId}
            threadTitle={circleTitle}
            threadId={comment.thread_id}
          />
        ))}
      </VStack>
    </VStack>
  );
};

export default CommentPage;
