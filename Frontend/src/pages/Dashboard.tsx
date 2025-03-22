import { FaBell, FaCalendarAlt, FaClipboardList, FaUser, FaUserMd } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const StatIcon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-right: 1rem;
`

const StatContent = styled.div`
  flex: 1;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const DashboardSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ViewAllLink = styled(Link)`
  font-size: 0.875rem;
  color: #3182ce;
  
  &:hover {
    text-decoration: underline;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const AppointmentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`

const AppointmentCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const AppointmentDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3182ce;
  color: white;
  padding: 1rem;
  width: 80px;
`

const AppointmentDay = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`

const AppointmentMonth = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
`

const AppointmentDetails = styled.div`
  padding: 1rem;
  flex: 1;
`

const AppointmentTime = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
`

const AppointmentTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const AppointmentDoctor = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
`

const NotificationCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`

const NotificationIcon = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ type }) => {
    switch (type) {
      case 'appointment':
        return '#3182ce10';
      case 'prescription':
        return '#38a16910';
      case 'billing':
        return '#e53e3e10';
      default:
        return '#718096';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'appointment':
        return '#3182ce';
      case 'prescription':
        return '#38a169';
      case 'billing':
        return '#e53e3e';
      default:
        return '#718096';
    }
  }};
  flex-shrink: 0;
`

const NotificationContent = styled.div`
  flex: 1;
`

const NotificationTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
`

const QuickActionCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const ActionIcon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
  border-radius: 50%;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const ActionTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ActionDescription = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1.5rem;
`

const ActionButton = styled(Link)`
  background-color: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #edf2f7;
    text-decoration: none;
  }
