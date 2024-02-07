"use server";
import { cookies } from "next/headers";
import { db } from "./database";
import { createSupabaseInstance } from "./supabase";

export async function getUser() {
  try {
    const supabase = createSupabaseInstance(cookies());
    const {data, error} = await supabase.auth.getUser();
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