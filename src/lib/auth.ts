import { betterAuth } from "better-auth";
import {drizzleAdapter} from "better-auth/adapter/drizzle"
import { db } from "@/db";

export const auth = betterAuth({
    database:drizzleAdapter(db,{
        provider:"pg",

    }),
    emailAndPassword:{
        enabled:true,
    }
})