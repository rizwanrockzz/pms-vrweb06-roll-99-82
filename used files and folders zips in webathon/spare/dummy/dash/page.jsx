import React from 'react'
import styles from "./styles.module.css"
import CardView from './dashboardComponents/CardView'

function page() {
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
                        <button className={styles.btn}>Display</button>
                    </div>
                    <div className={styles.placements_f}>
                        <div className={styles.input_field}>
                            <p className={styles.input_name}>Department</p>
                            <select id="department" name="department" className={styles.input_entry}>
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
                            <select id="department" name="companyName" className={styles.input_entry}>
                                <option value="null">Select Company Name</option>
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
                            <p className={styles.input_name}>Package</p>
                            <select id="department" name="package" className={styles.input_entry}>
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
                            <select id="department" name="department" className={styles.input_entry}>
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
        </>
    )
}

export default page