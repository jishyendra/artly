import { betterAuth, string } from "better-auth";
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
  trustedOrigins: ["https://rndyw-106-217-150-18.a.free.pinggy.link"],
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        defaultValue: null,
        input: true,
      },
    },
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
