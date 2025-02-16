import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

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
