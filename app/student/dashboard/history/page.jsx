'use client'
import styles from "./history.module.css"
import React from 'react'
import { useEffect, useState } from 'react'

function PlacementHistory() {
    const [placementDetails, setplacementDetails] = useState();

    useEffect(() => {
        const getPlacementStats = async () => {
            const callplacementdata = await fetch('/api/getplacementinfo');
            const placementdatajson = await callplacementdata.json();

            console.log("placementdata")
            console.log(placementdatajson)
            setplacementDetails(placementdatajson.placement);
        }
        getPlacementStats();
    }, [])
    return (
        <>
            {placementDetails ? (<>
                <div className={styles.main}>
                    <div className={styles.placements}>
                        <p className={styles.title}>
                            Placements History
                        </p>
                        <div className={styles.placement_message}>
                            <table className={styles.content_table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.td}>Company Name</th>
                                        <th className={styles.td}>Package</th>
                                        <th className={styles.td}>Offer Accepted</th>
                                        {/* <th className={styles.td}>Team</th> */}
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {placementDetails && placementDetails.map((placement) => {
                                        return (
                                            <>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>{placement.companyname}</td>
                                                    <td className={styles.td}>{placement.packageValue / 12}</td>
                                                    <td className={styles.td}>{placement.offerAccepted ? "Yes" : "No"}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>) : (<>
                <br />
                <br />
                <p>Loading...</p>
            </>)}
        </>
    )
}

export default PlacementHistory