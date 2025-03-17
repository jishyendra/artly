"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Avatar from "../Avatar";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { user, setUser } from "@/app/store/user";

export default function Account() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { username, email } = useStore(user);
  console.log(username);

  async function handleSignOut() {
    setPending(true);

    const { error } = await signOut();
    if (error) {
      await signOut();
    }

    setUser({ username: "", email: "", id: "", token: "" });
    router.push("/signin");
    setPending(false);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-2 bg-slate-200 p-2">
      <div className="flex gap-4 items-center justify-center">
        <p>{username}</p>
        <Avatar />
      </div>
      <Button
        className="mx-auto disabled:opacity-75"
        type="button"
        disabled={pending}
        onClick={handleSignOut}
      >
        {pending ? "Signing out.." : "Sign Out"}
      </Button>
    </div>
  );
}
