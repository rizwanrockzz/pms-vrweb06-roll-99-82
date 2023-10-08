import { NextResponse } from 'next/server';
// import Patient from '@/models/Patient';
import Admin from '@/models/Admin';
import connectMongoDB from '@/config/connect';
import { decryptValue, encryptValue } from '@/helpers/encrypt';
// import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response json async create admin");
    console.log(res);

    const { fname, lname, email, password, role, college } = res;

    await connectMongoDB();

    const doesAdminExists = await Admin.findOne({ email: email });
    console.log("doesAdminExists");
    console.log(doesAdminExists);

    if (doesAdminExists) {

        return NextResponse.json({ success: false, status: "failed", message: "Admin with email already exists" });
    } else {
        console.log("in new user")

        const encryptPassword = await encryptValue(password);
        console.log("encryptPassword")
        console.log(encryptPassword)
        try {
            const newAdmin = new Admin({
                adminId: crypto.randomUUID(),
                firstname: fname,
                lastname: lname,
                email: email,
                password: encryptPassword,
                role: role,
                college: college
            });
            const savedadmin = await newAdmin.save();

            console.log(savedadmin);

            console.log("Document Saved");

            return NextResponse.json({ success: true, status: "ok" });

        } catch (error) {
            console.log(error.message);
            console.log(error);
            return NextResponse.json({ success: false, status: "fail", message: error.message });
        }
    }


}
