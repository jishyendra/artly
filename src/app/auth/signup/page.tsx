"use client";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp as SignUpType, signUpSchema } from "@/lib/types/userSchema";

export default function SignUp(){
    const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm<SignUpType>({
        resolver: zodResolver(signUpSchema),
    });
    const onSubmit = (data:SignUpType) => {
        console.log(data);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
        <form className=" auth-form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Username" {...register("username")} />
            <input type="email" placeholder="Email" {...register("email")} />
            <input type="password" placeholder="Password" {...register("password")} />
            <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
            <button type="submit">Sign Up</button>
        </form>
        {errors.username && <p>{errors.username.message}</p>}
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
   )
}
