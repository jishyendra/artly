"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Avatar from "../Avatar";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { user, setUser } from "@/app/store/user";
import { Label } from "../ui/label";

export default function Account() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { username, email } = useStore(user);

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
      <div className="flex items-center justify-center gap-4">
        <Avatar className="h-20 w-20" />
        <div>
          <Label htmlFor="username">Username</Label>
          <h2 id="username">{username}</h2>
          <Label htmlFor="email">Email</Label>
          <p id="email">{email}</p>
          <Button
            className="mx-auto disabled:opacity-75"
            type="button"
            disabled={pending}
            onClick={handleSignOut}
          >
            {pending ? "Signing out.." : "Sign Out"}
          </Button>
        </div>
      </div>
      <div>
        <Wallet />
      </div>
    </div>
  );
}

export function Wallet() {
  return (
    <>
      <h1>Payment Addresses</h1>
      <div>
        <p>BTC</p>
        <p></p>
      </div>
      <div>
        <div>Bitcoin (BTC):</div>
        <p>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
      </div>
      <div>
        <div>Ethereum (ETH):</div>
        <p>0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
      </div>
      <div>
        <div>Litecoin (LTC):</div>
        <p>LZ1Q2W3E4R5T6Y7U8I9O0P1A2S3D4F5G6H7J8K9L</p>
      </div>
      <div>
        <div>Ripple (XRP):</div>
        <p>rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn</p>
      </div>
      <div>
        <div>BitcoinCash (BCH):</div>
        <p>qz0lsk3g0xj7z0lsk3g0xj7z0lsk3g0xj7z0lsk3g</p>
      </div>
    </>
  );
}
