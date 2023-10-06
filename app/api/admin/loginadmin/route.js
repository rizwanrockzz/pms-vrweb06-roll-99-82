import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';
import connectMongoDB from '@/config/connect';
import { encryptValue, decryptValue } from '@/helpers/encrypt';
import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response in /api/login");
    console.log(res);

    const { email, password } = res;

    try {
        await connectMongoDB();

        console.log("Finding Admin with email");
        const admin = await Admin.findOne({ email: email });

        if(admin){
            const decryptedPassword = decryptValue(admin.password);
        console.log(`Decrypted password is : ${decryptedPassword}`);

        if (decryptedPassword === password) {
            const cookieData = {
                adminid: admin._id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
                role: "admin"
            }

            console.log("admin");
            console.log(admin);
            console.log("cookieData");
            console.log(cookieData);
            const cookieString = JSON.stringify(cookieData);

            const encryptedCookieData = encryptValue(cookieString);

            cookies().set({
                name: 'pms-web',
                value: encryptedCookieData,
            });

            return NextResponse.json({ success: true, status: "ok" });
        } else {
            return NextResponse.json({ success: false, status: "failed", message: "Wrong Password" });
        }
        }else{
            return NextResponse.json({ success: false, status: "failed", message: "Email is not registered with us" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, status: "failed", message: error.message });
    }
}