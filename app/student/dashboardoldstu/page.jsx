'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import CreateAccountForm from '@/app/components/CreateAccountForm'

const StudentDashboard = () => {
    const [studentDetails, setstudentDetails] = useState();
    useEffect(() => {
        const getStudentDetails = async () => {
            const callstudentdata = await fetch('/api/student/getstudent');
            const studentdatajson = await callstudentdata.json();

            console.log("studentdata")
            console.log(studentdatajson)
            setstudentDetails(studentdatajson.studentdata);
        }

        getStudentDetails();
    }, [])
    return (
        <>
            {studentDetails && studentDetails.newlogin && (
                <>
                    <CreateAccountForm />
                </>
            )}
            {studentDetails && !studentDetails.newlogin && (
                <>
                    <div>Welcome to StudentDashboard</div>
                </>
            )}

        </>
    )
}

export default StudentDashboard