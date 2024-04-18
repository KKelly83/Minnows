import { supabase } from "../db/supabase";

export async function fetchComments(threadId) {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("thread_id", threadId);

  return data;
}

export async function submitComment({content, threadId, userId }) {
  const emptyAlert = "Please enter some text for the comment.";
  const contentAlert = "Please enter text between 1 and 300 characters.";
  //content is emtpy
  if ( !content.trim()) {
    throw new Error(emptyAlert);
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
          content: content,
          thread_id: threadId,
          author_id: userId,
        },
      ])
      .single();

    if (data) {
      await fetchComments(threadId);
      return "Comment created successfully.";
    }
  } catch (error) {
    console.error(`Error creating comment: ${error}`);
    throw error;
  }
}
