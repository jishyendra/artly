"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormValues } from "@/lib/validation/auth";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

import FormError from "@/components/ui/FormError";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { error } = await signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
      callbackURL: "/signin",
    });

    if (error) {
      setError("root.random", {
        type: "signup error",
        message: error.message,
      });
    } else {
      redirect("/signin");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        className="auth-form flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="text" placeholder="Username" {...register("username")} />
        {errors.username && <FormError message={errors.username.message} />}
        <input type="text" placeholder="Email" {...register("email")} />

        {errors.email && <FormError message={errors.email.message} />}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <FormError message={errors.password.message} />}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <FormError message={errors.confirmPassword.message} />
        )}
        <button disabled={isSubmitting} type="submit">
          Sign Up
        </button>
      </form>
      <div>
        {errors.root?.random && (
          <FormError message={errors.root?.random.message} />
        )}
        <p>
          Have an account please <Link href="/signin">Signin</Link>
        </p>
      </div>
    </div>
  );
}
