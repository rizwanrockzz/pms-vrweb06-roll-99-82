import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import Student from '@/models/Student';
import { decryptValue } from '@/helpers/encrypt';
import connectMongoDB from '@/config/connect';
// import connectMongoDB from '@/config/connect';


export async function GET(request) {
    await connectMongoDB();

    try {
        const students = await Student.find({}, 'rollno');
        const rollnos = students.map(student => student.rollno);
        console.log(rollnos);

        return NextResponse.json({ success: true, status: "ok", rollnos });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, status: "fail", message: err.message });
    }


}

