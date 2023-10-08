'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AdminDashboard = () => {
  const router = useRouter();
  const [adminDetails, setadminDetails] = useState();
  useEffect(() => {
    const getAdminDetails = async () => {
      const calladmindata = await fetch('/api/admin/getadmin');
      const admindatajson = await calladmindata.json();

      console.log("admindata")
      console.log(admindatajson)
      setadminDetails(admindatajson.admindata);
    }

    getAdminDetails();
  }, [])
  return (
    <>
      <div>Welcome to Admin Dashboard</div>
      {adminDetails && (
        <>
          <p>Name : {`${adminDetails.firstname} ${adminDetails.lastname}`}</p>
          <p>Email : {adminDetails.email}</p>
          <p>Role : {adminDetails.role}</p>
        </>
      )}
    </>
  )
}

export default AdminDashboard