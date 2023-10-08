import DashboardNavbar from './dashboardComponents/DashboardNavbar';

import { Golos_Text } from 'next/font/google'

const golosText = Golos_Text({ subsets: ['latin'] })

export const metadata = {
    title: 'Placement Management System',
    description: 'Developed by Rizwanullah & Mahith of VR-WEB-06 Teams',
}
export default function Layout({ children }) {
    return (
        <DashboardNavbar childrencontent={children} />
    );
}
