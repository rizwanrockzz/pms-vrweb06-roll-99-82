'use client'

import Link from "next/link"

const Homepge = () => {
  return (
    <>
        <div>welcome to Homepge</div>
        <Link href={'/admin/login'}>Admin Login</Link>
        <br />
        <Link href={'/admin/register'}>Admin Register</Link>
        <br />
        <Link href={'/admin/dashboard'}>Admin Dashboard</Link>
    </>
  )
}

export default Homepge