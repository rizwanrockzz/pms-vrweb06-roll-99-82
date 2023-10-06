"use client";
import React, { useState, useRef, useEffect } from "react";
import Styles from "./CreateAccountForm.module.css";
import Image from "next/image";
import axios from "axios";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@gsebdev/react-simple-datepicker';

const CreateAccountForm = () => {
    const router = useRouter();
    const [imageUploadData, setimageUploadData] = useState("")
    const imageInputRef = useRef(null);
    const cloudinaryImage = useRef("");

    const handleImageUploadClick = () => {
        imageInputRef.current.click();
    };

    // const handleImageChange = (event) => {
    //     const fileUploaded = event.target.files[0];
    //     console.log(event.target.files);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        if (bodyData.password === bodyData.confirmpassword) {
            if (cloudinaryImage.imgurl !== "" || cloudinaryImage.current !== "") {
                const imgFormData = new FormData();
                imgFormData.append("file", imageUploadData);
                imgFormData.append("upload_preset", "techathonpmspreset");
                console.log("imgFormData");
                console.log(imgFormData);

                await axios.post(
                    "https://api.cloudinary.com/v1_1/techathonpms/image/upload",
                    imgFormData
                )
                    .then((response) => {
                        console.log("response from cloudinary");
                        console.log(response);
                        // setCloudinaryImage(response.data.secure_url);
                        cloudinaryImage.imgurl = response.data.secure_url;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                cloudinaryImage.imgurl = "";
            }

            try {
                const res = await fetch('/api/student/updatestudent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fname: bodyData.fname,
                        lname: bodyData.lname,
                        dob: bodyData.dob,
                        pod: bodyData.pod,
                        gender: bodyData.gender,
                        email: bodyData.email,
                        phno: bodyData.phno,
                        password: bodyData.password,
                        imageurl: cloudinaryImage.imgurl
                    })
                })

                console.log("response from /api/student/updatestudent");
                let response = await res.json();
                console.log("response");
                console.log(response);


                if (response.success) {
                    toast.success("Registration Completed", {
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
                        router.push('/student/dashboard');
                    }, 1500);
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
        }else{
            toast.error("Password & Confirm Password Should be same", {
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
            <div className={Styles.container}>
                <div className={Styles.imageSection}>
                    <Image
                        src="/students_09.svg"
                        alt="Students Big Picture"
                        className={Styles.bigPicture}
                        width={100}
                        height={100}
                    />
                </div>

                <div className={Styles.formSection}>
                    <h1 className={Styles.css123}>Create account</h1>

                    <form className={Styles.form} onSubmit={handleSubmit}>
                        <div className={Styles.field}>
                            <label htmlFor="name">First Name</label>
                            <input type="text" name="fname" placeholder="First Name" />
                        </div>
                        <div className={Styles.field}>
                            <label htmlFor="name">Last Name</label>
                            <input type="text" name="lname" placeholder="Last Name" />
                        </div>
                        <div className={Styles.fields_Dob}>
                            <label htmlFor="dob">Date Of Birth</label>
                            <div className={Styles.dateOfBirthButton}>
                                <DatePicker
                                    id="datepicker"
                                    name="dob"
                                    placeholder="DD/MM/YY"
                                    value={"01/02/2023"}
                                />
                                <Icon
                                    icon="uil:calender"
                                    height={30}
                                    className={`${Styles.icon_btn} ${Styles.icon_btn_1}`}
                                />
                            </div>
                        </div>

                        <div className={Styles.fields_Dob}>
                            <label htmlFor="pod">Pass Out Date</label>
                            <div className={Styles.dateOfBirthButton}>
                                <DatePicker
                                    id="datepickerpod"
                                    name="pod"
                                    placeholder="DD/MM/YY"
                                    value={"01/02/2023"}
                                />
                                <Icon
                                    icon="uil:calender"
                                    height={30}
                                    className={`${Styles.icon_btn} ${Styles.icon_btn_1}`}
                                />
                            </div>
                        </div>


                        <div className={Styles.field}>
                            <label htmlFor="gender">Gender </label>
                            <div className={Styles.genderOptions}>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                />
                                <label htmlFor="male">Male</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                />
                                <label htmlFor="female">Female</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    value="other"
                                />
                                <label htmlFor="other">Others</label>
                            </div>
                        </div>
                        <div className={Styles.emailField}>

                            <input type="email" name="email" placeholder="Email" required />
                            <Icon
                                icon="ic:round-email"
                                className={Styles.icon_btn}
                                height={30}
                            />
                        </div>
                        <div className={Styles.emailField}>

                            <input type="text" name="phno" placeholder="Phone Number" required maxLength={10} />
                            <Icon
                                icon="ic:round-phone"
                                className={Styles.icon_btn}
                                height={30}
                            />
                        </div>
                        <div className={Styles.emailField}>

                            <input type="password" name="password" placeholder="Password" required />
                            <Icon
                                icon="mdi:password"
                                className={Styles.icon_btn}
                                height={30}
                            />
                        </div>
                        <div className={Styles.emailField}>

                            <input type="password" id="email" name="confirmpassword" placeholder="Confirm Password" required />
                            <Icon
                                icon="mdi:password-check"
                                className={Styles.icon_btn}
                                height={30}
                            />
                        </div>

                        <div className={Styles.fieldimage}>
                            <div className={Styles.uploadButton}>
                                <button type="button" onClick={handleImageUploadClick}>
                                    <Icon icon="mdi:camera" height={30} color="#363A3D" />
                                    <p>Add Image</p>
                                </button>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(event) => { setimageUploadData(event.target.files[0]); }}
                                    ref={imageInputRef}
                                />
                            </div>
                            <Image src="/students_09.svg" width={80} height={50} className={Styles.round} alt="StudentsLogo" />
                        </div>
                        <div className={Styles.submitButton}>
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateAccountForm;


// import Navbar from "../../components/Navbar"
// import CreateAccountForm from "@/app/components/CreateAccountForm"

// export default function CreateAccount() {
//     return (
//         <>
//             <Navbar />
//             <CreateAccountForm />
//         </>
//     )
// }


// const handleImageChange = (event) => {
//     const selectedFile = event.target;
//     console.log(selectedFile);
//     // const selectedFile = event.target.files[0];
//     // Do something with the selected file, e.g., upload it

//     // edhi backend code !
//     // const formData = new FormData();
//     // formData.append('image', selectedFile);

//     // fetch('/upload-endpoint', {
//     //   method: 'POST',
//     //   body: formData
//     // })
//     //   .then(response => {
//     //     // Handle the server response
//     //     if (response.ok) {
//     //       // File upload successful
//     //       alert('1 photo uploaded');
//     //     } else {
//     //       // File upload failed
//     //       alert('Failed to upload photo');
//     //     }
//     //   })
//     //   .catch(error => {
//     //     // Handle any error during the upload
//     //     console.error('Error uploading photo:', error);
//     //     alert('Error uploading photo');
//     //   });
// };