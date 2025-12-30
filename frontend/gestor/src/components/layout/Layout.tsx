import { Outlet } from "react-router-dom"
import SidebarNav from "./components/SidebarNav"
import DashboardIcon from '../../assets/icons/dashboard.svg'
import ExpenseIcon from '../../assets/icons/expense.svg'
import ReportIcon from '../../assets/icons/reports.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import HelpIcon from '../../assets/icons/help.svg'

const links = [
  { label: "Dashboard", to: "/", icon : DashboardIcon },
  { label: "Expenses", to: "/expenses", icon : ExpenseIcon },
  { label: "Reports", to: "/reports", icon : ReportIcon },
  { label: "Settings", to: "/settings", icon : SettingsIcon },
  { label: "Help", to: "/help", icon : HelpIcon },
]

function Layout() {
  return (
    <>
      <SidebarNav links={links} />
      <Outlet />
    </>
  )
}

export default Layout
