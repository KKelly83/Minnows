import { supabase } from "../db/supabase";

export async function fetchPosts(threadId) {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("thread_id", threadId);

  return data;
}

export async function submitPost({ title, content, threadId, userId }) {
  const emptyAlert = "Please enter a title and some text for the post.";
  const titleAlert = "Please enter a title between 1 and 30 characters.";
  const contentAlert = "Please enter text between 1 and 300 characters.";
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
      .from("posts")
      .insert([
        {
          title: title,
          content: content,
          thread_id: threadId,
          author_id: userId,
        },
      ])
      .single();

    if (data) {
      await fetchPosts(threadId);
      return "Post created successfully.";
    }
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    throw error;
  }
}
