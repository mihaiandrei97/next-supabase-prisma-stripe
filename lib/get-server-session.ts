import { getOrCreateUserForSession } from "@/data-access/users";
import { createSupabaseInstance } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function getServerSession() {
  try {
    const supabase = createSupabaseInstance(cookies());
    const { data, error } = await supabase.auth.getUser();
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
