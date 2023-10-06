"use client"
import React from 'react'
import styles from "./home.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion";

function NavBar() {
    return (
        <div className={styles.nav}>
            <div className={styles.ntitle}>
                <Image src='/logo.png' width={80} height={60} alt='hero-logo' />
                <div className={styles.sub}>
                    Velagapudi Ramakrishna Siddhartha Engineering College
                </div>
            </div>
            <div className={styles.buttons}>
                <Link href="/login" ><motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.1 }} className={styles.student_btn}>
                    Student/Staff
                </motion.button></Link>
                <Link href="/admin/login" ><motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.1 }} className={styles.student_btn}>
                    Administrator
                </motion.button></Link>
            </div>
        </div>
    )
}

export default NavBar