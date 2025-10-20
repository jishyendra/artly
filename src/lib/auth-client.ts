import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        username: {
          type: "string",
          required: true,
        },
      },
    }),
  ],
});
export const { signIn, signUp, signOut, useSession } = authClient;
export type TSession = ReturnType<typeof useSession>;

// type SessionResponse = {
//   session: {
//     id: string;
//     createdAt: Date;
//     updatedAt: Date;
//     userId: string;
//     expiresAt: Date;
//     token: string;
//     ipAddress?: string | null;
//     userAgent?: string | null;
//   };
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     // Add other user properties as needed
//   };
// } | null;
