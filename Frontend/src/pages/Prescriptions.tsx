import React, { useState } from 'react';
import {
    FaCalendarAlt,
    FaClock,
    FaDownload,
    FaFilePrescription,
    FaInfoCircle,
    FaPills,
    FaPlusCircle,
    FaPrint,
    FaRegCheckCircle,
    FaRegClock,
    FaSearch,
    FaUserMd
} from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
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
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MedicineName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const MedicineInfo = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
  
  svg {
    color: #3182ce;
    min-width: 1rem;
  }
`;

const Instructions = styled.div`
  background-color: #ebf8ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid #3182ce;
  
  h4 {
    color: #2b6cb0;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const CardFooter = styled.div`
  padding: 1rem 1.25rem;
  background-color: #f7fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch (status) {
      case 'active':
        return '#38a16920';
      case 'expired':
        return '#e53e3e20';
      case 'pending':
        return '#ed8a1920';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'active':
        return '#38a169';
      case 'expired':
        return '#e53e3e';
      case 'pending':
        return '#ed8a19';
      default:
        return '#a0aec0';
    }
  }};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3182ce;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    background-color: #ebf8ff;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, transform 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
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

interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: 'active' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  doctor: string;
  instructions?: string;
  sideEffects?: string;
  refills: number;
  issuedDate: string;
}

const Prescriptions: React.FC = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired'>('all');
  
  // Mock prescription data - in a real app this would come from an API
  const prescriptions: Prescription[] = [
    {
      id: '1',
      medicine: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Every 8 hours',
      duration: '10 days',
      status: 'active',
      startDate: 'Oct 12, 2023',
      endDate: 'Oct 22, 2023',
      doctor: 'Dr. Sarah Johnson',
      instructions: 'Take with food to reduce stomach upset.',
      sideEffects: 'May cause diarrhea, nausea, or rash.',
      refills: 0,
      issuedDate: 'Oct 12, 2023'
    },
    {
      id: '2',
      medicine: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      status: 'active',
      startDate: 'Oct 5, 2023',
      endDate: 'Nov 4, 2023',
      doctor: 'Dr. Michael Brown',
      instructions: 'Take in the morning with or without food.',
      sideEffects: 'May cause dizziness, headache, or dry cough.',
      refills: 3,
      issuedDate: 'Oct 5, 2023'
    },
    {
      id: '3',
      medicine: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'Every 6 hours as needed',
      duration: '7 days',
      status: 'expired',
      startDate: 'Sep 20, 2023',
      endDate: 'Sep 27, 2023',
      doctor: 'Dr. Emily Davis',
      instructions: 'Take with food or milk to reduce stomach upset.',
      refills: 0,
      issuedDate: 'Sep 20, 2023'
    },
    {
      id: '4',
      medicine: 'Fluoxetine',
      dosage: '20mg',
      frequency: 'Once daily',
      duration: '90 days',
      status: 'active',
      startDate: 'Sep 15, 2023',
      endDate: 'Dec 14, 2023',
      doctor: 'Dr. Robert Taylor',
      instructions: 'Take in the morning. May take 2-4 weeks to notice full effect.',
      sideEffects: 'May cause insomnia, nausea, or headache.',
      refills: 2,
      issuedDate: 'Sep 15, 2023'
    }
  ];
  
  // Filter prescriptions based on search term and active tab
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearchTerm = 
      prescription.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearchTerm;
    } else if (activeTab === 'active') {
      return matchesSearchTerm && prescription.status === 'active';
    } else {
      return matchesSearchTerm && prescription.status === 'expired';
    }
  });
  
  // Sort prescriptions - active first, then by start date (newest first)
  const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    
    // Convert dates to timestamps for comparison
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });
  
  // Render status badge with appropriate icon
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <StatusBadge status={status}>
            <FaRegCheckCircle size={12} />
            Active
          </StatusBadge>
        );
      case 'expired':
        return (
          <StatusBadge status={status}>
            <FaClock size={12} />
            Expired
          </StatusBadge>
        );
      case 'pending':
        return (
          <StatusBadge status={status}>
            <FaRegClock size={12} />
            Pending
          </StatusBadge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <PageTitle>Prescriptions</PageTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          All Prescriptions
        </Tab>
        <Tab 
          active={activeTab === 'active'} 
          onClick={() => setActiveTab('active')}
        >
          Active
        </Tab>
        <Tab 
          active={activeTab === 'expired'} 
          onClick={() => setActiveTab('expired')}
        >
          Expired
        </Tab>
      </TabsContainer>
      
      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search by medicine name or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      <Grid>
        {sortedPrescriptions.map(prescription => (
          <Card key={prescription.id}>
            <CardHeader>
              <MedicineName>{prescription.medicine}</MedicineName>
              {renderStatusBadge(prescription.status)}
            </CardHeader>
            
            <CardBody>
              <MedicineInfo>
                <InfoItem>
                  <FaPills />
                  {prescription.dosage}, {prescription.frequency}
                </InfoItem>
                <InfoItem>
                  <FaCalendarAlt />
                  {prescription.startDate} to {prescription.endDate}
                </InfoItem>
                <InfoItem>
                  <FaUserMd />
                  Prescribed by {prescription.doctor}
                </InfoItem>
                <InfoItem>
                  <FaFilePrescription />
                  {prescription.refills > 0 ? `${prescription.refills} refills remaining` : 'No refills'}
                </InfoItem>
              </MedicineInfo>
              
              {prescription.instructions && (
                <Instructions>
                  <h4>Instructions</h4>
                  <p>{prescription.instructions}</p>
                </Instructions>
              )}
              
              <ButtonGroup>
                <ActionButton>
                  <FaPrint />
                  Print
                </ActionButton>
                <ActionButton>
                  <FaDownload />
                  Download
                </ActionButton>
                <ActionButton>
                  <FaInfoCircle />
                  Details
                </ActionButton>
              </ButtonGroup>
            </CardBody>
            
            <CardFooter>
              <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                Issued: {prescription.issuedDate}
              </div>
            </CardFooter>
          </Card>
        ))}
      </Grid>
      
      {isDoctor && (
        <AddButton title="Add New Prescription">
          <FaPlusCircle />
        </AddButton>
      )}
    </div>
  );
};

export default Prescriptions; 