"use client"
import React from 'react'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import styles from "./report.module.css"
import { useState, useEffect } from 'react';

function PlacementReports() {
    const handlePassOut = () => {
        const data = [
            { name: 'John Doe', rollNumber: '123', passoutYear: '2024', company: 'ABC Corp', package: '10', placed: 'Yes' },
            { name: 'Jane Smith', rollNumber: '456', passoutYear: '2024', company: 'XYZ Inc', package: '12', placed: 'Yes' },
            { name: 'Alice Johnson', rollNumber: '789', passoutYear: '2024', company: 'DEF Ltd', package: '9', placed: 'No' },
            { name: 'Bob Brown', rollNumber: '101', passoutYear: '2024', company: 'GHI Enterprises', package: '11', placed: 'Yes' },
            { name: 'Eve Davis', rollNumber: '202', passoutYear: '2024', company: 'LMN Technologies', package: '8', placed: 'No' },
        ];

        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set document properties
        doc.setProperties({
            title: 'Students Report',
        });

        // Define table columns
        const columns = ['Name', 'Roll Number', 'Passout Year', 'Company', 'Package (LPA)', 'Placed'];

        // Create an array of rows by mapping the data
        const rows = data.map((student) => [
            student.name,
            student.rollNumber,
            student.passoutYear,
            student.company,
            student.package,
            student.placed,
        ]);

        // Create a table
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 20,
        });

        // Save the PDF with a specific name
        doc.save('department_report.pdf');
    }

    const [allStudents, setallStudents] = useState();
    useEffect(() => {
        const getAllStudentsData = async () => {
            const callstudentdata = await fetch('/api/student/getallstudents');
            const studentdatajson = await callstudentdata.json();

            console.log("studentdata")
            console.log(studentdatajson)
            setallStudents(studentdatajson.studentsdata);
        }

        getAllStudentsData();
    }, [])
    return (
        <div className={styles.main}>
            <div className={styles.placements}>
                <p className={styles.title}>
                    Placements Report
                </p>
                <div className={styles.placements_flex_2}>
                    <div className={styles.placements_flex}>
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Passout</p>
                            <select id="department" name="department" className={styles.input_entry}>
                                <option value="null">Select Passout Year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                {/* Add more department options as needed */}
                            </select>
                        </div>
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Package</p>
                            <select id="department" name="package" className={styles.input_entry}>
                                <option value="null">Select Package Range</option>
                                <option value="20LPA">20LPA Above</option>
                                <option value="16LPA">16LPA Above</option>
                                <option value="10LPA">10LPA Above</option>
                                <option value="8LPA">8LPA Above</option>
                                <option value="5LPA">5LPA Above</option>
                                <option value="4LPA">4LPA Above</option>
                                {/* Add more department options as needed */}
                            </select>
                        </div>
                    </div>
                    <div className={styles.placements_flex}>
                        <button className={styles.btn}>Display</button>
                        <button className={styles.btn}>Report</button>
                    </div>
                </div>
            </div>
            {/* <div className={styles.placement_}>
                <table className={styles.content_table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            <th className={styles.td}>Company Name</th>
                            <th className={styles.td}>Package</th>
                            <th className={styles.td}>Offer Accepted</th>
                            <th className={styles.td}>Team</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {allStudents && allStudents.map((placement) => {
                            return (
                                <>
                                    <tr className={styles.tr}>
                                        <td className={styles.td}>{placement.companyname}</td>
                                        <td className={styles.td}>{placement.package / 12}</td>
                                        <td className={styles.td}>{placement.offerAccepted ? "Yes" : "No"}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div> */}
            {allStudents ? (<>
                <div className={styles.placements_flex}>
                    <table className={styles.content_table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.td}>S.no</th>
                                <th className={styles.td}>Name</th>
                                <th className={styles.td}>Roll Numbers</th>
                                <th className={styles.td}>Company Names</th>
                                <th className={styles.td}>Packages(LPA)</th>
                                <th className={styles.td}>Batch Year</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {allStudents && allStudents.map((student, index) => (
                                <tr key={student.studentid} className={styles.tr}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>{student.firstname} {student.lastname}</td>
                                    <td className={styles.td}>{student.rollno}</td>
                                    <td className={styles.td}>
                                        {student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.companyname).join(', ') : '-'}
                                    </td>
                                    <td className={styles.td}>
                                        {student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.package / 100000 + ' LPA').join(', ') : '-'}
                                    </td>
                                    <td className={styles.td}>{new Date(student.passedOutYear).getFullYear()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>) : (<>
                <br />
                <br />
                <p>Loading...</p>
            </>)}
        </div>
    )
}

export default PlacementReports