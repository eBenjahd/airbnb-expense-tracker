import { NavLink } from "react-router-dom"

interface NavItem {
    label: string
    to: string
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
                    {link.label}
                </NavLink>
            ))}
        </nav>
    </aside>
  )
}

export default SidebarNav
