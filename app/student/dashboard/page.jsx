"use client"
import React from 'react'
import styles from "./student.module.css"
import { useEffect, useState } from 'react'
import CreateAccountForm from '@/app/components/CreateAccountForm'
import CardView from './dashboardComponents/CardView'

function StudentDashboard() {
    const packagelpa = "12";
    const company = "Microsoft"

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
                    {/* <div>Welcome to StudentDashboard</div> */}
                    <div className={styles.main}>
                        <div className={styles.placements}>
                            <p className={styles.title}>
                                Placement Status {studentDetails && studentDetails.placed ? '🤩' : '☹️'}
                            </p>
                            <div className={styles.placement_message}>
                                {studentDetails && studentDetails.placed ? <>
                                    <p>Congratulations 🎉 on your outstanding achievement! {company} and {packagelpa} LPA — the future looks bright with your success.</p></> : <p>Keep striving for success. Your opportunity is just around the corner.</p>}
                            </div>
                        </div>
                        <div className={styles.placements}>
                            <p className={styles.title}>
                                Notification
                            </p>
                            <div className={styles.placement_message}>
                                <p>No placement notifications available at the moment. Stay tuned for updates!</p>
                                <div className={styles.card}>
                                    <div className={styles.row_1}>
                                        <div className={styles.row_1}>
                                            <div className={styles.dot}></div>
                                            <p className={styles.shtitle}>
                                                Message
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </>
    )
}

export default StudentDashboard