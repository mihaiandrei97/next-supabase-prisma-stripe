import { db } from "@/lib/database";
import { ProTier } from "@prisma/client";

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

export function updateProTierUser({
  userId,
  proTier,
}: {
  userId: string;
  proTier: ProTier;
}) {
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      proTier,
    },
  });
}
