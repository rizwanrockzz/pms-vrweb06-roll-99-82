import { NextResponse } from 'next/server';
import DeptCoordinator from '@/models/DeptCoordinator';
import connectMongoDB from '@/config/connect';
import { encryptValue, decryptValue } from '@/helpers/encrypt';
import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response in /api/coordinator/logincoordinator");
    console.log(res);

    const { rollorid, password } = res;

    try {
        await connectMongoDB();

        if (rollorid.length === 6) {
            // Coordinator

            console.log("Finding DeptCoordinator/Student with rollorid");
            const coordinator = await DeptCoordinator.findOne({ coordinatorid: rollorid });

            const decryptedPassword = decryptValue(coordinator.password);
            console.log(`Decrypted password is : ${decryptedPassword}`);

            if (decryptedPassword === password) {
                const cookieData = {
                    coordinatorid: coordinator._id,
                    firstname: coordinator.firstname,
                    lastname: coordinator.lastname,
                    department: coordinator.department,
                    college: coordinator.college,
                    role: "coordinator"
                }

                console.log("coordinator");
                console.log(coordinator);
                console.log("cookieData");
                console.log(cookieData);
                const cookieString = JSON.stringify(cookieData);

                const encryptedCookieData = encryptValue(cookieString);

                cookies().set({
                    name: 'pms-web',
                    value: encryptedCookieData,
                });

                return NextResponse.json({ success: true, status: "ok", loginAs: `${coordinator.department} Department Coordinator`,role:"coordinator" });
            } else {
                return NextResponse.json({ success: false, status: "failed", message: "Wrong Email or Password" });
            }
        }
        if (rollorid.length === 10) {
            // Student

            console.log("Finding Student/Student with rollorid");
            const student = await Student.findOne({ roll: rollorid.lower() });

            const decryptedPassword = decryptValue(student.password);
            console.log(`Decrypted password is : ${decryptedPassword}`);

            if (decryptedPassword === password) {
                const cookieData = {
                    studentid: student._id,
                    rollno: student.rollno,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    department: student.department,
                    college: student.college,
                    role: "student"
                }

                console.log("student");
                console.log(student);
                console.log("cookieData");
                console.log(cookieData);
                const cookieString = JSON.stringify(cookieData);

                const encryptedCookieData = encryptValue(cookieString);

                cookies().set({
                    name: 'pms-web',
                    value: encryptedCookieData,
                });

                return NextResponse.json({ success: true, status: "ok", loginAs: `${student.department} Department Student`,role:"student"});
            } else {

            }
        }
        else {
            return NextResponse.json({ success: false, status: "failed", message: "Wrong Rollno or Id" });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, status: "failed", message: error.message });
    }
}