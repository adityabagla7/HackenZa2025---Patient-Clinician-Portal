import React, { useState } from 'react';
import {
    FaBell,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaIdCard,
    FaLock,
    FaMobile,
    FaPencilAlt,
    FaSave,
    FaShieldAlt,
    FaTimes,
    FaUser
} from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageTitle = styled.h1`
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const PageSubtitle = styled.p`
  margin-bottom: 2rem;
  color: #718096;
  font-size: 1rem;
`;

const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ active: boolean }>`
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ active }) => active ? '#3182ce' : '#4a5568'};
  background-color: ${({ active }) => active ? '#ebf8ff' : 'transparent'};
  border-left: ${({ active }) => active ? '3px solid #3182ce' : '3px solid transparent'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ active }) => active ? '#ebf8ff' : '#f7fafc'};
    color: ${({ active }) => active ? '#3182ce' : '#2d3748'};
  }
  
  svg {
    color: ${({ active }) => active ? '#3182ce' : '#718096'};
  }
`;

const MenuItemText = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
`;

const ContentSection = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
  
  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ primary }) => primary ? '#3182ce' : 'white'};
  color: ${({ primary }) => primary ? 'white' : '#4a5568'};
  border: ${({ primary }) => primary ? 'none' : '1px solid #e2e8f0'};
  
  &:hover {
    background-color: ${({ primary }) => primary ? '#2b6cb0' : '#f7fafc'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 48px;
  height: 24px;
`;

const Slider = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked }) => checked ? '#3182ce' : '#cbd5e0'};
  border-radius: 34px;
  transition: 0.4s;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
    transform: translateX(${({ checked }) => checked ? '24px' : '0'});
  }
`;

const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarEdit = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
`;

const UserName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
`;

const UserRole = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
`;

const NotificationItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const NotificationLabel = styled.div`
  font-weight: 500;
  color: #4a5568;
`;

const NotificationDescription = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
`;

interface SettingsMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Settings: React.FC = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  
  // State for active menu item
  const [activeMenu, setActiveMenu] = useState<string>('profile');
  
  // State for form values
  const [firstName, setFirstName] = useState<string>(user?.firstName || 'John');
  const [lastName, setLastName] = useState<string>(user?.lastName || 'Doe');
  const [email, setEmail] = useState<string>(user?.email || 'john.doe@example.com');
  const [phone, setPhone] = useState<string>(user?.phone || '(123) 456-7890');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for password fields
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  // State for notification preferences
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [appointmentReminders, setAppointmentReminders] = useState<boolean>(true);
  const [medicationReminders, setMedicationReminders] = useState<boolean>(true);
  const [newMessageAlerts, setNewMessageAlerts] = useState<boolean>(true);
  
  // Menu items
  const menuItems: SettingsMenuItem[] = [
    { id: 'profile', label: 'Profile Information', icon: <FaUser size={16} /> },
    { id: 'security', label: 'Password & Security', icon: <FaLock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell size={16} /> },
    { id: 'privacy', label: 'Privacy & Data', icon: <FaShieldAlt size={16} /> }
  ];
  
  // Handle form submission for profile information
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, you would send the updated profile information to an API here
    console.log('Profile updated:', { firstName, lastName, email, phone });
  };
  
  // Handle form submission for password change
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // In a real app, you would send the password change request to an API here
    console.log('Password changed');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return (
          <>
            <SectionTitle>Profile Information</SectionTitle>
            <ProfileCard>
              <ProfileAvatar>
                <Avatar src={user?.avatar || "https://via.placeholder.com/100"} alt="Profile" />
                <AvatarEdit>
                  <FaPencilAlt size={12} style={{ marginRight: '0.25rem' }} />
                  Edit
                </AvatarEdit>
              </ProfileAvatar>
              <UserName>{firstName} {lastName}</UserName>
              <UserRole>{isDoctor ? 'Doctor' : 'Patient'}</UserRole>
            </ProfileCard>
            
            <form onSubmit={handleProfileSubmit}>
              <FormRow>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <FormInput
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <FormInput
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
              
              {isDoctor && (
                <>
                  <FormGroup>
                    <FormLabel>Specialization</FormLabel>
                    <FormInput
                      type="text"
                      value="Cardiology"
                      disabled={!isEditing}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Medical License Number</FormLabel>
                    <FormInput
                      type="text"
                      value="ML12345678"
                      disabled={!isEditing}
                    />
                  </FormGroup>
                </>
              )}
              
              <ButtonGroup>
                {isEditing ? (
                  <>
                    <Button primary type="submit">
                      <FaSave size={16} />
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>
                      <FaTimes size={16} />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <FaPencilAlt size={16} />
                    Edit Profile
                  </Button>
                )}
              </ButtonGroup>
            </form>
          </>
        );
        
      case 'security':
        return (
          <>
            <SectionTitle>Password & Security</SectionTitle>
            <form onSubmit={handlePasswordSubmit}>
              <FormGroup>
                <FormLabel>Current Password</FormLabel>
                <PasswordInputContainer>
                  <FormInput
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </PasswordInputContainer>
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>New Password</FormLabel>
                  <PasswordInputContainer>
                    <FormInput
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </PasswordToggle>
                  </PasswordInputContainer>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Confirm New Password</FormLabel>
                  <PasswordInputContainer>
                    <FormInput
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </PasswordToggle>
                  </PasswordInputContainer>
                </FormGroup>
              </FormRow>
              
              <SectionTitle>Two-Factor Authentication</SectionTitle>
              <FormGroup>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput type="checkbox" />
                    <Slider checked={false} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568' }}>Enable Two-Factor Authentication</div>
                    <div style={{ fontSize: '0.875rem', color: '#718096', marginTop: '0.25rem' }}>
                      Add an extra layer of security to your account
                    </div>
                  </div>
                </ToggleSwitch>
              </FormGroup>
              
              <SectionTitle>Connected Devices</SectionTitle>
              <div style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Devices that are currently logged into your account
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 500, color: '#4a5568' }}>Chrome on Windows</div>
                <div style={{ fontSize: '0.875rem', color: '#718096', marginTop: '0.25rem' }}>
                  Last active: Just now • Current session
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '0.5rem' }}>
                <div style={{ fontWeight: 500, color: '#4a5568' }}>Safari on iPhone</div>
                <div style={{ fontSize: '0.875rem', color: '#718096', marginTop: '0.25rem' }}>
                  Last active: Yesterday at 3:15 PM
                </div>
              </div>
              
              <ButtonGroup>
                <Button primary type="submit">
                  <FaLock size={16} />
                  Update Password
                </Button>
              </ButtonGroup>
            </form>
          </>
        );
        
      case 'notifications':
        return (
          <>
            <SectionTitle>Notification Preferences</SectionTitle>
            
            <FormGroup>
              <NotificationTitle>
                <NotificationLabel>Notification Channels</NotificationLabel>
              </NotificationTitle>
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <Slider checked={emailNotifications} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaEnvelope />
                      Email Notifications
                    </div>
                    <NotificationDescription>
                      Receive notifications via email
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
              
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={smsNotifications}
                      onChange={() => setSmsNotifications(!smsNotifications)}
                    />
                    <Slider checked={smsNotifications} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaMobile />
                      SMS Notifications
                    </div>
                    <NotificationDescription>
                      Receive notifications via text message
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
            </FormGroup>
            
            <SectionTitle>Notification Types</SectionTitle>
            
            <FormGroup>
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={appointmentReminders}
                      onChange={() => setAppointmentReminders(!appointmentReminders)}
                    />
                    <Slider checked={appointmentReminders} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568' }}>
                      Appointment Reminders
                    </div>
                    <NotificationDescription>
                      Receive reminders before upcoming appointments
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
              
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={medicationReminders}
                      onChange={() => setMedicationReminders(!medicationReminders)}
                    />
                    <Slider checked={medicationReminders} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568' }}>
                      Medication Reminders
                    </div>
                    <NotificationDescription>
                      Receive reminders to take your medication
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
              
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={newMessageAlerts}
                      onChange={() => setNewMessageAlerts(!newMessageAlerts)}
                    />
                    <Slider checked={newMessageAlerts} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568' }}>
                      New Message Alerts
                    </div>
                    <NotificationDescription>
                      Receive alerts when you get a new message
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
            </FormGroup>
            
            <ButtonGroup>
              <Button primary>
                <FaSave size={16} />
                Save Preferences
              </Button>
            </ButtonGroup>
          </>
        );
        
      case 'privacy':
        return (
          <>
            <SectionTitle>Privacy & Data Settings</SectionTitle>
            
            <FormGroup>
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={true}
                    />
                    <Slider checked={true} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568' }}>
                      Data Sharing for Healthcare Providers
                    </div>
                    <NotificationDescription>
                      Allow your healthcare providers to access your medical data
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
              
              <NotificationItem>
                <ToggleSwitch>
                  <Switch>
                    <HiddenInput 
                      type="checkbox" 
                      checked={false}
                    />
                    <Slider checked={false} />
                  </Switch>
                  <div>
                    <div style={{ fontWeight: 500, color: '#4a5568' }}>
                      Data Usage for Research
                    </div>
                    <NotificationDescription>
                      Allow anonymized data to be used for medical research
                    </NotificationDescription>
                  </div>
                </ToggleSwitch>
              </NotificationItem>
            </FormGroup>
            
            <SectionTitle>Data Export</SectionTitle>
            <div style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Download a copy of your personal data
            </div>
            
            <ButtonGroup>
              <Button>
                <FaIdCard size={16} />
                Export Personal Data
              </Button>
              <Button>
                <FaIdCard size={16} />
                Export Medical Records
              </Button>
            </ButtonGroup>
            
            <SectionTitle>Account Deletion</SectionTitle>
            <div style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Permanently delete your account and all associated data
            </div>
            
            <Button style={{ color: '#e53e3e', borderColor: '#e53e3e' }}>
              Delete My Account
            </Button>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <PageTitle>Account Settings</PageTitle>
      <PageSubtitle>Manage your account preferences and personal information</PageSubtitle>
      
      <SettingsContainer>
        <Sidebar>
          <MenuList>
            {menuItems.map(item => (
              <MenuItem 
                key={item.id}
                active={activeMenu === item.id}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.icon}
                <MenuItemText>{item.label}</MenuItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Sidebar>
        
        <ContentSection>
          {renderContent()}
        </ContentSection>
      </SettingsContainer>
    </div>
  );
};

export default Settings; 