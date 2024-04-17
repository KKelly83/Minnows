import { supabase } from "../db/supabase";

export async function fetchUserName(userId) {
  const { data } = await supabase
    .from("users")
    .select("name")
    .eq("user_id", userId);
  return data;
}

export async function fetchUserId(sub) {
  const { data } = await supabase
    .from("users")
    .select("user_id")
    .eq("sub", sub);
  return data;
}
