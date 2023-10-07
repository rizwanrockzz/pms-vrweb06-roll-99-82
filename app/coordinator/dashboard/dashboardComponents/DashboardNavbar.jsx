'use client'
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useState } from "react"
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
            }, 2000);
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
            <div className={styles.main_navbar} >
                <div className={styles.center} >
                    <Icon icon="ci:hamburger-md" className={styles.cneter_icon} onClick={toggle} />
                    <div className={styles.userName}>
                        Coordinator Dashboard
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
                            href="/coordinator/dashboard"
                            className={getLinkClassName("/coordinator/dashboard", styles.customClass)}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            {/* <div className={styles.iconText}> */}
                            <Icon icon="material-symbols:home" className={styles.Mobileicon} />

                            {/* </div> */}

                            <p style={{ display: Open ? "block" : "none" }}>Home</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Home</p>
                        <Link
                            href="/coordinator/dashboard/report"
                            className={getLinkClassName(
                                "/coordinator/dashboard/report",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="mdi:file-report-outline" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Placements Report</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Placements Report</p>

                        <Link
                            href="/coordinator/dashboard/notifications"
                            className={getLinkClassName(
                                "/coordinator/dashboard/notifications",
                                styles.customClass
                            )}
                            style={{ justifyContent: Open ? "flex-start" : "center", margin: Open ? "0px 0px" : "0 10px" }}
                        >
                            <Icon icon="octicon:bell-16" height={20} />
                            <p style={{ display: Open ? "block" : "none" }}>Notification</p>
                        </Link>
                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Notification</p>

                        <p style={{ display: Open ? "none" : "block" }} className={styles.MobileText}>Settings</p>
                        <button type='button' onClick={logoutUser}
                            className={styles.logoutClass}
                            style={{ justifyContent: Open ? "flex-start" : "center" }}
                        >
                            <Icon icon="mingcute:exit-line" height={20} />
                            <p onClick={logoutUser} style={{ display: Open ? "block" : "none" }}>Logout</p>
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