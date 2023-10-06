import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
// import Doctor from "@/models/Doctor";
import { decryptValue } from '@/helpers/encrypt';
import connectMongoDB from '@/config/connect';
import Student from '@/models/Student';

export async function GET(request) {

    const cookie = cookies().get('pms-web');
    console.log("cookie to get student data");
    console.log(cookie);
    if (cookie) {
        let cookieData = JSON.parse(decryptValue(cookie.value));

        console.log(cookieData != null);

        console.log("cookieData");
        console.log(cookieData);

        await connectMongoDB();

        const placementData = await Student.findOne({ rollno: cookieData.rollno })

        console.log("placementData");
        console.log(placementData);
        return NextResponse.json({ success: true, status: "ok", placement: placementData.crackedCompanies });
    } else {
        return NextResponse.json({ success: false, status: "fail", studentdata: null });
    }

}
