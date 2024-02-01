"use server";
import { cookies } from "next/headers";
import { supabase } from "./supabase";

export async function getUser() {
  const access_token = cookies().get("sb-access-token")?.value as string;
  if(!access_token) return null;
  try {
    const {data, error} = await supabase.auth.getUser(access_token);
    if (error) {
      return null;
    } else {
      const user = {
        email: data.user.email,
        id: data.user.id,
      };
      return user;
    }
  } catch (error) {
    return null;
  }
}
