import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

export const checkUser = async () =>{
    const user = await currentUser()

    //Check for current logged in clerk user
    if(!user) {
        return null
    }

    //Check if user is already in database
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId : user.id
        }
    })

    //if user is in database, return user
    if(loggedInUser) {
        return loggedInUser;
    }

    //if not in database, create new user
    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newUser
}