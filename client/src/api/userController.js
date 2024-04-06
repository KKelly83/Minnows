import { supabase } from "../db/supabase";

export async function fetchUserName(userId) {
  const { data } = await supabase
    .from("users")
    .select("name")
    .eq("user_id", userId);
  return data;
}
