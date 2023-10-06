import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const CoordinatorForm = () => {
    const router = useRouter();

    const handleCoordinatorCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/coordinator/createcoordinator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coordinatorid: bodyData.coordinatorid,
                    firstname: bodyData.firstname,
                    lastname: bodyData.lastname,
                    department: bodyData.department,
                    email: bodyData.email,
                    password: bodyData.password,
                    role: "coordinator",
                    college: "vrsec"
                })
            })

            console.log("response from /api/coordinator/createcoordinator");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success(`${response.department} Coordinator Created Successfully`, {
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
            <form onSubmit={handleCoordinatorCreate}>
                <label>Coordinator ID:</label><br />
                <input
                    type="number"
                    name="coordinatorid"
                    maxLength={6}
                /><br />

                <label>Department:</label><br />
                <select name="department" >
                    <option value="IT">IT</option>
                    <option value="CSE">CSE</option>
                    <option value="MECH">MECH</option>
                    <option value="ECE">ECE</option>
                </select><br />

                <label>First Name:</label><br />
                <input
                    type="text"
                    name="firstname"
                /><br />

                <label>Last Name:</label><br />
                <input
                    type="text"
                    name="lastname"
                /><br />

                <label>Email:</label><br />
                <input
                    type="email"
                    name="email"
                /><br />

                <label>Password:</label><br />
                <input
                    type="password"
                    name="password"
                /><br />

                <button type="submit">Create</button>
            </form>
        </>
    );

}

export default CoordinatorForm