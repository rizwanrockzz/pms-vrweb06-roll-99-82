'use client'
import React from 'react'
import Link from 'next/link'
import styles from "./login.module.css"
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

function CoordinatorOrStudentLogin() {
    const router = useRouter();

    const handleCoordinatorOrStudentLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/coordinator/logincoordinator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rollorid: bodyData.rollorid,
                    password: bodyData.password,
                })
            })

            console.log("response from /api/coordinator/logincoordinator");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success(`${response.loginAs} Login Successfull`, {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    router.push(`/${response.role}/dashboard`);
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
                <div className={styles.main_hero}>
                    <div className={styles.main_left}>
                        <div className={styles.text}>

                            <p className={styles.txt}>The key to happiness is to log in.</p>
                            <form onSubmit={handleCoordinatorOrStudentLogin}>
                                <div className={styles.main_form}>
                                    <div className={styles.input_field}>
                                        <p className={styles.input_name}>
                                            Roll Number / CoordinatorId
                                        </p>
                                        <input type='text' maxLength={10} placeholder='Roll Number/id' className={styles.input_entry} name="rollorid" required />
                                    </div>
                                    <div className={styles.input_field}>
                                        <p className={styles.input_name}>
                                            Password
                                        </p>
                                        <input type='password' placeholder='Password' className={styles.input_entry} name='password' required />
                                    </div>
                                    <Link href="#" className={styles.input_forget}>
                                        Forget Password
                                    </Link>
                                    <div>
                                        <button type='submit' className={styles.btn}>Login</button>
                                    </div>
                                    <p className={styles.txt_1}>If you are new to the portal,Contact Administrator</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.main_right}>
                        <Image src="/logo.png" width={150} height={150} alt='main-logo' />
                        <p className={styles.head}>Velagapudi Ramakrishna Siddhartha Engineering College</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CoordinatorOrStudentLogin