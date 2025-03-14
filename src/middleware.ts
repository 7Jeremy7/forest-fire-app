import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest) {
    try {
        const token = request.cookies.get('auth_cookie')

        if(!token){
            return NextResponse.redirect(new URL('/', request.url))
        }

        const res = await fetch('https://forest-fire-app-production.up.railway.app/api/auth/check',{
            headers:{
                token: token.value
            }
        })

        const data = await res.json()


        //aqui iba un ts ignore
        if(!data.isAuthorizated){
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.next()

    } catch  {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/home','/history','/monitoring']
}