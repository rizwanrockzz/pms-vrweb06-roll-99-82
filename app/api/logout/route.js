import { NextResponse } from 'next/server';
import connectMongoDB from '@/config/connect';
import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response in /api/logout");
    console.log(res);

    const cookie = cookies().get('pms-web');
    if(cookie){
        cookies().delete('pms-web');

        return NextResponse.json({ success: true, status: "ok", message:"Successful Logged Out" });
    }else{
        return NextResponse.json({ success: false, status: "fail", message:"No Cookies Found" });
    }
}