"use client"
import React from 'react'
import styles from "./staff.module.css"
import CardView from './dashboardComponents/CardView'
import { useState, useEffect } from 'react'

function CoordinatorDashboard() {
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
    <>
      <div className={styles.main}>
        <div className={styles.placements}>
          <p className={styles.title}>
            Placements Overview
          </p>
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
                        {student.crackedCompanies.length > 0 ? student.crackedCompanies.map(company => company.packageValue / 100000 + ' LPA').join(', ') : '-'}
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
      </div>
    </>
  )
}

export default CoordinatorDashboard;