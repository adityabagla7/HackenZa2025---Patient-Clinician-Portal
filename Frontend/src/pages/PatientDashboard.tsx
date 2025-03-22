import { useState } from 'react'
import { FaCalendarAlt, FaClipboardList, FaFileInvoiceDollar, FaPills, FaPlus, FaUserMd } from 'react-icons/fa'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
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

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const AppointmentCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

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
`

const AppointmentContent = styled.div`
  flex: 1;
`

const AppointmentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
`

const AppointmentDetails = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
`

const Detail = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #718096;
  }
`

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
`

const MedicalCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const CardIcon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  margin-right: 1rem;
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
`

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
`

const PrescriptionItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const MedicationName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const MedicationDetails = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const RecordItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: #f7fafc;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const RecordTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const RecordDate = styled.div`
  font-size: 0.75rem;
  color: #718096;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`

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
`

const VitalsCard = styled(Card)`
  padding: 1.5rem;
`

const VitalsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
`

const VitalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const VitalItem = styled.div`
  text-align: center;
`

const VitalValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3182ce;
  margin-bottom: 0.25rem;
`

const VitalLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
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

type TabName = 'appointments' | 'prescriptions' | 'records'

const PatientDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabName>('appointments')
  
  return (
    <div>
      <PageTitle>Patient Dashboard</PageTitle>
      
      <Section>
        <VitalsCard>
          <VitalsTitle>Your Health Metrics</VitalsTitle>
          <VitalsGrid>
            <VitalItem>
              <VitalValue>120/80</VitalValue>
              <VitalLabel>Blood Pressure</VitalLabel>
            </VitalItem>
            <VitalItem>
              <VitalValue>72</VitalValue>
              <VitalLabel>Heart Rate (bpm)</VitalLabel>
            </VitalItem>
            <VitalItem>
              <VitalValue>98.6°F</VitalValue>
              <VitalLabel>Temperature</VitalLabel>
            </VitalItem>
            <VitalItem>
              <VitalValue>98%</VitalValue>
              <VitalLabel>Oxygen Saturation</VitalLabel>
            </VitalItem>
          </VitalsGrid>
        </VitalsCard>
      </Section>
      
      <Section>
        <TabsContainer>
          <Tab 
            active={activeTab === 'appointments'}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </Tab>
          <Tab 
            active={activeTab === 'prescriptions'}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescriptions
          </Tab>
          <Tab 
            active={activeTab === 'records'}
            onClick={() => setActiveTab('records')}
          >
            Medical Records
          </Tab>
        </TabsContainer>
        
        {activeTab === 'appointments' && (
          <>
            <SubTitle>Your Appointments</SubTitle>
            <Grid>
              <AppointmentCard>
                <AppointmentIcon status="upcoming">
                  <FaCalendarAlt />
                </AppointmentIcon>
                <AppointmentContent>
                  <AppointmentTitle>General Checkup</AppointmentTitle>
                  <AppointmentDetails>
                    <Detail>
                      <FaCalendarAlt />
                      October 18, 2023 - 10:00 AM
                    </Detail>
                    <Detail>
                      <FaUserMd />
                      Dr. Sarah Johnson - Cardiology
                    </Detail>
                  </AppointmentDetails>
                  <Status status="upcoming">Upcoming</Status>
                </AppointmentContent>
              </AppointmentCard>
              
              <AppointmentCard>
                <AppointmentIcon status="pending">
                  <FaCalendarAlt />
                </AppointmentIcon>
                <AppointmentContent>
                  <AppointmentTitle>Follow-up Consultation</AppointmentTitle>
                  <AppointmentDetails>
                    <Detail>
                      <FaCalendarAlt />
                      October 23, 2023 - 2:30 PM
                    </Detail>
                    <Detail>
                      <FaUserMd />
                      Dr. Michael Chen - Neurology
                    </Detail>
                  </AppointmentDetails>
                  <Status status="pending">Pending Confirmation</Status>
                </AppointmentContent>
              </AppointmentCard>
              
              <AppointmentCard>
                <AppointmentIcon status="completed">
                  <FaCalendarAlt />
                </AppointmentIcon>
                <AppointmentContent>
                  <AppointmentTitle>Blood Test</AppointmentTitle>
                  <AppointmentDetails>
                    <Detail>
                      <FaCalendarAlt />
                      October 5, 2023 - 9:15 AM
                    </Detail>
                    <Detail>
                      <FaUserMd />
                      Dr. Lisa Rodriguez - Internal Medicine
                    </Detail>
                  </AppointmentDetails>
                  <Status status="completed">Completed</Status>
                </AppointmentContent>
              </AppointmentCard>
            </Grid>
            
            <ButtonRow>
              <Button variant="primary">
                <FaPlus />
                Schedule New Appointment
              </Button>
            </ButtonRow>
          </>
        )}
        
        {activeTab === 'prescriptions' && (
          <>
            <SubTitle>Your Prescriptions</SubTitle>
            <Grid>
              <MedicalCard>
                <CardHeader>
                  <CardIcon color="#3182ce">
                    <FaPills />
                  </CardIcon>
                  <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                
                <PrescriptionItem>
                  <MedicationName>Lisinopril 10mg</MedicationName>
                  <MedicationDetails>
                    Take 1 tablet by mouth once daily for high blood pressure
                  </MedicationDetails>
                </PrescriptionItem>
                
                <PrescriptionItem>
                  <MedicationName>Metformin 500mg</MedicationName>
                  <MedicationDetails>
                    Take 1 tablet by mouth twice daily with meals for diabetes
                  </MedicationDetails>
                </PrescriptionItem>
                
                <PrescriptionItem>
                  <MedicationName>Vitamin D3 1000 IU</MedicationName>
                  <MedicationDetails>
                    Take 1 capsule by mouth daily for vitamin D deficiency
                  </MedicationDetails>
                </PrescriptionItem>
                
                <ButtonRow>
                  <Button variant="outline">Request Refill</Button>
                </ButtonRow>
              </MedicalCard>
              
              <MedicalCard>
                <CardHeader>
                  <CardIcon color="#e53e3e">
                    <FaPills />
                  </CardIcon>
                  <CardTitle>Recent Prescriptions</CardTitle>
                </CardHeader>
                
                <PrescriptionItem>
                  <MedicationName>Amoxicillin 500mg</MedicationName>
                  <MedicationDetails>
                    Prescribed on Sep 15, 2023 by Dr. Michael Chen
                  </MedicationDetails>
                </PrescriptionItem>
                
                <PrescriptionItem>
                  <MedicationName>Prednisone 20mg</MedicationName>
                  <MedicationDetails>
                    Prescribed on Aug 22, 2023 by Dr. Sarah Johnson
                  </MedicationDetails>
                </PrescriptionItem>
                
                <ButtonRow>
                  <Button variant="outline">View All</Button>
                </ButtonRow>
              </MedicalCard>
            </Grid>
          </>
        )}
        
        {activeTab === 'records' && (
          <>
            <SubTitle>Your Medical Records</SubTitle>
            <Grid>
              <MedicalCard>
                <CardHeader>
                  <CardIcon color="#38a169">
                    <FaClipboardList />
                  </CardIcon>
                  <CardTitle>Test Results</CardTitle>
                </CardHeader>
                
                <RecordItem>
                  <RecordTitle>Complete Blood Count (CBC)</RecordTitle>
                  <RecordDate>October 5, 2023</RecordDate>
                </RecordItem>
                
                <RecordItem>
                  <RecordTitle>Lipid Panel</RecordTitle>
                  <RecordDate>October 5, 2023</RecordDate>
                </RecordItem>
                
                <RecordItem>
                  <RecordTitle>Comprehensive Metabolic Panel</RecordTitle>
                  <RecordDate>October 5, 2023</RecordDate>
                </RecordItem>
                
                <ButtonRow>
                  <Button variant="outline">View Details</Button>
                </ButtonRow>
              </MedicalCard>
              
              <MedicalCard>
                <CardHeader>
                  <CardIcon color="#805ad5">
                    <FaClipboardList />
                  </CardIcon>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                
                <RecordItem>
                  <RecordTitle>Annual Physical Examination</RecordTitle>
                  <RecordDate>August 12, 2023</RecordDate>
                </RecordItem>
                
                <RecordItem>
                  <RecordTitle>Cardiac Evaluation</RecordTitle>
                  <RecordDate>May 3, 2023</RecordDate>
                </RecordItem>
                
                <RecordItem>
                  <RecordTitle>Allergy Assessment</RecordTitle>
                  <RecordDate>January 22, 2023</RecordDate>
                </RecordItem>
                
                <ButtonRow>
                  <Button variant="outline">View Complete History</Button>
                </ButtonRow>
              </MedicalCard>
              
              <MedicalCard>
                <CardHeader>
                  <CardIcon color="#dd6b20">
                    <FaFileInvoiceDollar />
                  </CardIcon>
                  <CardTitle>Medical Bills & Insurance</CardTitle>
                </CardHeader>
                
                <RecordItem>
                  <RecordTitle>Office Visit - Dr. Sarah Johnson</RecordTitle>
                  <RecordDate>October 18, 2023 - $25.00 copay</RecordDate>
                </RecordItem>
                
                <RecordItem>
                  <RecordTitle>Lab Work - Quest Diagnostics</RecordTitle>
                  <RecordDate>October 5, 2023 - $15.00 copay</RecordDate>
                </RecordItem>
                
                <ButtonRow>
                  <Button variant="outline">View All Statements</Button>
                </ButtonRow>
              </MedicalCard>
            </Grid>
          </>
        )}
      </Section>
    </div>
  )
}

export default PatientDashboard 