"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn, signInSchema } from "@/lib/types/userSchema";

export default function SingIn(){
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(signInSchema),
    });
    const onSubmit = (data:SignIn) => {
        console.log(data);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
        <form className="auth-form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="Email" {...register("email")} />
            <input type="password" placeholder="Password" {...register("password")} />
            <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <Link href="/auth/signup">Sign Up</Link></p>
        </div>
    )
}

