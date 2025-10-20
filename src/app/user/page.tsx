"use client";
import Account from "@/components/profile/Account";
import { useStore } from "@nanostores/react";
import { user } from "@/app/store/user";
export default function Profile() {
  const { username, email } = useStore(user);
  return (
    <>
      <div>
        <Account />
      </div>
    </>
  );
}
