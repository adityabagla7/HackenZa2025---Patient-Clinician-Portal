import { useState } from 'react'
import {
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaClipboardList,
    FaCog,
    FaFileInvoiceDollar,
    FaHome,
    FaPills,
    FaUser,
    FaUserMd
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  background-color: #2c3e50;
  color: #ecf0f1;
  width: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
  transition: width 0.3s ease;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-x: hidden;
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Logo = styled.div<{ collapsed: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3498db;
  white-space: nowrap;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  
  &:hover {
    color: #3498db;
  }
`

const SidebarMenu = styled.nav`
  margin-top: 1rem;
`

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #ecf0f1;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
  
  &.active {
    background-color: rgba(52, 152, 219, 0.2);
    color: #3498db;
    border-left: 4px solid #3498db;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  font-size: 1.1rem;
`

const ItemText = styled.span<{ collapsed: boolean }>`
  margin-left: 0.75rem;
  white-space: nowrap;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
`

const SectionTitle = styled.div<{ collapsed: boolean }>`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #95a5a6;
  margin: 1.5rem 0 0.5rem 1.5rem;
  white-space: nowrap;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
`

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()
  
  // Navigation items with conditional rendering based on user role
  const navItems = [
    { to: '/dashboard', icon: <FaHome />, text: 'Dashboard', roles: ['admin', 'doctor', 'patient'] },
    { to: '/appointments', icon: <FaCalendarAlt />, text: 'Appointments', roles: ['admin', 'doctor', 'patient'] },
    { to: '/doctors', icon: <FaUserMd />, text: 'Doctors', roles: ['admin', 'patient'] },
    { to: '/patients', icon: <FaUser />, text: 'Patients', roles: ['admin', 'doctor'] },
    { to: '/medical-records', icon: <FaClipboardList />, text: 'Medical Records', roles: ['doctor', 'patient'] },
    { to: '/prescriptions', icon: <FaPills />, text: 'Prescriptions', roles: ['doctor', 'patient'] },
    { to: '/billing', icon: <FaFileInvoiceDollar />, text: 'Billing', roles: ['admin', 'patient'] },
    { to: '/settings', icon: <FaCog />, text: 'Settings', roles: ['admin', 'doctor', 'patient'] },
  ]
  
  // Filter navigation items by user role
  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  )
  
  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader>
        <Logo collapsed={collapsed}>Clinic Portal</Logo>
        <ToggleButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </ToggleButton>
      </SidebarHeader>
      
      <SidebarMenu>
        <SectionTitle collapsed={collapsed}>Main</SectionTitle>
        {filteredNavItems.map((item, index) => (
          <SidebarItem key={index} to={item.to}>
            <IconWrapper>{item.icon}</IconWrapper>
            <ItemText collapsed={collapsed}>{item.text}</ItemText>
          </SidebarItem>
        ))}
      </SidebarMenu>
    </SidebarContainer>
  )
}

export default Sidebar 