`

const Dashboard = () => {
  const { user } = useAuth()
  
  const renderRoleSpecificContent = () => {
    if (user?.role === 'admin') {
      return (
        <StatsGrid>
          <StatCard>
            <StatIcon color="#3182ce">
              <FaUserMd />
            </StatIcon>
            <StatContent>
              <StatValue>24</StatValue>
              <StatLabel>Total Doctors</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#38a169">
              <FaUser />
            </StatIcon>
            <StatContent>
              <StatValue>312</StatValue>
              <StatLabel>Total Patients</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#e53e3e">
              <FaCalendarAlt />
            </StatIcon>
            <StatContent>
              <StatValue>56</StatValue>
              <StatLabel>Today's Appointments</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#805ad5">
              <FaClipboardList />
            </StatIcon>
            <StatContent>
              <StatValue>87%</StatValue>
              <StatLabel>System Utilization</StatLabel>
            </StatContent>
          </StatCard>
        </StatsGrid>
      )
    }
    
    if (user?.role === 'doctor') {
      return (
        <StatsGrid>
          <StatCard>
            <StatIcon color="#3182ce">
              <FaUser />
            </StatIcon>
            <StatContent>
              <StatValue>42</StatValue>
              <StatLabel>My Patients</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#38a169">
              <FaCalendarAlt />
            </StatIcon>
            <StatContent>
              <StatValue>8</StatValue>
              <StatLabel>Today's Appointments</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#e53e3e">
              <FaClipboardList />
            </StatIcon>
            <StatContent>
              <StatValue>12</StatValue>
              <StatLabel>Pending Reports</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#805ad5">
              <FaBell />
            </StatIcon>
            <StatContent>
              <StatValue>5</StatValue>
              <StatLabel>Unread Notifications</StatLabel>
            </StatContent>
          </StatCard>
        </StatsGrid>
      )
    }
    
    if (user?.role === 'patient') {
      return (
        <StatsGrid>
          <StatCard>
            <StatIcon color="#3182ce">
              <FaCalendarAlt />
            </StatIcon>
            <StatContent>
              <StatValue>3</StatValue>
              <StatLabel>Upcoming Appointments</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#38a169">
              <FaClipboardList />
            </StatIcon>
            <StatContent>
              <StatValue>6</StatValue>
              <StatLabel>Medical Records</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#e53e3e">
              <FaUserMd />
            </StatIcon>
            <StatContent>
              <StatValue>2</StatValue>
              <StatLabel>My Doctors</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon color="#805ad5">
              <FaBell />
            </StatIcon>
            <StatContent>
              <StatValue>3</StatValue>
              <StatLabel>Unread Notifications</StatLabel>
            </StatContent>
          </StatCard>
        </StatsGrid>
      )
    }
    
    return null
  }
  
  return (
    <div>
      <PageTitle>Hello, {user?.name}!</PageTitle>
      
      {renderRoleSpecificContent()}
      
      <DashboardSection>
        <SectionTitle>
          Upcoming Appointments
          <ViewAllLink to="/appointments">View all</ViewAllLink>
        </SectionTitle>
        
        <AppointmentGrid>
          <AppointmentCard>
            <AppointmentDate>
              <AppointmentDay>18</AppointmentDay>
              <AppointmentMonth>Oct</AppointmentMonth>
            </AppointmentDate>
            <AppointmentDetails>
              <AppointmentTime>10:00 AM - 10:30 AM</AppointmentTime>
              <AppointmentTitle>General Checkup</AppointmentTitle>
              <AppointmentDoctor>
                {user?.role === 'doctor' ? 'Patient: John Doe' : 'Dr. Sarah Johnson - Cardiology'}
              </AppointmentDoctor>
            </AppointmentDetails>
          </AppointmentCard>
          
          <AppointmentCard>
            <AppointmentDate>
              <AppointmentDay>23</AppointmentDay>
              <AppointmentMonth>Oct</AppointmentMonth>
            </AppointmentDate>
            <AppointmentDetails>
              <AppointmentTime>2:30 PM - 3:15 PM</AppointmentTime>
              <AppointmentTitle>Follow-up Consultation</AppointmentTitle>
              <AppointmentDoctor>
                {user?.role === 'doctor' ? 'Patient: Jane Smith' : 'Dr. Michael Chen - Neurology'}
              </AppointmentDoctor>
            </AppointmentDetails>
          </AppointmentCard>
        </AppointmentGrid>
      </DashboardSection>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardSection>
            <SectionTitle>Quick Actions</SectionTitle>
            <Grid>
              <QuickActionCard>
                <ActionIcon color="#3182ce">
                  <FaCalendarAlt />
                </ActionIcon>
                <ActionTitle>Schedule Appointment</ActionTitle>
                <ActionDescription>
                  Book a new appointment with your preferred doctor.
                </ActionDescription>
                <ActionButton to="/appointments/new">Schedule Now</ActionButton>
              </QuickActionCard>
              
              <QuickActionCard>
                <ActionIcon color="#38a169">
                  <FaClipboardList />
                </ActionIcon>
                <ActionTitle>
                  {user?.role === 'patient' ? 'View Medical Records' : 'Access Patient Records'}
                </ActionTitle>
                <ActionDescription>
                  {user?.role === 'patient'
                    ? 'Access your complete medical history and test results.'
                    : 'View and update patient medical records and history.'}
                </ActionDescription>
                <ActionButton to="/medical-records">View Records</ActionButton>
              </QuickActionCard>
              
              <QuickActionCard>
                <ActionIcon color="#e53e3e">
                  <FaUserMd />
                </ActionIcon>
                <ActionTitle>
                  {user?.role === 'patient' ? 'Find a Doctor' : 'Update Availability'}
                </ActionTitle>
                <ActionDescription>
                  {user?.role === 'patient'
                    ? 'Search for specialists and healthcare professionals.'
                    : 'Manage your schedule and appointment availability.'}
                </ActionDescription>
                <ActionButton to={user?.role === 'patient' ? '/doctors' : '/settings/availability'}>
                  {user?.role === 'patient' ? 'Find Now' : 'Update'}
                </ActionButton>
              </QuickActionCard>
            </Grid>
          </DashboardSection>
        </div>
        
        <div>
          <DashboardSection>
            <SectionTitle>
              Notifications
              <ViewAllLink to="/notifications">View all</ViewAllLink>
            </SectionTitle>
            
            <NotificationCard>
              <NotificationIcon type="appointment">
                <FaCalendarAlt />
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>Appointment Reminder: Checkup tomorrow at 10:00 AM</NotificationTitle>
                <NotificationTime>2 hours ago</NotificationTime>
              </NotificationContent>
            </NotificationCard>
            
            <NotificationCard>
              <NotificationIcon type="prescription">
                <FaClipboardList />
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>New prescription has been issued</NotificationTitle>
                <NotificationTime>1 day ago</NotificationTime>
              </NotificationContent>
            </NotificationCard>
            
            <NotificationCard>
              <NotificationIcon type="billing">
                <FaClipboardList />
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>Invoice #1234 has been generated</NotificationTitle>
                <NotificationTime>3 days ago</NotificationTime>
              </NotificationContent>
            </NotificationCard>
          </DashboardSection>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 