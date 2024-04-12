import { supabase } from "../db/supabase";

export async function fetchPosts(threadId) {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("thread_id", threadId);
  console.log(data);
  return data;
}
