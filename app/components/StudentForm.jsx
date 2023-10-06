import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';

const StudentForm = () => {
    // const router = useRouter();

    const handleStudentCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/student/createstudent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    department: bodyData.department,
                    rollno: bodyData.rollno,
                    role: "student",
                    college: "vrsec"
                })
            })

            console.log("response from /api/student/createstudent");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success("Student Registered Successfully", {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
    }
    return (
        <>
            <form onSubmit={handleStudentCreate}>
                <label>Roll No:</label><br />
                <input
                    type="text"
                    name="rollno"
                    maxLength={10}
                /><br />

                <label>Department:</label><br />
                <select name="department" >
                    <option value="IT">IT</option>
                    <option value="CSE">CSE</option>
                    <option value="MECH">MECH</option>
                    <option value="ECE">ECE</option>
                </select><br />

                <button type="submit">Register Student</button>
            </form>
        </>
    )
}

export default StudentForm