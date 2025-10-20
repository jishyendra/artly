"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpValues } from "@/lib/validation/auth";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormError from "@/components/ui/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    const { error } = await signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
      callbackURL: "/signin",
      username: data.username,
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
    <div className="mx-auto flex h-screen w-full max-w-sm flex-col items-center justify-center">
      <form
        className="auth-form mx-auto flex w-full flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="text" placeholder="Username" {...register("username")} />
        {errors.username && <FormError message={errors.username.message} />}

        <Input type="text" placeholder="Email" {...register("email")} />
        {errors.email && <FormError message={errors.email.message} />}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <FormError message={errors.password.message} />}

        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <FormError message={errors.confirmPassword.message} />
        )}

        <Button disabled={isSubmitting} type="submit">
          Sign Up
        </Button>
      </form>
      <div className="w-full">
        {errors.root?.random && (
          <FormError message={errors.root?.random.message} />
        )}
        <p className="mx-auto">
          Have an account please <Link href="/signin">Signin</Link>
        </p>
      </div>
    </div>
  );
}
