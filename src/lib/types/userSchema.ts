import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    createdAt: z.date(),
    updatedAt: z.date(),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    profilePicture: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const signUpSchema = z.object({
    username:z.string().min(6),
    email:z.string().email(),
    password:z.string().min(8),
    confirmPassword:z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});


export type SignUp = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8),
});

export type SignIn= z.infer<typeof signInSchema>;