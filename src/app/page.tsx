"use client";
import {useSession} from "@/lib/auth-client"
import { redirect } from "next/navigation";

export default function HomePage() {
  const {data,error} = useSession();
  if(!data){
    redirect("/auth");
  } 
  return (
    <main>
      Artly
    </main>
  );
}
