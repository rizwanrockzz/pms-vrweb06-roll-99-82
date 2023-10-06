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
                        <CardView color="#6BAC65" count="907" type="Placed Students"/>
                        <CardView color="#EF793A" count="197" type="Not Placed Students"/>
                        <CardView color="#AF84E7" count="107" type="Visited Companies"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page