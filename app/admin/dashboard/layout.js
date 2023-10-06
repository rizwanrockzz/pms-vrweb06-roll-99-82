import DashboardNavbar from './dashboardComponents/DashboardNavbar';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Golos_Text } from 'next/font/google'

const golosText = Golos_Text({ subsets: ['latin'] })

export const metadata = {
    title: 'Placement Management System',
    description: 'Developed by Rizwanullah & Mahith of VR-WEB-06 Teams',
}
export default function Layout({ children }) {
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
            <DashboardNavbar childrencontent={children} />
        </>
    );
}
