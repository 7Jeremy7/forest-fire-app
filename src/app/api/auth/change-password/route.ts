import { connectToDatabase } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import  jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs"

interface BodyProps {
    newPassword: string
    confirmPassword: string
}

export async function POST(request: NextRequest){
    try {
        const body: BodyProps = await request.json();

        const  {newPassword, confirmPassword} = body;

        //Validación de campos
        if(!newPassword || !confirmPassword){
            return NextResponse.json(
                {message: messages.error.needProps},
                {status: 400}
            );
        }

        await connectToDatabase();

        const headersList = headers()
        const token = (await headersList).get('token')

        //veri que haya el token 
        if(!token){
            return NextResponse.json(
                {message: messages.error.notAuthorized},
                {status: 400}
            )
        }
        
        try {
            const isTokenValid = jwt.verify(token, "secreto");

            if(!isTokenValid || typeof isTokenValid !== "object"){
            return NextResponse.json({
                  message: messages.error.notAuthorized,
                  status:400
            });
        
            }   

            const {data}= isTokenValid as {data: {userID: string}};

            const userFind = await User.findById(data.userID);

            //validación de la existencia del usuario 
            if(!userFind){
                return NextResponse.json(
                    {message: messages.error.userNotFound},
                    {status: 400}
                );
            }

            //validacion de que la nueva contraseña sea igual a la validación 
            if(newPassword !== confirmPassword){
                return NextResponse.json({
                    message: messages.error.passwordNotMatch
                },{
                    status: 400
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            userFind.password = hashedPassword;

            await userFind.save();

            return NextResponse.json(
                {message: messages.succes.passwordChanged},
                {status: 200}
            );


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