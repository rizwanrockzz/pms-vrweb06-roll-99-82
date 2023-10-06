import { NextResponse } from 'next/server';
import Student from '@/models/Student';
import connectMongoDB from '@/config/connect';
import { decryptValue, encryptValue } from '@/helpers/encrypt';
// import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response json async create student");
    console.log(res);

    const { rollno, department, role, college } = res;

    await connectMongoDB();

    const doesStudentExists = await Student.findOne({ rollno: rollno.toLowerCase() });
    console.log("doesStudentExists");
    console.log(doesStudentExists);

    if (doesStudentExists) {

        return NextResponse.json({ success: false, status: "failed", message: "Student with rollno already exists" });
    } else {
        console.log("in new Student")

        const encryptPassword = await encryptValue("1234");
        console.log("encryptPassword")
        console.log(encryptPassword)
        try {
            const newStudent = new Student({
                studentid: crypto.randomUUID(),
                rollno: rollno.toLowerCase(),
                password:encryptPassword,
                department: department,
                role: role,
                college: college
            });
            const savedStudent = await newStudent.save();

            console.log(savedStudent);

            console.log("Document Saved");

            return NextResponse.json({ success: true, status: "ok", department: department });

        } catch (error) {
            console.log(error.message);
            console.log(error);
            return NextResponse.json({ success: false, status: "fail", message: error.message });
        }
    }
}
