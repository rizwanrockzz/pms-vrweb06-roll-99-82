import React from 'react'
import styles from "./card.module.css"

function CardView({ color, count, type }) {
    const dotStyle = {
        backgroundColor: color, // Set the background color based on the 'color' prop
    };
    return (
        <div className={styles.card}>
            <div className={styles.row_1}>
                <div className={styles.row_1}>
                    <div className={styles.dot} style={dotStyle}></div>
                    <p className={styles.title}>
                        {type}
                    </p>
                </div>
                <div className={styles.count}>{count}</div>
            </div>
        </div>
    )
}

export default CardView