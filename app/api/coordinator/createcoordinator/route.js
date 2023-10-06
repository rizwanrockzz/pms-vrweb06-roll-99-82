import { NextResponse } from 'next/server';
// import Patient from '@/models/Patient';
// import DeptCoordinator from '@/models/DeptCoordinator';
import DeptCoordinator from '@/models/DeptCoordinator';
import connectMongoDB from '@/config/connect';
import { decryptValue, encryptValue } from '@/helpers/encrypt';
// import { cookies } from 'next/headers';

export async function POST(request) {
    const res = await request.json();
    console.log("response json async create coordinator");
    console.log(res);

    const { firstname, lastname, coordinatorid, password, role, college, department } = res;

    await connectMongoDB();

    const doesCoordinatorExists = await DeptCoordinator.findOne({ coordinatorid: coordinatorid });
    console.log("doesCoordinatorExists");
    console.log(doesCoordinatorExists);

    if (doesCoordinatorExists) {

        return NextResponse.json({ success: false, status: "failed", message: "DeptCoordinator with coordinatorid already exists" });
    } else {
        console.log("in new DeptCoordinator")

        const encryptPassword = await encryptValue(password);
        console.log("encryptPassword")
        console.log(encryptPassword)
        try {
            const newDeptCoordinator = new DeptCoordinator({
                coordinatorid: coordinatorid,
                firstname: firstname,
                lastname: lastname,
                department: department,
                password: encryptPassword,
                role: role,
                college: college
            });
            const savedDeptCoordinator = await newDeptCoordinator.save();

            console.log(savedDeptCoordinator);

            console.log("Document Saved");

            return NextResponse.json({ success: true, status: "ok", department: department });

        } catch (error) {
            console.log(error.message);
            console.log(error);
            return NextResponse.json({ success: false, status: "fail", message: error.message });
        }
    }
}
