import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
// import Doctor from "@/models/Doctor";
import { decryptValue } from '@/helpers/encrypt';
// import connectMongoDB from '@/config/connect';


export async function GET(request) {

    const cookie = cookies().get('pms-web');
    console.log("cookie to get student data");
    console.log(cookie);
    if (cookie) {
        let cookieData = JSON.parse(decryptValue(cookie.value));

        console.log(cookieData != null);

        console.log("cookieData");
        console.log(cookieData);

        return NextResponse.json({ status: "ok", studentdata: cookieData });
    } else {
        return NextResponse.json({ status: "fail", studentdata: null });
    }

}

/**
 * 
 *     let hasCookie = false;

    if (cookieData != null) {
        await connectMongoDB();
        const patientData = await Patient.findOne({ phno: cookieData.phno });

        hasCookie = true;
        return NextResponse.json({ status: "ok", data: cookieData, fullname: cookieData.name, imageurl: cookieData.imageurl, hasCookie: hasCookie, patientData });

    } else {
        hasCookie = false;

    }
 */
