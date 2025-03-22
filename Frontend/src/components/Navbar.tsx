import { useState } from 'react'
import { FaBell, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 70px;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3182ce;
`

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #3182ce;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  
  &:hover {
    background-color: #f7fafc;
  }
`

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: #2d3748;
`

const UserRole = styled.span`
  font-size: 0.75rem;
  color: #718096;
  text-transform: capitalize;
`

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 200px;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: #4a5568;
  border: none;
  background: none;
  cursor: pointer;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  &:first-child {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
  }
  
  &:last-child {
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e2e8f0;
  margin: 0;
`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  const handleProfile = () => {
    navigate('/profile')
    setMenuOpen(false)
  }
  
  const handleSettings = () => {
    navigate('/settings')
    setMenuOpen(false)
  }
  
  return (
    <NavbarContainer>
      <Logo>Clinic Portal</Logo>
      
      <NavbarRight>
        <IconButton>
          <FaBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        
        <UserMenu onClick={() => setMenuOpen(!menuOpen)}>
          <UserAvatar>
            <FaUser />
          </UserAvatar>
          
          <UserInfo>
            <UserName>{user?.name}</UserName>
            <UserRole>{user?.role}</UserRole>
          </UserInfo>
          
          <Dropdown isOpen={menuOpen}>
            <DropdownItem onClick={handleProfile}>
              <FaUser />
              Profile
            </DropdownItem>
            <DropdownItem onClick={handleSettings}>
              <FaCog />
              Settings
            </DropdownItem>
            <Divider />
            <DropdownItem onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </DropdownItem>
          </Dropdown>
        </UserMenu>
      </NavbarRight>
    </NavbarContainer>
  )
}

export default Navbar 