import { db } from "@/lib/database";

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

