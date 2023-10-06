'use client'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bodyData = Object.fromEntries(formData); //payload

        console.log("bodyData");
        console.log(bodyData);

        try {
            const res = await fetch('/api/admin/loginadmin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: bodyData.email,
                    password: bodyData.password,
                    role: "admin"
                })
            })

            console.log("response from /api/loginadmin");
            let response = await res.json();
            console.log("response");
            console.log(response);


            if (response.success) {
                toast.success("Admin Login Successfull", {
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
                    router.push("/admin/dashboard");
                }, 2000);
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
            <p>Admin Login Form</p>
            <form onSubmit={handleAdminLogin}>
                <label htmlFor="email">Email</label><br />
                <input type="email" name="email" /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" name="password" />
                <br />
                <input type="submit" value="Login" />
            </form>
        </>
    )
}
