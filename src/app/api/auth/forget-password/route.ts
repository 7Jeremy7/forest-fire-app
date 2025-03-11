import { connectToDatabase } from "@/libs/mongodb";
import User from "@/models/User";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken"
import { EmailTemplate } from "@/Components/EmailTemplate";

const resend =  new Resend("re_G3SuwGyX_393FxwdDfuAhtEriSaUxRw5F")

export async function POST(request: NextRequest){
    try {
        const body: {email: string} = await request.json();
        const {email} = body

        await connectToDatabase();
        const userFind = await User.findOne({email});

        //misma validación de la existencia del usuario
        if(!userFind){
            return NextResponse.json(
                {message: messages.error.userNotFound},
                {status: 400}
            );
        }

        const tokenData = {
            email: userFind.email,
            userID: userFind._id
        };

        const token = jwt.sign({ data: tokenData}, "secreto",{
            expiresIn: 86400,
        });

        const forgetUrl = `http://localhost:3000/change-password?token=${token}`;
        
        
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Cambio de contraseña',
            react: EmailTemplate({ buttonUrl: forgetUrl}),  
        });

        return  NextResponse.json(
            {message: messages.succes.emailSent},
            {status: 200}
        )

    } catch (error) {
        return NextResponse.json(
            {message: messages.error.defaultError, error},
            {status: 500}
        );
    }
}


