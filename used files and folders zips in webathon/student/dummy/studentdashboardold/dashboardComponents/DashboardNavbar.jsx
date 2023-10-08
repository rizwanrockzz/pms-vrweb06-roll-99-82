'use client'
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useState } from "react"

const DashboardNavbar = ({ childrencontent }) => {
    const Pathname = usePathname();
    const [Open, setOpen] = useState(true)
    const toggle = () => setOpen(!Open);

    const getLinkClassName = (href, additionalClass = "") => {
        const isActive = Pathname === href;
        return `${additionalClass} ${isActive ? styles.activeLink : ""}`;
    };
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
                        <Icon icon="bxs:user" height={20} />
                        <div className={styles.userName}>
                            D.Mahith Paul
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>

                <div style={{ width: Open ? "15rem" : "5rem", padding: Open ? "15px" : "8px" }} className={styles.LeftsideBar}  >
                    <div className={styles.items}>
                        <Link
                            href="/student"
                            className={getLinkClassName("/student", styles.customClass)}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            {/* <div className={styles.iconText}> */}
                            <Icon icon="material-symbols:home" className={styles.Mobileicon} />

                            {/* </div> */}

                            <p style={{ display: Open ? "block" : "none" }}>Home</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Home</p>
                        <Link
                            href="/student/addFile"
                            className={getLinkClassName(
                                "/student/addFile",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="material-symbols:upload-file-outline" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Upload Offer Letters</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Upload Offer Letters</p>

                        <Link
                            href="/student/history"
                            className={getLinkClassName(
                                "/student/history",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="ic:round-history" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Placements History</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Placements History</p>

{/* 
                        <Link
                            href="/dashboard/schedule-timings"
                            className={getLinkClassName(
                                "/dashboard/schedule-timings",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="tdesign:time" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Schedule Timings</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Schedule Timings</p>
                        <Link
                            href="/dashboard/payments"
                            className={getLinkClassName(
                                "/dashboard/payments",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="ic:baseline-payment" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Payments</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Payments</p>
                        <Link
                            href="/dashboard/messages"
                            className={getLinkClassName(
                                "/dashboard/messages",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="ic:outline-message" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}> Messages</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Messages</p>
                        <Link
                            href="/dashboard/settings"
                            className={getLinkClassName(
                                "/dashboard/settings",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="material-symbols:settings-outline" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Settings</p>
                        </Link> */}
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Settings</p>
                        <button type='button'
                            className={styles.logoutClass}
                            style={{ justifyContent: Open ? "flex-start" : "center" }}
                        >
                            <Icon icon="mingcute:exit-line" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Logout</p>
                        </button>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Logout</p>
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