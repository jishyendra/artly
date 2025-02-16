"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn, signInSchema } from "@/lib/types/userSchema";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SingIn(){
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(signInSchema),
    });
    const onSubmit = async (data:SignIn) => {
        const {data:res, error}= await signIn.email({
            email:data.email,
            password:data.password,
        })
        if(!error){
            redirect("/");
        }
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

