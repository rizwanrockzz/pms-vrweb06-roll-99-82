'use client'
import React from 'react'
import styles from "./add.module.css"
import { useEffect, useState, useRef } from 'react'
import axios from "axios";

function AddOfferLetter() {
    const [placementDetails, setplacementDetails] = useState();
    const imageInputRef = useRef(null);
    const cloudinaryImage = useRef("");
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

    const [fileUploadData, setfileUploadData] = useState("")
    const handleFileSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        if (cloudinaryImage.fileurl !== "" || cloudinaryImage.current !== "") {
            const fileFormData = new FormData();
            fileFormData.append("file", fileUploadData);
            fileFormData.append("upload_preset", "techathonpmspreset");
            console.log("fileFormData");
            console.log(fileFormData);

            await axios.post(
                "https://api.cloudinary.com/v1_1/techathonpms/image/upload",
                fileFormData
            )
                .then((response) => {
                    console.log("response from cloudinary");
                    console.log(response);
                    // setCloudinaryImage(response.data.secure_url);
                    cloudinaryImage.fileurl = response.data.secure_url;
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            cloudinaryImage.fileurl = "";
        }

        // try {
        //     const res = await fetch('/api/student/updatestudent', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             fname: bodyData.fname,
        //             lname: bodyData.lname,
        //             dob: bodyData.dob,
        //             pod: bodyData.pod,
        //             gender: bodyData.gender,
        //             email: bodyData.email,
        //             phno: bodyData.phno,
        //             password: bodyData.password,
        //             imageurl: cloudinaryImage.fileurl
        //         })
        //     })

        //     console.log("response from /api/student/updatestudent");
        //     let response = await res.json();
        //     console.log("response");
        //     console.log(response);


        //     if (response.success) {
        //         toast.success("Registration Completed", {
        //             position: "top-center",
        //             autoClose: 2500,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //         setTimeout(() => {
        //             router.push('/student/dashboard');
        //         }, 1500);
        //     } else {
        //         toast.error(response.message, {
        //             position: "top-center",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     }
        // } catch (error) {
        //     console.log("error client side create account");
        //     console.log(error);
        //     console.log(error.message);
        // }


    }
    return (
        <>
            {placementDetails ? (<>
                <div className={styles.main}>
                    <div className={styles.placements}>
                        <p className={styles.title}>
                            Upload Offer Letter
                        </p>
                        <div className={styles.placement_upload}>
                            <form className={styles.form} onSubmit={handleFileSubmit}>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>Company Name</p>
                                    <select id="department" name="department" className={styles.input_entry}>
                                        {placementDetails && placementDetails.map((placement, index) => {
                                            return (
                                                <option key={index} value={placement.companyname}>{placement.companyname}</option>
                                            )
                                        })}

                                        {/* <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                                <option value="MECH">MECH</option>
                                <option value="EIE">EIE</option>
                                <option value="CIVIL">CIVIL</option> */}
                                        {/* Add more department options as needed */}
                                    </select>
                                </div>
                                <div className={styles.input_field}>
                                    <p className={styles.input_name}>
                                        File Upload
                                    </p>
                                    <input type='file' name='companyName' placeholder='Company Name' className={styles.input_entry} onChange={(event) => { setfileUploadData(event.target.files[0]); }}
                                        required />
                                </div>
                                <div className={styles.input_field}>
                                    <button type="submit" className={styles.btn}>Upload File</button>
                                </div>
                            </form>

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

export default AddOfferLetter;