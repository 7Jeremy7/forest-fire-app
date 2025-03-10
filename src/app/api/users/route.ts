import { connectToDatabase } from "@/libs/mongodb";
import User from "@/models/User";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest){
    try {
        await connectToDatabase();

        const users = await User.find();

        return NextResponse.json({users},{status: 200});
        
    } catch (error) {
        NextResponse.json({
            message: messages.error.defaultError,error
        },{
            status:500
        })
    }
}