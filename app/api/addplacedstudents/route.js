import { NextResponse } from 'next/server';
// import Student from '@/models/Admin';
import Student from '@/models/Student';
import DeptCoordinator from '@/models/DeptCoordinator';
import connectMongoDB from '@/config/connect';
import { decryptValue, encryptValue } from '@/helpers/encrypt';
// import { cookies } from 'next/headers';
import { CrackedCompaniesDetails } from '@/models/Student';
import { SendEmail } from '@/helpers/emailapi';
import { emailToCoordinatorHTML, emailToCoordinatorText, emailToStudentHTML, emailToStudentText } from '@/helpers/emailtemplates';

export async function POST(request) {
    const res = await request.json();
    console.log("response json async add placed students");
    console.log(res);

    const { rollno, companyname, packageValue } = res;

    await connectMongoDB();

    const studentData = await Student.findOne({ rollno: rollno });
    console.log("studentData");
    console.log(studentData);

    try {

        // Check if studentData.email is not null or empty
        if (studentData && studentData.email) {
            // Check if the companyname is already present in the crackedCompanies array
            const companyExists = studentData.crackedCompanies.some(company => company.companyname === companyname.toLowerCase());

            if (companyExists) {
                return NextResponse.json({ success: false, status: "fail", message: "Company Already Exists For the student" });
            } else {
                const newPlacement = new CrackedCompaniesDetails({
                    companyname: companyname.toLowerCase(),
                    package: packageValue
                });

                // Push the newPlacement into the crackedCompanies array
                studentData.crackedCompanies.push(newPlacement);

                studentData.placed = true;
                // Save the updated student data
                await studentData.save();

                const coordinatorData = await DeptCoordinator.findOne({ department: studentData.department });
                const coordinatorEmail = coordinatorData ? coordinatorData.email : null;

                if (coordinatorEmail) {
                    // send mail
                    // (to, subject, htmlcode, textmessage)
                    await SendEmail(studentData.email, "About Placement to student", "<strong>This is HTML code of placement to student</strong>", "This is text of placement to student")

                    await SendEmail(coordinatorEmail, "About Placement to coordinator", "<strong>This is HTML code of placement to coordinator</strong>", "This is text of placement to coordinator")
                }

                return NextResponse.json({ success: true, status: "ok" });
            }
        }
    } catch (error) {
        console.log(error.message);
        console.log(error);
        return NextResponse.json({ success: false, status: "fail", message: error.message });
    }



}
