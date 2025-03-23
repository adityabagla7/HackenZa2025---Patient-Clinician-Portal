import React, { useState } from 'react';
import { FaCalendarAlt, FaCheck, FaClock, FaUser, FaUserMd } from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: white;
  border-radius: 0.5rem 0.5rem 0 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  color: ${({ active }) => (active ? '#3182ce' : '#4a5568')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border: none;
  border-bottom: ${({ active }) => (active ? '2px solid #3182ce' : '2px solid transparent')};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  
  &:hover {
    color: #3182ce;
    background-color: ${({ active }) => (active ? 'white' : '#f7fafc')};
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const AppointmentIcon = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce10';
      case 'pending':
        return '#ed8a1910';
      case 'completed':
        return '#38a16910';
      case 'canceled':
        return '#e53e3e10';
      default:
        return '#3182ce10';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce';
      case 'pending':
        return '#ed8a19';
      case 'completed':
        return '#38a169';
      case 'canceled':
        return '#e53e3e';
      default:
        return '#3182ce';
    }
  }};
`;

const AppointmentContent = styled.div`
  flex: 1;
`;

const AppointmentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const AppointmentDetails = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const Detail = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #718096;
  }
`;

const Status = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce20';
      case 'pending':
        return '#ed8a1920';
      case 'completed':
        return '#38a16920';
      case 'canceled':
        return '#e53e3e20';
      default:
        return '#3182ce20';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce';
      case 'pending':
        return '#ed8a19';
      case 'completed':
        return '#38a169';
      case 'canceled':
        return '#e53e3e';
      default:
        return '#3182ce';
    }
  }};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.5rem 1rem;
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #a0aec0;
`;

interface Appointment {
  id: string;
  title: string;
  doctorName?: string;
  patientName?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'pending' | 'completed' | 'canceled';
}

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  // Mock data - in a real app this would come from an API
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      title: 'General Checkup',
      doctorName: 'Dr. Sarah Johnson',
      patientName: 'John Smith',
      date: 'Oct 15, 2023',
      time: '10:00 AM',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Follow-up Consultation',
      doctorName: 'Dr. Michael Brown',
      patientName: 'Emma Wilson',
      date: 'Oct 18, 2023',
      time: '2:30 PM',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Blood Test Results',
      doctorName: 'Dr. Robert Davis',
      patientName: 'John Smith',
      date: 'Oct 5, 2023',
      time: '9:15 AM',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Dental Checkup',
      doctorName: 'Dr. Lisa White',
      patientName: 'Emma Wilson',
      date: 'Sep 28, 2023',
      time: '11:00 AM',
      status: 'canceled'
    }
  ];
  
  // Filter appointments based on active tab and user role
  const filteredAppointments = mockAppointments.filter(appointment => {
    // Filter by tab (upcoming vs past)
    const isUpcoming = appointment.status === 'upcoming' || appointment.status === 'pending';
    const isPast = appointment.status === 'completed' || appointment.status === 'canceled';
    
    if ((activeTab === 'upcoming' && !isUpcoming) || (activeTab === 'past' && !isPast)) {
      return false;
    }
    
    // Filter by user role (patient sees only their appointments, doctor sees only their patients)
    if (user?.role === 'patient') {
      return appointment.patientName === user.name;
    } else if (user?.role === 'doctor') {
      return appointment.doctorName === user.name;
    }
    
    // Admin sees all appointments
    return true;
  });
  
  const renderAppointmentActions = (appointment: Appointment) => {
    if (appointment.status === 'upcoming') {
      if (user?.role === 'patient') {
        return (
          <ButtonGroup>
            <Button variant="outline">Reschedule</Button>
            <Button variant="secondary">Cancel</Button>
          </ButtonGroup>
        );
      } else if (user?.role === 'doctor') {
        return (
          <ButtonGroup>
            <Button variant="primary">
              <FaCheck size={12} /> Start
            </Button>
            <Button variant="outline">Reschedule</Button>
          </ButtonGroup>
        );
      }
    } else if (appointment.status === 'completed' && user?.role === 'doctor') {
      return (
        <Button variant="outline">View Notes</Button>
      );
    }
    
    return null;
  };
  
  return (
    <div>
      <PageTitle>Appointments</PageTitle>
      
      <TabsContainer>
        <Tab active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')}>
          Upcoming Appointments
        </Tab>
        <Tab active={activeTab === 'past'} onClick={() => setActiveTab('past')}>
          Past Appointments
        </Tab>
      </TabsContainer>
      
      <Section>
        {filteredAppointments.length > 0 ? (
          <Grid>
            {filteredAppointments.map(appointment => (
              <Card key={appointment.id}>
                <AppointmentIcon status={appointment.status}>
                  <FaCalendarAlt />
                </AppointmentIcon>
                <AppointmentContent>
                  <AppointmentTitle>{appointment.title}</AppointmentTitle>
                  <AppointmentDetails>
                    {user?.role === 'patient' && (
                      <Detail>
                        <FaUserMd />
                        {appointment.doctorName}
                      </Detail>
                    )}
                    {user?.role === 'doctor' && (
                      <Detail>
                        <FaUser />
                        {appointment.patientName}
                      </Detail>
                    )}
                    <Detail>
                      <FaCalendarAlt />
                      {appointment.date}
                    </Detail>
                    <Detail>
                      <FaClock />
                      {appointment.time}
                    </Detail>
                  </AppointmentDetails>
                  <Status status={appointment.status}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Status>
                  
                  {renderAppointmentActions(appointment)}
                </AppointmentContent>
              </Card>
            ))}
          </Grid>
        ) : (
          <EmptyState>
            <FaCalendarAlt size={48} style={{ marginBottom: '1rem' }} />
            <h3>No {activeTab} appointments found</h3>
            {activeTab === 'upcoming' && (
              <p>You don't have any upcoming appointments scheduled.</p>
            )}
            {activeTab === 'past' && (
              <p>You don't have any past appointment history.</p>
            )}
          </EmptyState>
        )}
      </Section>
    </div>
  );
};

export default Appointments; 