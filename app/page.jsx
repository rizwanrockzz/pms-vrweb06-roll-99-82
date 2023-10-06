'use client'

import Link from "next/link"
import CoordinatorForm from "./components/CoordinatorForm"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import StudentForm from "./components/StudentForm";
import NavBar from "./components/NavBar";
import HomePageComponent from "./components/HomePageComponent";

const Homepge = () => {
  return (
    <>  
      <NavBar />
      <HomePageComponent />
    </>
    // <>
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={4000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //   />
    //   <div>welcome to Homepge</div>
    //   <Link href={'/admin/login'}>Admin Login</Link>
    //   <br />
    //   <Link href={'/admin/register'}>Admin Register</Link>
    //   <br />
    //   <Link href={'/admin/dashboard'}>Admin Dashboard</Link>
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   {/* <CoordinatorForm /> */}
    //   <StudentForm />
    // </>
  )
}

export default Homepge