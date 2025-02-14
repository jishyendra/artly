import Link from "next/link"
export default function AuthPage(){
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <div className="flex flex-col">
            <h1>Got a existing account?</h1>
            <Link href="/auth/signin">Sign In</Link>
            </div>
            <div className="flex flex-col">
            <h1>Don't have an account?</h1>
            <Link href="/auth/signup">Sign Up</Link>
            </div>
        </div>
    )
}