import { z } from "zod";

// export const userSchema = z.object({
//   username: z.string().min(1),
//   email: z.string().email(),
//   password: z.string().min(8),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   bio: z.string().optional(),
//   location: z.string().optional(),
//   website: z.string().optional(),
//   profilePicture: z.string().optional(),
// });

// export type User = z.infer<typeof userSchema>;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters" })
      .max(20, { message: "Username must be less than 20 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Passwords should match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInValues = z.infer<typeof signInSchema>;
