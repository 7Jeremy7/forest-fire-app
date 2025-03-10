import { connectToDatabase } from "@/libs/mongodb"
import User, { IUserSchema } from "@/models/User";
import { isValidEmail } from "@/utils/isValidEmail";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try { 
        await connectToDatabase();

        const body  = await request.json()
        const {email, password, confirmPassword } = body;

        //validacion de envio de campos 
        if(!email || !password || !confirmPassword){
            return NextResponse.json({
                message: messages.error.needProps
            },
        {
            status: 400,
        })
        }
        if(!isValidEmail(email)){
            return NextResponse.json({
                message : messages.error.emailNotValid
            },{
                status: 400
            });
        }
        //validación de contraseñas iguales :)
        if(password !== confirmPassword){
             return NextResponse.json({
                message: messages.error.passwordNotMatch
             },{
                status: 400
             })
        }

        const userFind = await User.findOne({ email });

        if(userFind){
            return NextResponse.json({
                message: messages.error.emailExists 
            },{status: 200})
        }   

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword,
        });

        // @ts-ignore
        const {password: userPass, ...rest} = newUser._doc;

        await newUser.save();

        const token = jwt.sign({data: rest}, 'secreto', {
            expiresIn: 86400,
        });

        const response = NextResponse.json({
            newUser: rest,
            message: messages.succes.userCreated
        },{
            status:200,
        });

        response.cookies.set('auth_cookie', token,{
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 86400,
            path: "/",
        })

        return response;

    } catch (error) {
            console.error("error al conectar con la base de datos:", error);

            return NextResponse.json(
                {message: messages.error.defaultError},
                { status: 400 });
    }
}


