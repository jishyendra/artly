"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInValues } from "@/lib/validation/auth";
import { signIn } from "@/lib/auth-client";
import FormError from "@/components/ui/FormError";
import { setUser } from "@/app/store/user";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

export default function SingIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isLoading, errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      unauthorized: "", //added this due to isDirty thing
    },
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (data: SignInValues) => {
    const { data: res, error } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (res?.token) {
      setUser({
        username: res.user.name,
        email: res.user.email,
        id: res.user.id,
        token: res.token,
      });
      router.push("/user");
    }
    if (error) {
      setError("root", { type: error.code, message: error.message });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        className="auth-form flex w-full max-w-sm flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input placeholder="Email" {...register("email")} />
        {errors.email && <FormError message={errors.email.message} />}
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <FormError message={errors.password.message} />}
        <Button
          disabled={isLoading}
          className="disabled:opacity-75"
          type="submit"
        >
          {isSubmitting ? "Signing in.." : "Sign In"}
        </Button>
        {errors.root && <FormError message={errors.root.message} />}
      </form>
      <p className="my-4">
        Don't have an account?
        <Link className="font-blue border-b" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
