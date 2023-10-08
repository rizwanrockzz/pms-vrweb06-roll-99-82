"use client"
import React from 'react'
import styles from "./student.module.css"
import CardView from './dashboardComponents/CardView'

function page() {
    const packagelpa = "12";
    const company = "Microsoft"
    return (
        <>

            <div className={styles.main}>

                {/* <div className={styles.confetti}>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                    <div className={styles.confetti_piece}></div>
                </div> */}
                <div className={styles.placements}>
                    <p className={styles.title}>
                        Placement Status ☹️ 🤩
                    </p>
                    <div className={styles.placement_message}>
                        <p>Keep striving for success. Your opportunity is just around the corner.</p>
                        <p>Congratulations 🎉 on your outstanding achievement! {company} and {packagelpa} LPA — the future looks bright with your success.</p>
                    </div>
                </div>
                <div className={styles.placements}>
                    <p className={styles.title}>
                        Notification
                    </p>
                    <div className={styles.placement_message}>
                        <p>No placement notifications available at the moment. Stay tuned for updates!</p>
                        <div className={styles.card}>
                            <div className={styles.row_1}>
                                <div className={styles.row_1}>
                                    <div className={styles.dot}></div>
                                    <p className={styles.shtitle}>
                                        Message
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page