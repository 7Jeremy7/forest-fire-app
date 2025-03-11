import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "@/libs/mongodb";
import User from "@/models/User";

export async function GET(){
    try { 
        const headersList = headers();
        const token = (await headersList).get('token')

    if(!token){
        return NextResponse.json(
        {message:  messages.error.notAuthorized},
        {status: 400}
        )
    }

    try {
        const isTokenValid = jwt.verify(token, "secreto");
        //@ts-expect-error
        const {data} = isTokenValid;
        

        await connectToDatabase();
        const userFind = await User.findById(data._id);

        if(!userFind){
          return NextResponse.json(
            {message: messages.error.userNotFound},
            {status: 400}
          );
        }

        return NextResponse.json(
            {isAuthorizated: true, message: messages.succes.authorizated},
            {status: 200}
        )


    } catch (error) {
        return NextResponse.json(
            {message: messages.error.invalidToken, error},
            {status: 400}
        )
    }



    } catch (error) {
        return NextResponse.json(
            {message: messages.error.defaultError, error},
            {status: 400}
        )
    }
}

