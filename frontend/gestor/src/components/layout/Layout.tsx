import { Outlet } from "react-router-dom"
import SidebarNav from "./components/SidebarNav"

const links = [
  { label: "Dashboard", to: "/" },
  { label: "Expenses", to: "/expenses" },
  { label: "Reports", to: "/reports" },
  { label: "Settings", to: "/settings" },
  { label: "Help", to: "/help" },
]

function Layout() {
  return (
    <div>
      <SidebarNav links={links} />
      <Outlet />
    </div>
  )
}

export default Layout
