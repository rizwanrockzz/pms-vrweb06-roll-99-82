import { NextResponse } from 'next/server';
import Student from '@/models/Student';
import connectMongoDB from '@/config/connect';
import { decryptValue, encryptValue } from '@/helpers/encrypt';
import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response json async update student");
    console.log(res);

    const { companyname, fileurl } = res;
    console.log(companyname, fileurl)
    const cookiedata = cookies().get('pms-web').value;
    const decodeddata = JSON.parse(decryptValue(cookiedata));
    console.log("decodeddata");
    console.log(decodeddata);

    await connectMongoDB();

    const studentData = await Student.findOne({ rollno: decodeddata.rollno });

    console.log("studentData");
    console.log(studentData);

    if (!studentData) {
        return NextResponse.json({ success: false, status: "fail", message: "Student not found." });
    }

    const company = studentData.crackedCompanies.find(comp => comp.companyname == companyname);

    console.log("company");
    console.log(company);
    if (!company) {
        return NextResponse.json({ success: false, status: "fail", message: "Company not found for the student." });
    }

    company.offerLetter = fileurl;

    await studentData.save();

    return NextResponse.json({ success: true, status: "ok", updatedStudent: studentData });
}


// import { NextResponse } from 'next/server';
// import Student from '@/models/Student';
// import connectMongoDB from '@/config/connect';
// import { decryptValue, encryptValue } from '@/helpers/encrypt';
// import { cookies } from 'next/headers';

// export async function POST(request) {
//     const res = await request.json();
//     console.log("response json async update student");
//     console.log(res);

//     const { companyname, fileurl } = res;

//     const cookiedata = cookies().get('pms-web').value;
//     const decodeddata = JSON.parse(decryptValue(cookiedata));
//     console.log("decodeddata");
//     console.log(decodeddata);

//     await connectMongoDB();

//     const studentData = await Student.findOne({ rollno: decodeddata.rollno });

//     console.log("studentData");
//     console.log(studentData);

//     const companyExists = studentData.crackedCompanies.some(company => company.companyname === companyname);
//     companyExists.offerLetter = fileurl;

//     studentData.save();

//     return NextResponse.json({ success: true, status: "ok", updatedStudent: studentData });
// }

// //     const updatedStudent = await Student.findOneAndUpdate(
// //         {
// //             rollno: decodeddata.rollno,
// //             "crackedCompanies.companyname": companyname
// //         },
// //         {
// //             "$set": { "crackedCompanies.$.offerLetter": fileurl }
// //         },
// //         { new: true }  // This option returns the modified document
// //     );

// //     console.log("updatedStudent");
// //     console.log(updatedStudent);

// //     return NextResponse.json({ success: true, status: "ok", updatedStudent });
// // }