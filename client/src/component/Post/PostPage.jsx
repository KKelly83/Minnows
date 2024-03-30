import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import {
  Box,
  Heading,
  Input,
  Flex,
  VStack,
  InputLeftElement,
  Icon,
  Button,
  InputGroup 
} from "@chakra-ui/react";
import PostItem from "./PostItem";
import { supabase } from '../../db/supabase';

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: "", content: "" });
  const { title, content } = post;

  useEffect(() => {
    fetchPosts();
  }, []);
  
  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*');
    setPosts(data);
  };

  const submitPost = async () => {
    if (!title.trim() || !content.trim() ) {
      alert("Please enter a title and some text for the post.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ title: title, body: content }]).single();
        setPost({ title: "", content: ""});
        fetchPosts();

      if (error) {
        throw error;
      }

      if (data) {
        alert("Post created successfully!");
        setPost({ title: "", content: ""});
        fetchPosts();
      }
    } catch (error) {
      alert(`Error creating post: ${error.message}`);
      fetchPosts();
    }
  };

  return (
    <Box p={"1em"} overflowY="auto" position="relative" h={"100%"}>
       <Box mt={"1em"} mb={"2em"} position = "fixed" top = "0">
          <Heading>Name of the Thread</Heading>
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
       
      <VStack spacing={"1em"} overflowY="auto" h="75%" mt="6em" pb="10em">
        {posts.map((post, index) => (
          <PostItem
            key={index}
            authorName={post.author_id}
            title={post.title}
            content={post.body}
          />
        ))}
      </VStack>
      <Flex
        direction="column"
        position="fixed"
        bottom="0"
        left="20%"
        right="0"
        p="1em"
        bg = "white"
      >
        <InputGroup size="md">
          <Input
            placeholder="Title of the post"
            value={title}
            maxLength={"30"}
            minLength={"1"}
            onChange={e => setPost({ ...post, title: e.target.value })}
          />
        </InputGroup>
        <Flex mt="4">
          <InputGroup size="md">
            <Input
              placeholder="Content of the post"
              value={content}
              maxLength={"300"}
              minLength={"1"}
              onChange={e => setPost({ ...post, content: e.target.value })}
            />
          </InputGroup>
          <Button onClick={submitPost} ml="4">Post</Button>
        </Flex>
      </Flex>
    </Box>
  );
}