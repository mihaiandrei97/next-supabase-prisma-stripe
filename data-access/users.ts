// import { db } from "@/lib/database";
// import { ProTier } from "@prisma/client";
import { db } from "@/db/database";
import { ProTier } from "@/db/enums";

export async function getOrCreateUserForSession(userId: string) {
  let user = await db
    .selectFrom("User")
    .select(["id", "role", "proTier"])
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!user) {
    user = await db
      .insertInto("User")
      .values({ id: userId, updatedAt: new Date() })
      .returning(["id", "role", "proTier"])
      .executeTakeFirstOrThrow();
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
  return db
    .updateTable("User")
    .set("proTier", proTier)
    .where("id", "=", userId)
    .execute();
}
