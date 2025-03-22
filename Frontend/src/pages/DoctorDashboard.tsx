import { useState } from 'react'
import {
    FaCalendarAlt,
    FaClipboardList,
    FaClock,
    FaEllipsisV,
    FaPills,
    FaPlus,
    FaSearch,
    FaUser
} from 'react-icons/fa'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0;
`

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${({ active }) => (active ? '#3182ce' : '#4a5568')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border: none;
  border-bottom: ${({ active }) => (active ? '2px solid #3182ce' : '2px solid transparent')};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #3182ce;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 0.875rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const TodayScheduleCard = styled(Card)`
  overflow: hidden;
`

const ScheduleHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ScheduleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`

const ScheduleDate = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const AppointmentList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const AppointmentItem = styled.div<{ status?: string }>`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: ${({ status }) => 
    status === 'current' ? '#ebf8ff' : 'white'
  };
  
  &:last-child {
    border-bottom: none;
  }
`

const AppointmentTime = styled.div`
  display: flex;
  align-items: center;
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #718096;
  }
`

const AppointmentPatient = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const AppointmentType = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
`

const AppointmentActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#3182ce';
      case 'secondary':
        return '#718096';
      case 'outline':
        return 'transparent';
      default:
        return '#3182ce';
    }
  }};
  
  color: ${({ variant }) => (variant === 'outline' ? '#3182ce' : 'white')};
  border: ${({ variant }) => (variant === 'outline' ? '1px solid #3182ce' : 'none')};
  
  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return '#2b6cb0';
        case 'secondary':
          return '#4a5568';
        case 'outline':
          return '#ebf8ff';
        default:
          return '#2b6cb0';
      }
    }};
  }
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'checked-in':
        return '#38a16920';
      case 'waiting':
        return '#3182ce20';
      case 'no-show':
        return '#e53e3e20';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'checked-in':
        return '#38a169';
      case 'waiting':
        return '#3182ce';
      case 'no-show':
        return '#e53e3e';
      default:
        return '#a0aec0';
    }
  }};
`

const PatientCard = styled(Card)`
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const PatientAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #4a5568;
  flex-shrink: 0;
`

const PatientInfo = styled.div`
  flex: 1;
`

const PatientName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PatientDetails = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
`

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const TaskCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 1rem;
  cursor: pointer;
`

const TaskContent = styled.div`
  flex: 1;
`

const TaskTitle = styled.div<{ completed: boolean }>`
  font-weight: 500;
  color: ${({ completed }) => (completed ? '#a0aec0' : '#2d3748')};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  margin-bottom: 0.25rem;
`

const TaskMeta = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  
  &:hover {
    background-color: #f7fafc;
    color: #4a5568;
  }
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.75rem;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#3182ce';
      case 'secondary':
        return '#718096';
      case 'outline':
        return 'transparent';
      default:
        return '#3182ce';
    }
  }};
  
  color: ${({ variant }) => (variant === 'outline' ? '#3182ce' : 'white')};
  border: ${({ variant }) => (variant === 'outline' ? '1px solid #3182ce' : 'none')};
  
  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return '#2b6cb0';
        case 'secondary':
          return '#4a5568';
        case 'outline':
          return '#ebf8ff';
        default:
          return '#2b6cb0';
      }
    }};
  }
