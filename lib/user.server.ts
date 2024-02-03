"use server";
import { cookies } from "next/headers";
import { supabase } from "./supabase";
import { db } from "./database";

export async function getUser() {
  const access_token = cookies().get("sb-access-token")?.value as string;
  if(!access_token) return null;
  try {
    const {data, error} = await supabase.auth.getUser(access_token);
    if (error) {
      return null;
    } else {
      const dbUser = await getOrCreateUserForSession(data.user.id);
      const user = {
        email: data.user.email,
        id: data.user.id,
        role: dbUser.role,
        proTier: dbUser.proTier,
      };
      return user;
    }
  } catch (error) {
    return null;
  }
}


export async function getOrCreateUserForSession(userId: string) {
  let user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      proTier: true,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
        proTier: true,
      },
    });
  }
  return user;
}