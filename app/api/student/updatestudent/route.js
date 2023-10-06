import { NextResponse } from 'next/server';
import Student from '@/models/Student';
import connectMongoDB from '@/config/connect';
import { decryptValue, encryptValue } from '@/helpers/encrypt';
import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response json async update student");
    console.log(res);

    const { fname, lname, dob, pod, gender, email, phno, password, imageurl } = res;

    const cookiedata = cookies().get('pms-web').value;
    const decodeddata = JSON.parse(decryptValue(cookiedata));
    console.log("decodeddata");
    console.log(decodeddata);

    await connectMongoDB();
    // { firstname: firstname, lastname: lastname, email: email, gender: gender, dob: dob, height: height, weight: weight }

    const encryptPassword = encryptValue(password)
    const updatestudent = await Student.findOneAndUpdate({ rollno: decodeddata.rollno }, { firstname: fname, lastname: lname, dob, passedOutYear: pod, gender, email, phno, password: encryptPassword, profilepic: imageurl, newlogin: false }, { new: true });

    const cookieData = {
        studentid: updatestudent._id,
        rollno: updatestudent.rollno,
        firstname: updatestudent.firstname,
        lastname: updatestudent.lastname,
        department: updatestudent.department,
        college: updatestudent.college,
        newlogin: updatestudent.newlogin,
        role: "student"
    }

    console.log("updatestudent");
    console.log(updatestudent);
    console.log("cookieData");
    console.log(cookieData);
    const cookieString = JSON.stringify(cookieData);

    const encryptedCookieData = encryptValue(cookieString);

    cookies().set({
        name: 'pms-web',
        value: encryptedCookieData,
    });

    return NextResponse.json({ success: true, status: "ok", updatedStudent: updatestudent });
}
