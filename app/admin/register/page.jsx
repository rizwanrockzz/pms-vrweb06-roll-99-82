'use client'
import Image from 'next/image'
// import styles from './page.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function AdminRegister() {

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bodyData = Object.fromEntries(formData); //payload

    console.log("bodyData");
    console.log(bodyData);

    try {
      const res = await fetch('/api/admin/createadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: bodyData.fname,
          lname: bodyData.lname,
          email: bodyData.email,
          password: bodyData.password,
          role: "admin",
          college: "vrsec"
        })
      })

      console.log("response from /api/createadmin");
      let response = await res.json();
      console.log("response");
      console.log(response);


      if (response.success) {
        toast.success("Admin Registration Completed", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setTimeout(() => {
        //   router.push("/dashboard");
        // }, 2000);
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
      <p>Admin Creation Form</p>
      <form onSubmit={handleAdminSubmit}>
        <label htmlFor="fname">First name:</label><br />
        <input type="text" name="fname" /><br />
        <label htmlFor="lname">Last name:</label><br />
        <input type="text" name="lname" /><br />
        <label htmlFor="email">Email</label><br />
        <input type="email" name="email" /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" name="password" />
        <br />
        <input type="submit" value="Register" />
      </form>
    </>
  )
}
