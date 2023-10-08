import styles from "./history.module.css"
import React from 'react'

function page() {
    return (
        <div className={styles.main}>
            <div className={styles.placements}>
                <p className={styles.title}>
                    Placements History
                </p>
                <div className={styles.placement_message}>
                    <table className={styles.content_table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.td}>Rank</th>
                                <th className={styles.td}>Name</th>
                                <th className={styles.td}>Points</th>
                                <th className={styles.td}>Team</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>1</td>
                                <td className={styles.td}>Domenic</td>
                                <td className={styles.td}>88,110</td>
                                <td className={styles.td}>dcode</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>2</td>
                                <td className={styles.td}>Sally</td>
                                <td className={styles.td}>72,400</td>
                                <td className={styles.td}>Students</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>3</td>
                                <td className={styles.td}>Nick</td>
                                <td className={styles.td}>52,300</td>
                                <td className={styles.td}>dcode</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default page