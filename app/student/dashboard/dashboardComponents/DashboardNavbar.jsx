'use client'
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const DashboardNavbar = ({ childrencontent }) => {
    const router = useRouter();
    const Pathname = usePathname();
    const [Open, setOpen] = useState(true)
    const toggle = () => setOpen(!Open);

    const getLinkClassName = (href, additionalClass = "") => {
        const isActive = Pathname === href;
        return `${additionalClass} ${isActive ? styles.activeLink : ""}`;
    };

    const logoutUser = async () => {
        console.log("Logging out the user");

        const res = await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usedFor: "logout",
            }),
        });

        console.log("response from /api/logout");
        let response = await res.json();
        console.log("response");
        console.log(response);

        if (response.success) {
            toast.success(response.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                router.push("/login");
            }, 1500);
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
    };

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
            <div className={styles.main_navbar} >
                <div className={styles.center} >
                    <Icon icon="ci:hamburger-md" className={styles.cneter_icon} onClick={toggle} />
                    <div className={styles.userName}>
                        Student Dashboard
                    </div>
                </div>
                <div className={styles.notification}>
                    <div className={styles.userInfo}>
                        {/* <Icon icon="bxs:user" height={20} /> */}
                        {studentDetails && <Image src={studentDetails.imageurl} alt='student-image' width={30} height={30} style={{ borderRadius: '50%' }} />}
                        <div className={styles.userName}>
                            {studentDetails && (`${studentDetails.firstname} ${studentDetails.lastname}`)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>

                <div style={{ width: Open ? "15rem" : "5rem", padding: Open ? "15px" : "8px" }} className={styles.LeftsideBar}  >
                    <div className={styles.items}>
                        <Link
                            href="/student/dashboard"
                            className={getLinkClassName("/student/dashboard", styles.customClass)}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            {/* <div className={styles.iconText}> */}
                            <Icon icon="material-symbols:home" className={styles.Mobileicon} />

                            {/* </div> */}

                            <p style={{ display: Open ? "block" : "none" }}>Home</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Home</p>
                        <Link
                            href="/student/dashboard/addFile"
                            className={getLinkClassName(
                                "/student/dashboard/addFile",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="material-symbols:upload-file-outline" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Upload Offer Letters</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Upload Offer Letters</p>

                        <Link
                            href="/student/dashboard/history"
                            className={getLinkClassName(
                                "/student/dashboard/history",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="ic:round-history" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Placements History</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Placements History</p>

                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Settings</p>
                        <button type='button' onClick={logoutUser}
                            className={styles.logoutClass}
                            style={{ justifyContent: Open ? "flex-start" : "center" }}
                        >
                            <Icon icon="mingcute:exit-line" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Logout</p>
                        </button>
                        <p onClick={logoutUser} style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Logout</p>
                    </div>
                    <div className={styles.rela}>

                    </div>

                </div>
                <div className={styles.RightsideBar} style={{ marginLeft: Open ? "15rem" : "6rem" }}>{childrencontent}</div>
            </div>
        </>
    )
}

export default DashboardNavbar;