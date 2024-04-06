import { supabase } from "../db/supabase";

const emptyAlert = "Please enter a title and some text for the post.";
const titleAlert = "Please enter a title between 1 and 30 characters.";
const contentAlert = "Please enter text between 1 and 300 characters.";

export async function fetchPosts(circleId) {
  const { data } = await supabase
    .from("threads")
    .select("*")
    .eq("circle_id", circleId);
  return data;
}

export async function submitPost({ title, content, circleId }) {
  //test if title or body is emtpy
  if (!title.trim() || !content.trim()) {
    throw new Error(emptyAlert);
  }
  //test if title is appropriate length
  if (title.length > 30 || title.length < 1) {
    throw new Error(titleAlert);
  }
  //test content length
  if (content.length > 300 || content.length < 1) {
    throw new Error(contentAlert);
  }

  try {
    const data = await supabase
      .from("threads")
      .insert([
        { title: title, body: content, circle_id: circleId, author_id: 12345 },
      ])
      .single();

    if (data) {
      await fetchPosts(circleId);
      return "Post created successfully.";
    }
  } catch (error) {
    console.error("Error creating post: ${error}");
    throw error;
  }
}

export default {
  fetchPosts,
  submitPost,
};
