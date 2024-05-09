import db from "@/db";
import user, {proTierEnum} from "@/db/schema/user";
import { eq } from "drizzle-orm";

type ProTier = typeof proTierEnum.enumValues[number]

export async function getOrCreateUserForSession(userId: string) {
  let userRecords = await db.select({
    id: user.id,
    role: user.role,
    proTier: user.proTier
  }).from(user).where(eq(user.id, userId));

  if(userRecords[0]) {
    return userRecords[0];
  }

  userRecords = await db.insert(user).values({
    id: userId,
  }).returning({
    id: user.id,
    role: user.role,
    proTier: user.proTier
  });

  return userRecords[0];
}

export function updateProTierUser({
  userId,
  proTier,
}: {
  userId: string;
  proTier: ProTier;
}) {
  return db.update(user).set({
    proTier,
  }).where(eq(user.id, userId));
}
