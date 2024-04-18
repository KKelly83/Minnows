import { supabase } from "../db/supabase";

const emptyAlert = "Please enter a title and some text for the post.";
const titleAlert = "Please enter a title between 1 and 30 characters.";
const contentAlert = "Please enter text between 1 and 300 characters.";

export async function fetchCircles() {
  const { data } = await supabase.from("circles").select("*");
  return data;
}

export async function fetchUserCircles(userId) {
  const { data } = await supabase
    .from("circles")
    .select("*, circleMember!inner(circle_id)")
    .eq("circleMember.user_id", userId);
  return data;
}

export async function joinCircle(circleId, userId) {
  console.log(userId, circleId);
  try {
    const data = await supabase
    .from("circleMember")
    .insert([{ user_id: userId, circle_id: circleId }])
    .single();

    if (data) {
      console.log("joined circle");
    }
  } catch (error) {
    console.error(`Error joining circle: ${error}`);
    throw error;
  }
  

}

export async function submitCircles({ title, content, userId }) {
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
      .insert([{ title: title, content: content, author_id: userId }])
      .single();

    if (data) {
      await fetchCircles();
      return "Circle created successfully.";
    }
  } catch (error) {
    console.error(`Error creating circle: ${error}`);
    throw error;
  }
}
