"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp as SignUpType, signUpSchema } from "@/lib/types/userSchema";
import { signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpType) => {
    const { data: res, error } = await signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (!error) {
      redirect("/");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        className="auth-form flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="text" placeholder="Username" {...register("username")} />
        <input type="email" placeholder="Email" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errors.username && <p>{errors.username.message}</p>}
      {errors.email && <p>{errors.email.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
    </div>
  );
}
