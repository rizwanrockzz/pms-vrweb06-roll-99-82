import React from 'react'
import styles from "./add.module.css"


function page() {
  return (
    <div className={styles.main}>
                <div className={styles.placements}>
                    <p className={styles.title}>
                        Upload Offer Letter
                    </p>
                    <div className={styles.placement_upload}>
                    <form className={styles.form}>
                    <div className={styles.input_field}>
                                <p className={styles.input_name}>Company Name</p>
                                <select id="department" name="department" className={styles.input_entry}>
                                    <option value="CSE">Microsoft</option>
                                    <option value="IT">IT</option>
                                    <option value="ECE">ECE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="EIE">EIE</option>
                                    <option value="CIVIL">CIVIL</option>
                                    {/* Add more department options as needed */}
                                </select>
                            </div>
                            <div className={styles.input_field}>
                                <p className={styles.input_name}>
                                    File Upload
                                </p>
                                <input type='file' name='companyName' placeholder='Company Name' className={styles.input_entry} required />
                            </div>
                            <div className={styles.input_field}>
                                <button type="submit" className={styles.btn}>Upload File</button>
                            </div>
                            </form>
                        
                    </div>
                </div>
            </div>
  )
}

export default page