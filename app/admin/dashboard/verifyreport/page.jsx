'use client'
import React from 'react'
import { useState, useEffect } from 'react';

const VerifyReport = () => {
    const [allStudents, setallStudents] = useState();
    useEffect(() => {
        const getAllBranchStudentsData = async () => {
            const callstudentdata = await fetch('/api/student/getallstudents');
            const studentdatajson = await callstudentdata.json();

            console.log("studentdata")
            console.log(studentdatajson)
            setallStudents(studentdatajson.studentsdata);
        }

        getAllBranchStudentsData();
    }, [])

    const handleApprove = (rollno, companyname) => {
        console.log(`Approved for ${rollno} in ${companyname}`);
        // Handle the approve logic here
    }

    const handleReject = (rollno, companyname) => {
        console.log(`Rejected for ${rollno} in ${companyname}`);
        // Handle the reject logic here
    }
    return (
        <div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Roll No</th>
                        <th style={styles.th}>Company Name</th>
                        <th style={styles.th}>Offer Letter</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allStudents && allStudents.map(student =>
                        student.crackedCompanies.map(company => (
                            <tr key={`${student.rollno}-${company.companyname}`} style={styles.tr}>
                                <td style={styles.td}>{student.rollno}</td>
                                <td style={styles.td}>{company.companyname}</td>
                                <td style={styles.td}><a href={company.offerLetter} target="_blank" rel="noopener noreferrer">View Offer Letter</a></td>
                                <td style={styles.td}>
                                    <button onClick={() => handleApprove(student.rollno, company.companyname)} style={styles.buttonApprove}>Approve</button>
                                    <button onClick={() => handleReject(student.rollno, company.companyname)} style={styles.buttonReject}>Reject</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    th: {
        backgroundColor: '#f2f2f2',
        color: '#333',
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    tr: {
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    buttonApprove: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '5px 10px',
        margin: '2px',
        border: 'none',
        cursor: 'pointer',
    },
    buttonReject: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '5px 10px',
        margin: '2px',
        border: 'none',
        cursor: 'pointer',
    }
}

export default VerifyReport;