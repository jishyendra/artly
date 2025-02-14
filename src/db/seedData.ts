import db from "./index";
import {usersTable, postsTable} from "./schema";



export const seedUsers = async () => {
    await db.insert(usersTable).values(
        {
            name: "John Doe",
            age: 25,
            email: "john.doe@example.com",
        }
    );
    await db.insert(usersTable).values(
        {
            name: "Jane Doe",
            age: 25,
            email: "jane.doe@example.com",
        }
    );
    await db.insert(usersTable).values(
        {
            name: "John Smith",
            age: 30,
            email: "john.smith@example.com",
        }
    );

    await db.insert(usersTable).values(
        {
            name: "Don Singh",
            age: 30,
            email: "don.singh@example.com",
        }
    );
}

export const seedPosts = async () => {
    await db.insert(postsTable).values(
        {
            title: "Post 1",
            content: "This is the content of post 1",
            userId: 1,
        }
    );
    await db.insert(postsTable).values(
        {
            title:"Heloo there!!!",
        content:"aksjfklsa ajsdfkljas jasdkflj shjasdf jsjdheu afn jaseoifa AAKJSD jk kjLK JkjsfLK LKJkljf",
        userId:2
        }

    );
    await db.insert(postsTable).values(
        {
            title:"I amt third person there!!!",
        content:"aksjfklsa ajsdfkljas jasdkflj shjasdf jsjdheu afn jaseoifa AAKJSD jk kjLK JkjsfLK LKJkljf",
        userId:3
        }
    );
    await db.insert(postsTable).values(
        {
            title:"I am fourth person there!!!",
            content:" Hello there!!!",
            userId:4
        }
    )
}

// seedUsers();
// seedPosts();
