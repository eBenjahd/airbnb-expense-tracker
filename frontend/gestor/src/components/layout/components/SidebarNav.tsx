import { NavLink } from "react-router-dom"

interface NavItem {
    label: string
    to: string
    icon: string
}

interface SidebarNavProps {
    links: NavItem[]
}


function SidebarNav({links} : SidebarNavProps) {
  return (
    <aside>
        <nav>
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                >
                    <img src={link.icon} alt={link.label} className="w-5 h-5" />
                    <span>{link.label}</span>
                </NavLink>
            ))}
        </nav>
    </aside>
  )
}

export default SidebarNav
