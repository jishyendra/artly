import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: {
      ...schema,
      user: schema.user,
    },
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("No session found");
  }
  return session;
};

export type Session = typeof auth.api.getSession;
