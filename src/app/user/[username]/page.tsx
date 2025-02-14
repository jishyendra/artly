"use client"
import { useParams } from "next/navigation";

export default function Profile(){
const {username} = useParams();
    return <>
    <div>
        <h1>Profile: {username}</h1>
    </div>
    <div>
        <h2>Timeline</h2>
        <div> 
                <h3>Post 1</h3>
                <p>This is the first post</p>
                <h3>Post 2</h3>
                <p>This is the second post</p>
        </div>
    </div>
    </>

}