"use server";
import { cookies } from "next/headers";
import { supabase } from "./supabase";

export async function getUser() {
  const access_token = cookies().get("sb-access-token")?.value as string;
  const refresh_token = cookies().get("sb-refresh-token")?.value as string;
  const { data } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (!data || !data.session) {
    return null;
  } else {
    const user = {
      email: data.session.user.email,
      id: data.session.user.id,
    };
    return user;
  }
}
