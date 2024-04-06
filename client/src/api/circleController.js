import { supabase } from "../db/supabase";

const emptyAlert = "Please enter a title and some text for the post.";
const titleAlert = "Please enter a title between 1 and 30 characters.";
const contentAlert = "Please enter text between 1 and 300 characters.";

export async function fetchCircles() {
  const { data } = await supabase.from("circles").select("*");
  return data;
}

export async function submitCircles({ title, content }) {
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
      .from("circles")
      .insert([{ title: title, content: content, author_id: 1234 }])
      .single();

    if (data) {
      await fetchCircles();
      return "Circle created successfully.";
    }
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    throw error;
  }
}
