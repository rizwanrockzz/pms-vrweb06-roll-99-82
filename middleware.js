import { NextResponse } from 'next/server'
import { decryptValue } from './helpers/encrypt'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        console.log("In admin dashboard");
        const res = NextResponse.next();
        console.log("request.cookies");
        console.log(request.cookies);
        try {
            const cookie = request.cookies.get("pms-web");
            console.log("cookie in browser");
            console.log(cookie);

            if (cookie) {
                const cookiedata = JSON.parse(decryptValue(cookie.value));
                console.log("Cookie data middle");
                console.log(cookiedata);
                console.log("cookiedata.role");
                console.log(cookiedata.role);
                if (cookiedata.role != "admin") {
                    // redirect('/login')
                    return NextResponse.redirect(new URL("/", request.nextUrl));
                }
            } else {
                return NextResponse.redirect(new URL("/", request.nextUrl));
            }
        } catch (error) {
            console.log(error)
        }


        return res;

    }
    if (request.nextUrl.pathname.startsWith('/student/dashboard')) {
        console.log("In admin dashboard");
        const res = NextResponse.next();
        console.log("request.cookies");
        console.log(request.cookies);
        try {
            const cookie = request.cookies.get("pms-web");
            console.log("cookie in browser");
            console.log(cookie);

            if (cookie) {
                const cookiedata = JSON.parse(decryptValue(cookie.value));
                console.log("Cookie data middle");
                console.log(cookiedata);
                console.log("cookiedata.role");
                console.log(cookiedata.role);
                if (cookiedata.role != "student") {
                    // redirect('/login')
                    return NextResponse.redirect(new URL("/", request.nextUrl));
                }
            } else {
                return NextResponse.redirect(new URL("/", request.nextUrl));
            }
        } catch (error) {
            console.log(error)
        }


        return res;

    }
    if (request.nextUrl.pathname.startsWith('/coordinator/dashboard')) {
        console.log("In admin dashboard");
        const res = NextResponse.next();
        console.log("request.cookies");
        console.log(request.cookies);
        try {
            const cookie = request.cookies.get("pms-web");
            console.log("cookie in browser");
            console.log(cookie);

            if (cookie) {
                const cookiedata = JSON.parse(decryptValue(cookie.value));
                console.log("Cookie data middle");
                console.log(cookiedata);
                console.log("cookiedata.role");
                console.log(cookiedata.role);
                if (cookiedata.role != "coordinator") {
                    // redirect('/login')
                    return NextResponse.redirect(new URL("/", request.nextUrl));
                }
            } else {
                return NextResponse.redirect(new URL("/", request.nextUrl));
            }
        } catch (error) {
            console.log(error)
        }


        return res;

    }

    if (request.nextUrl.pathname.startsWith('/login')) {
        // console.log("In admin dashboard");
        const res = NextResponse.next();
        console.log("request.cookies");
        console.log(request.cookies);
        try {
            const cookie = request.cookies.get("pms-web");
            console.log("cookie in browser");
            console.log(cookie);

            if (cookie) {
                const cookiedata = JSON.parse(decryptValue(cookie.value));
                console.log("Cookie data middle");
                console.log(cookiedata);
                console.log("cookiedata.role");
                console.log(cookiedata.role);
                if (cookiedata.role === "student") {
                    // redirect('/login')
                    return NextResponse.redirect(new URL("/student/dashboard", request.nextUrl));
                }
                if (cookiedata.role === "coordinator") {
                    // redirect('/login')
                    return NextResponse.redirect(new URL("/coordinator/dashboard", request.nextUrl));
                }
            }
        } catch (error) {
            console.log(error)
        }
        return res;
    }
}
