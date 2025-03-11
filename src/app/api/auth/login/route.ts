import { connectToDatabase } from "@/libs/mongodb";
import User, { IUser } from "@/models/User";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest){
    try {
        await connectToDatabase();

        const body: IUser = await request.json();
        const {email, password} = body;

        //validacion de que no hayan campos vacios 
        if(!email||!password){
            return NextResponse.json(
                {message: messages.error.needProps},
                {status: 400}
            );
        }

        //validación de la existencia del usuario por correo 
        const userFind = await User.findOne({email});

        if(!userFind){
            return NextResponse.json(
                {message: messages.error.userNotFound},
                {status: 400}
            );
        }

        const isCorrect: boolean =  await bcrypt.compare(
            password,
            userFind.password
        )

        if(!isCorrect){
            return NextResponse.json(
                {message: messages.error.incorrectPassword},
                {status: 400}
            )
        }

        const {password: _userPass, ...rest} = userFind._doc;

        const token = jwt.sign({data: rest}, "secreto",{
            expiresIn: 86400,
        });

        const response = NextResponse.json(
            {userLogged: rest, message: messages.succes.userLogged},
            {status: 200}
        );
        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/"
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            {message: messages.error.defaultError, error},
            {status: 500}
        );
    }
}

