'use client'
import React, { useState } from 'react'
import styles from "./user.module.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { useState } from 'react';

function AddUser() {
    const [showCoordinatorForm, setShowCoordinatorForm] = useState(false);
    const [showStudentForm, setShowStudentForm] = useState(false);

    const toggleCoordinatorForm = () => {
        setShowCoordinatorForm(!showCoordinatorForm);
        setShowStudentForm(false); // Close student form if open
    };

    const toggleStudentForm = () => {
        setShowStudentForm(!showStudentForm);
        setShowCoordinatorForm(false); // Close coordinator form if open
    };

    const handleCoordinatorCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/coordinator/createcoordinator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coordinatorid: bodyData.coordinatorid,
                    firstname: bodyData.firstname,
                    lastname: bodyData.lastname,
                    department: bodyData.department,
                    email: bodyData.email,
                    password: bodyData.password,
                    role: "coordinator",
                    college: "vrsec"
                })
            })

            console.log("response from /api/coordinator/createcoordinator");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success(`${response.department} Coordinator Created Successfully`, {
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

    // const handleAddRollNumber = (event) => {
    //     const newRollNumber = event.target.value;
    //     if (newRollNumber.trim() !== '') {
    //         setRollNumbers([...rollNumbers, newRollNumber]);
    //         event.target.value = '';
    //     }
    // };

    // const handleRemoveRollNumber = (index) => {
    //     const updatedRollNumbers = [...rollNumbers];
    //     updatedRollNumbers.splice(index, 1);
    //     setRollNumbers(updatedRollNumbers);
    // };

    // const handleDepartmentChange = (event) => {
    //     setSelectedDepartment(event.target.value);
    // };

    const handleStudentCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/student/createstudent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    department: bodyData.department,
                    rollno: bodyData.rollno,
                    role: "student",
                    college: "vrsec"
                })
            })

            console.log("response from /api/student/createstudent");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success("Student Registered Successfully", {
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
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={styles.main}>
                <div className={styles.placements}>
                    <p className={styles.title}>
                        Add Users
                    </p>
                    <div className={styles.placements_flex}>
                        <button className={styles.card} onClick={toggleCoordinatorForm}>
                            <div className={styles.row_1}>
                                <div className={styles.row_1}>
                                    {/* <div className={styles.dot_1}></div> */}
                                    <p className={styles.stitle}>
                                        Add Department Coordinators
                                    </p>
                                </div>
                                {/* <div className={styles.count}>{count}</div> */}
                            </div>
                        </button>
                        <button className={styles.card} onClick={toggleStudentForm}>
                            <div className={styles.row_1}>
                                <div className={styles.row_1}>
                                    {/* <div className={styles.dot_2}></div> */}
                                    <p className={styles.stitle}>
                                        Add Students
                                    </p>
                                </div>
                                {/* <div className={styles.count}>{count}</div> */}
                            </div>
                        </button>
                    </div>
                </div>
                <div className={styles.center}>
                    {showCoordinatorForm && (
                        <div className={styles.form}>
                            <h2 className={styles.subtitle}>Add Department Coordinator</h2>
                            <form onSubmit={handleCoordinatorCreate} >
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>
                                        First Name
                                    </p>
                                    <input type='text' name='firstname' placeholder='First Name' className={styles.input_entry} />
                                </div>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>Last Name</p>
                                    <input type="text" name="lastname" placeholder="Last Name" className={styles.input_entry} />
                                </div>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>
                                        Email
                                    </p>
                                    <input type='email' name='email' placeholder='Email' className={styles.input_entry} />
                                </div>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>Department</p>
                                    <select id="department" name="department" className={styles.input_entry}>
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
                                    <p className={styles.input_name}>Coordinator ID</p>
                                    <input type="text" maxLength={6} name="coordinatorid" placeholder="Coordinator ID" className={styles.input_entry} />
                                </div>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>Password</p>
                                    <input type="password" name="password" placeholder="Password" className={styles.input_entry} />
                                </div>

                                <div className={styles.input_field}>
                                    <button type="submit" className={styles.btn}>Add Coordinator</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {showStudentForm && (
                        <div className={styles.form}>
                            <h2 className={styles.subtitle}>Add Students</h2>
                            <form onSubmit={handleStudentCreate}>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>
                                        Student Rollno
                                    </p>
                                    <input type='text' name='rollno' placeholder='Roll Number' className={styles.input_entry} />
                                </div>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>Department</p>
                                    <select id="department" name="department" className={styles.input_entry}>
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
                                    <button type="submit" className={styles.btn}>Add Student</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AddUser