'use client'
import React, { useEffect } from 'react'
import styles from "./placed.module.css"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function AddPlacedStudents() {
    const [allrollnos, setallrollnos] = useState([]);
    useEffect(() => {
        const getallRollsDetails = async () => {
            const callallRollsdata = await fetch('/api/getrollnos');
            const allRollsdatajson = await callallRollsdata.json();

            console.log("allRollsdata")
            console.log(allRollsdatajson)
            setallrollnos(allRollsdatajson.rollnos);
        }

        getallRollsDetails();
    }, []);

    const handlePlacedStudents = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/addplacedstudents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    companyname: bodyData.companyname,
                    packageValue: Number(bodyData.packageValue),
                    rollno: bodyData.rollno
                })
            })

            console.log("response from /api/addplacedstudents");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success("Placement Added Successfully", {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            e.target.reset();
        } catch (error) {
            console.log("error client side create account");
            console.log(error);
            console.log(error.message);
        }
    }

    return (
        <div className={styles.center}>
            <div className={styles.form}>
                <h2 className={styles.subtitle}>Add Placed Candidates</h2>
                <form onSubmit={handlePlacedStudents}>
                    {/* <div className={styles.input_field}>
                        <p className={styles.input_name}>
                            Name
                        </p>
                        <input type='text' name='fname' placeholder='Name' className={styles.input_entry} />
                    </div> */}
                    <div className={styles.input_field}>
                        <p className={styles.input_name}>Roll Number</p>
                        {/* <input type="text" name="lname" placeholder="Roll Number" className={styles.input_entry} /> */}
                        <select id='rollno' name='rollno' className={styles.input_entry}>
                            {allrollnos.map((rollno, index) => (
                                <option key={index} value={rollno}>{rollno}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className={styles.input_field}>
                        <p className={styles.input_name}>Department</p>
                        <select id="department" name="department" className={styles.input_entry}>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                            <option value="EIE">EIE</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                    </div> */}
                    {/* Add more department options as needed */}
                    <div className={styles.input_field}>
                        <p className={styles.input_name}>Company Name</p>
                        <input type="text" name="companyname" placeholder="Company Name" className={styles.input_entry} />
                    </div>
                    <div className={styles.input_field}>
                        <p className={styles.input_name}>Package</p>
                        <input type="text" name="packageValue" placeholder="Package" className={styles.input_entry} />
                    </div>
                    {/* <div className={styles.input_field}>
                        <p className={styles.input_name}>Batch Year</p>
                        <input type="text" id="password" name="password" placeholder="Batch Year" className={styles.input_entry} />
                    </div> */}

                    <div className={styles.input_field}>
                        <button type="submit" className={styles.btn}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPlacedStudents;