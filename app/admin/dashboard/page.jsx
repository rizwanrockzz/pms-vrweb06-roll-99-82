'use client'
import React from 'react'
import styles from "./styles.module.css"
import CardView from './dashboardComponents/CardView'
import { useState, useEffect } from 'react'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

function AdminDashboard() {
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

    const handlePassOut = (data) => {
        // const data = [
        //     { name: 'John Doe', rollNumber: '123', passoutYear: '2024', company: 'ABC Corp', package: '10', placed: 'Yes' },
        //     { name: 'Jane Smith', rollNumber: '456', passoutYear: '2024', company: 'XYZ Inc', package: '12', placed: 'Yes' },
        //     { name: 'Alice Johnson', rollNumber: '789', passoutYear: '2024', company: 'DEF Ltd', package: '9', placed: 'No' },
        //     { name: 'Bob Brown', rollNumber: '101', passoutYear: '2024', company: 'GHI Enterprises', package: '11', placed: 'Yes' },
        //     { name: 'Eve Davis', rollNumber: '202', passoutYear: '2024', company: 'LMN Technologies', package: '8', placed: 'No' },
        // ];

        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set document properties
        doc.setProperties({
            title: 'Students Placement Report',
        });

        // Define table columns
        const columns = ["Rollno", "Department", "Company Name", "Package", "Passout Year"];
        doc.text('Student Placement Report', 20, 10); // (text, x, y

        // Create an array of rows by mapping the data
        const rows = data.map((student, index) => [
            // {`${student.firstname} ${student.lastname}`},
            // index + 1,
            // student.firstname,
            student.rollno,
            student.department,
            student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.companyname).join(', ') : '-',
            student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.packageValue / 100000 + ' LPA').join(', ') : '-',
            new Date(student.passedOutYear).getFullYear()
        ]);


        doc.setFontSize(18); // Set font size for the heading
        // Create a table
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 20,
        });

        // Save the PDF with a specific name
        doc.save('admin_department_filters_report.pdf');
    }

    // State variables for each dropdown
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedCompanyName, setSelectedCompanyName] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    // Filtered students based on selected criteria
    const filteredStudents = allStudents?.filter(student => {
        let departmentCondition = true;
        let companyNameCondition = true;
        let packageCondition = true;
        let yearCondition = true;

        if (selectedDepartment && selectedDepartment !== "null") {
            departmentCondition = student.department === selectedDepartment;
        }

        if (selectedCompanyName && selectedCompanyName !== "null") {
            companyNameCondition = student.crackedCompanies.some(company => company.companyname === selectedCompanyName);
        }

        if (selectedPackage && selectedPackage !== "null") {
            const minPackage = parseInt(selectedPackage.split('LPA')[0]);
            packageCondition = student.crackedCompanies.some(company => (company.packageValue / 100000) >= minPackage);
        }

        if (selectedYear && selectedYear !== "null") {
            yearCondition = new Date(student.passedOutYear).getFullYear() === parseInt(selectedYear);
        }

        return departmentCondition && companyNameCondition && packageCondition && yearCondition;
    });

    return (
        <>
            <div className={styles.main}>
                <div className={styles.placements}>
                    <p className={styles.title}>
                        Placements Overview
                    </p>
                    <div className={styles.placements_flex}>
                        <CardView color="#6BAC65" count="907" type="Placed Students" />
                        <CardView color="#EF793A" count="197" type="Not Placed Students" />
                        <CardView color="#AF84E7" count="107" type="Visited Companies" />
                    </div>
                </div>
                <div className={styles.placements}>
                    <div className={styles.placements_f}>
                        <p className={styles.title}>
                            Data View Preferences
                        </p>
                        <button onClick={(e) => { handlePassOut(filteredStudents) }} className={styles.btn}>Report</button>
                    </div>
                    <div className={styles.placements_f}>
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Department</p>
                            <select id="department" name="department" className={styles.input_entry} onChange={(e) => setSelectedDepartment(e.target.value)}>
                                <option value="null">Select Department</option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                                <option value="MECH">MECH</option>
                                <option value="EIE">EIE</option>
                                <option value="CIVIL">CIVIL</option>
                                {/* Add more department options as needed */}
                            </select>
                        </div>
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Company Name</p>
                            <select id="department" name="companyName" className={styles.input_entry} onChange={(e) => setSelectedCompanyName(e.target.value)}>
                                <option value="null">Select Company Name</option>
                                <option value="amazon">amazon</option>
                                <option value="microsoft">microsoft</option>
                                {/* Add more department options as needed */}
                            </select>
                        </div>
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Package</p>
                            <select id="department" name="package" className={styles.input_entry} onChange={(e) => setSelectedPackage(e.target.value)}>
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
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Passout</p>
                            <select id="department" name="department" className={styles.input_entry} onChange={(e) => setSelectedYear(e.target.value)}>
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
                    </div>
                </div>
            </div>

            {allStudents ? (<>
                <div className={styles.main}>
                    <div className={styles.placements}>
                        <div className={styles.placement_message}>
                            <table className={styles.content_table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.td}>Rollno</th>
                                        <th className={styles.td}>Department</th>
                                        <th className={styles.td}>Company Name</th>
                                        <th className={styles.td}>Package</th>
                                        <th className={styles.td}>Passout Year</th>
                                        {/* <th className={styles.td}>Team</th> */}
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {filteredStudents && filteredStudents.map((student) => {
                                        return (
                                            <>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>{student.rollno}</td>
                                                    <td className={styles.td}>{student.department}</td>
                                                    <td className={styles.td}>{student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.companyname).join(', ') : '-'}</td>
                                                    <td className={styles.td}>{student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.packageValue / 100000 + ' LPA').join(', ') : '-'}</td>
                                                    <td className={styles.td}>{new Date(student.passedOutYear).getFullYear()}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>) : (<>
                <br />
                <br />
                <p>Loading...</p>
            </>)}
        </>
    )
}

export default AdminDashboard