
import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server"
import { getSessionData } from './utils/createCookie'

export async function middleware(request: NextRequest) {

    const currentUser = await getSessionData()

    if (request.nextUrl.pathname.includes('/register')) {
        const splitedPathname = request.nextUrl.pathname.split("/")
        const rCode = splitedPathname[splitedPathname.length - 1]
        if (splitedPathname.length === 4) {
            return Response.redirect(new URL(`/auth/register?refcode=${rCode}`, request.url))
        } else {
            return NextResponse.next()
        }

    }

    // if (!currentUser?.isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
    //    return Response.redirect(new URL("/auth/admin/login", request.url))
    // }


    if (!currentUser && request.nextUrl.pathname !== '/auth/login'
        && request.nextUrl.pathname !== '/auth/register'
        && request.nextUrl.pathname !== '/auth/getStarted'
        && request.nextUrl.pathname !== '/auth/reset_password'
        && request.nextUrl.pathname !== '/auth/forgot_password'
        && request.nextUrl.pathname !== '/auth/verify'
        && request.nextUrl.pathname !== '/auth/language'
    ) {
        return Response.redirect(new URL("/auth/getStarted", request.url))
    }
    
    //   if (!currentUser && request.nextUrl.pathname === '/') {
    //     return Response.redirect(new URL("/auth/login", request.url))
    //   }

    //   if (!currentUser && request.nextUrl.pathname.startsWith('/')) {
    //     return Response.redirect(new URL("/auth/login", request.url))
    //   }



    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}