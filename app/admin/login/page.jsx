'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function Home() {
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
      <div className={styles.main_hero}>
        <div className={styles.main_left}>

          <div className={styles.text}>
            <Image src="/logo.png" width={100} height={100} alt='main-college-logo' />
            <p className={styles.txt}>LogIn to Administrator</p>
            <form onSubmit={handleAdminLogin}>
              <div className={styles.main_form}>
                <div className={styles.input_field}>
                  <p className={styles.input_name}>
                    Email/Id
                  </p>
                  <input type='email' placeholder='Email/id' className={styles.input_entry} name='email' />
                </div>
                <div className={styles.input_field}>
                  <p className={styles.input_name}>
                    Password
                  </p>
                  <input type='password' placeholder='Password' className={styles.input_entry} name='password' />
                </div>
                <Link href="#" className={styles.input_forget}>
                  Forget Password
                </Link>
                <div>
                  <button type='submit' className={styles.btn}>Login</button>
                </div>
                <p className={styles.txt_1}>If you are new to the portal,Contact Administrator</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