`

type TabType = 'patients' | 'tasks'

interface Task {
  id: string
  title: string
  patient: string
  due: string
  completed: boolean
}

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('patients')
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review blood test results for John Smith',
      patient: 'John Smith',
      due: 'Today',
      completed: false,
    },
    {
      id: '2',
      title: 'Write prescription for Jane Doe',
      patient: 'Jane Doe',
      due: 'Today',
      completed: false,
    },
    {
      id: '3',
      title: 'Finalize medical report for Robert Johnson',
      patient: 'Robert Johnson',
      due: 'Tomorrow',
      completed: false,
    },
    {
      id: '4',
      title: 'Call pharmacy about Michael Brown medication',
      patient: 'Michael Brown',
      due: '2 days ago',
      completed: true,
    },
  ])
  
  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }
  
  return (
    <div>
      <PageTitle>Doctor Dashboard</PageTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon color="#3182ce">
            <FaCalendarAlt />
          </StatIcon>
          <StatContent>
            <StatValue>8</StatValue>
            <StatLabel>Today's Appointments</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#38a169">
            <FaUser />
          </StatIcon>
          <StatContent>
            <StatValue>3</StatValue>
            <StatLabel>New Patients</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#e53e3e">
            <FaClipboardList />
          </StatIcon>
          <StatContent>
            <StatValue>5</StatValue>
            <StatLabel>Pending Reports</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#805ad5">
            <FaPills />
          </StatIcon>
          <StatContent>
            <StatValue>12</StatValue>
            <StatLabel>Prescriptions</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Section>
            <TodayScheduleCard>
              <ScheduleHeader>
                <ScheduleTitle>Today's Schedule</ScheduleTitle>
                <ScheduleDate>October 18, 2023</ScheduleDate>
              </ScheduleHeader>
              
              <AppointmentList>
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    8:00 AM - 8:30 AM
                  </AppointmentTime>
                  <AppointmentPatient>
                    Emily Wilson
                    <StatusBadge status="checked-in">Checked In</StatusBadge>
                  </AppointmentPatient>
                  <AppointmentType>Annual Physical Examination</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="primary">Start Session</ActionButton>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem status="current">
                  <AppointmentTime>
                    <FaClock />
                    9:00 AM - 9:30 AM (Current)
                  </AppointmentTime>
                  <AppointmentPatient>
                    John Smith
                    <StatusBadge status="checked-in">Checked In</StatusBadge>
                  </AppointmentPatient>
                  <AppointmentType>Follow-up Consultation</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="primary">Start Session</ActionButton>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    10:00 AM - 10:30 AM
                  </AppointmentTime>
                  <AppointmentPatient>
                    Sarah Johnson
                    <StatusBadge status="waiting">Waiting</StatusBadge>
                  </AppointmentPatient>
                  <AppointmentType>Diabetes Management</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    11:00 AM - 11:30 AM
                  </AppointmentTime>
                  <AppointmentPatient>
                    Robert Davis
                    <StatusBadge status="no-show">No Show</StatusBadge>
                  </AppointmentPatient>
                  <AppointmentType>Blood Pressure Check</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="outline">View Records</ActionButton>
                    <ActionButton variant="secondary">Reschedule</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    1:00 PM - 1:30 PM
                  </AppointmentTime>
                  <AppointmentPatient>
                    Michael Brown
                  </AppointmentPatient>
                  <AppointmentType>New Patient Consultation</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    2:00 PM - 2:30 PM
                  </AppointmentTime>
                  <AppointmentPatient>
                    Lisa Anderson
                  </AppointmentPatient>
                  <AppointmentType>Medication Review</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    3:00 PM - 3:30 PM
                  </AppointmentTime>
                  <AppointmentPatient>
                    David Thompson
                  </AppointmentPatient>
                  <AppointmentType>Chronic Pain Management</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
                
                <AppointmentItem>
                  <AppointmentTime>
                    <FaClock />
                    4:00 PM - 4:30 PM
                  </AppointmentTime>
                  <AppointmentPatient>
                    Jennifer White
                  </AppointmentPatient>
                  <AppointmentType>Post-Surgery Follow-up</AppointmentType>
                  <AppointmentActions>
                    <ActionButton variant="outline">View Records</ActionButton>
                  </AppointmentActions>
                </AppointmentItem>
              </AppointmentList>
            </TodayScheduleCard>
          </Section>
        </div>
        
        <div>
          <Section>
            <SectionHeader>
              <TabsContainer>
                <Tab 
                  active={activeTab === 'patients'} 
                  onClick={() => setActiveTab('patients')}
                >
                  Recent Patients
                </Tab>
                <Tab 
                  active={activeTab === 'tasks'} 
                  onClick={() => setActiveTab('tasks')}
                >
                  Tasks
                </Tab>
              </TabsContainer>
              
              <SearchContainer>
                <SearchIcon>
                  <FaSearch />
                </SearchIcon>
                <SearchInput placeholder="Search..." />
              </SearchContainer>
            </SectionHeader>
            
            {activeTab === 'patients' && (
              <div>
                <Grid>
                  <PatientCard>
                    <PatientAvatar>
                      <FaUser />
                    </PatientAvatar>
                    <PatientInfo>
                      <PatientName>
                        John Smith
                        <MenuButton>
                          <FaEllipsisV />
                        </MenuButton>
                      </PatientName>
                      <PatientDetails>
                        Last Visit: October 18, 2023
                      </PatientDetails>
                      <PatientDetails>
                        Diagnosis: Hypertension, Type 2 Diabetes
                      </PatientDetails>
                      <ActionButton variant="outline">
                        View Records
                      </ActionButton>
                    </PatientInfo>
                  </PatientCard>
                  
                  <PatientCard>
                    <PatientAvatar>
                      <FaUser />
                    </PatientAvatar>
                    <PatientInfo>
                      <PatientName>
                        Sarah Johnson
                        <MenuButton>
                          <FaEllipsisV />
                        </MenuButton>
                      </PatientName>
                      <PatientDetails>
                        Last Visit: October 16, 2023
                      </PatientDetails>
                      <PatientDetails>
                        Diagnosis: Gestational Diabetes
                      </PatientDetails>
                      <ActionButton variant="outline">
                        View Records
                      </ActionButton>
                    </PatientInfo>
                  </PatientCard>
                  
                  <PatientCard>
                    <PatientAvatar>
                      <FaUser />
                    </PatientAvatar>
                    <PatientInfo>
                      <PatientName>
                        Emily Wilson
                        <MenuButton>
                          <FaEllipsisV />
                        </MenuButton>
                      </PatientName>
                      <PatientDetails>
                        Last Visit: October 15, 2023
                      </PatientDetails>
                      <PatientDetails>
                        Diagnosis: Migraine, Anxiety
                      </PatientDetails>
                      <ActionButton variant="outline">
                        View Records
                      </ActionButton>
                    </PatientInfo>
                  </PatientCard>
                </Grid>
                
                <ButtonRow>
                  <Button variant="primary">
                    <FaPlus />
                    Add New Patient
                  </Button>
                </ButtonRow>
              </div>
            )}
            
            {activeTab === 'tasks' && (
              <Card>
                {tasks.map(task => (
                  <TaskItem key={task.id}>
                    <TaskCheckbox 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    <TaskContent>
                      <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
                      <TaskMeta>
                        {task.patient} • Due {task.due}
                      </TaskMeta>
                    </TaskContent>
                    <MenuButton>
                      <FaEllipsisV />
                    </MenuButton>
                  </TaskItem>
                ))}
                
                <ButtonRow style={{ padding: '1rem' }}>
                  <Button variant="outline">
                    <FaPlus />
                    Add Task
                  </Button>
                </ButtonRow>
              </Card>
            )}
          </Section>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard 