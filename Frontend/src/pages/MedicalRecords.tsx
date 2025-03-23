import React, { useState } from 'react';
import {
    FaCalendarAlt,
    FaChevronDown,
    FaClipboardList,
    FaDownload,
    FaFileAlt,
    FaFileMedical,
    FaFilePrescription,
    FaSearch,
    FaTimes,
    FaUserMd
} from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`;

const PageSubtitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 250px;
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

const FilterDropdown = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: white;
  font-size: 1rem;
  min-width: 160px;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const RecordCard = styled.div`
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

const RecordHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RecordTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #3182ce;
  }
`;

const RecordBody = styled.div`
  padding: 1.25rem;
`;

const RecordInfo = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #4a5568;
  
  svg {
    color: #718096;
  }
`;

const RecordDescription = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const RecordFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.25rem;
  background-color: #f7fafc;
`;

const RecordDate = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3182ce;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.75rem;
  
  &:hover {
    background-color: #ebf8ff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DetailView = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #a0aec0;
  font-size: 1.25rem;
  cursor: pointer;
  
  &:hover {
    color: #4a5568;
  }
`;

const DetailContent = styled.div`
  padding: 1.5rem;
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
`;

const Badge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ type }) => {
    switch (type) {
      case 'visit':
        return '#3182ce20';
      case 'test':
        return '#38a16920';
      case 'prescription':
        return '#ed8a1920';
      case 'report':
        return '#805ad520';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'visit':
        return '#3182ce';
      case 'test':
        return '#38a169';
      case 'prescription':
        return '#ed8a19';
      case 'report':
        return '#805ad5';
      default:
        return '#a0aec0';
    }
  }};
`;

interface MedicalRecord {
  id: string;
  title: string;
  type: 'visit' | 'test' | 'prescription' | 'report';
  date: string;
  dateObj: Date;
  doctor: string;
  description: string;
  details?: string;
  notes?: string;
  fileUrl?: string;
}

const MedicalRecords: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recordType, setRecordType] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  
  // Mock data for medical records - in a real app this would come from an API
  const records: MedicalRecord[] = [
    {
      id: '1',
      title: 'Annual Physical Examination',
      type: 'visit',
      date: 'Oct 12, 2023',
      dateObj: new Date('2023-10-12'),
      doctor: 'Dr. Sarah Johnson',
      description: 'Routine annual physical examination and health assessment.',
      details: 'Patient vitals were normal. Blood pressure: 120/80 mmHg, Heart rate: 72 bpm, Temperature: 98.6°F. Patient reported no significant health concerns.',
      notes: 'Overall health is good. Recommended maintaining current exercise regimen and healthy diet. Follow up in one year for next annual physical.'
    },
    {
      id: '2',
      title: 'Complete Blood Count (CBC)',
      type: 'test',
      date: 'Oct 5, 2023',
      dateObj: new Date('2023-10-05'),
      doctor: 'Dr. Michael Brown',
      description: 'Standard blood test to check overall health status.',
      details: 'WBC: 7.5 x10^9/L (Normal)\nRBC: 4.8 x10^12/L (Normal)\nHemoglobin: 14.2 g/dL (Normal)\nHematocrit: 42% (Normal)\nPlatelets: 250 x10^9/L (Normal)',
      fileUrl: '#'
    },
    {
      id: '3',
      title: 'Amoxicillin Prescription',
      type: 'prescription',
      date: 'Sep 28, 2023',
      dateObj: new Date('2023-09-28'),
      doctor: 'Dr. Emily Davis',
      description: 'Prescribed for bacterial sinus infection.',
      details: 'Amoxicillin 500mg\nTake 1 capsule by mouth every 8 hours for 10 days\nQuantity: 30 capsules\nRefills: 0',
      notes: 'Complete full course of antibiotics even if feeling better. Take with food to reduce stomach upset. Contact doctor if symptoms don\'t improve within 3 days.'
    },
    {
      id: '4',
      title: 'Chest X-Ray Results',
      type: 'report',
      date: 'Sep 15, 2023',
      dateObj: new Date('2023-09-15'),
      doctor: 'Dr. Robert Taylor',
      description: 'Chest X-ray to evaluate lung condition following respiratory symptoms.',
      details: 'Frontal and lateral chest radiographs demonstrate clear lung fields. No evidence of consolidation, effusion, or pneumothorax. Heart size is normal. No abnormalities of the bony thorax.',
      notes: 'Normal chest X-ray. No evidence of pneumonia or other acute cardiopulmonary process.',
      fileUrl: '#'
    }
  ];
  
  // Filter records based on search term and type filter
  const filteredRecords = records.filter(record => {
    const matchesSearchTerm = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = recordType === 'all' || record.type === recordType;
    
    return matchesSearchTerm && matchesType;
  });
  
  // Sort records by date (most recent first)
  const sortedRecords = [...filteredRecords].sort((a, b) => 
    b.dateObj.getTime() - a.dateObj.getTime()
  );
  
  // Function to render icon based on record type
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <FaUserMd />;
      case 'test':
        return <FaClipboardList />;
      case 'prescription':
        return <FaFilePrescription />;
      case 'report':
        return <FaFileAlt />;
      default:
        return <FaFileMedical />;
    }
  };
  
  return (
    <div>
      <PageTitle>Medical Records</PageTitle>
      
      {selectedRecord ? (
        <>
          <DetailView>
            <DetailHeader>
              <div>
                <PageSubtitle>{selectedRecord.title}</PageSubtitle>
                <Badge type={selectedRecord.type}>
                  {selectedRecord.type.charAt(0).toUpperCase() + selectedRecord.type.slice(1)}
                </Badge>
              </div>
              <CloseButton onClick={() => setSelectedRecord(null)}>
                <FaTimes />
              </CloseButton>
            </DetailHeader>
            
            <DetailContent>
              <DetailSection>
                <SectionTitle>Overview</SectionTitle>
                <InfoItem>
                  <FaCalendarAlt />
                  {selectedRecord.date}
                </InfoItem>
                <InfoItem>
                  <FaUserMd />
                  {selectedRecord.doctor}
                </InfoItem>
                <RecordDescription>{selectedRecord.description}</RecordDescription>
              </DetailSection>
              
              {selectedRecord.details && (
                <DetailSection>
                  <SectionTitle>Details</SectionTitle>
                  <div style={{ whiteSpace: 'pre-line' }}>{selectedRecord.details}</div>
                </DetailSection>
              )}
              
              {selectedRecord.notes && (
                <DetailSection>
                  <SectionTitle>Doctor's Notes</SectionTitle>
                  <div>{selectedRecord.notes}</div>
                </DetailSection>
              )}
              
              {selectedRecord.fileUrl && (
                <ButtonGroup>
                  <ActionButton>
                    <FaDownload />
                    Download Record
                  </ActionButton>
                </ButtonGroup>
              )}
            </DetailContent>
          </DetailView>
          
          <ActionButton onClick={() => setSelectedRecord(null)}>
            <FaChevronDown />
            Show All Records
          </ActionButton>
        </>
      ) : (
        <>
          <FilterContainer>
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput 
                type="text" 
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            
            <FilterDropdown 
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
            >
              <option value="all">All Records</option>
              <option value="visit">Visits</option>
              <option value="test">Tests</option>
              <option value="prescription">Prescriptions</option>
              <option value="report">Reports</option>
            </FilterDropdown>
          </FilterContainer>
          
          <Grid>
            {sortedRecords.map(record => (
              <RecordCard key={record.id}>
                <RecordHeader>
                  <RecordTitle>
                    {renderTypeIcon(record.type)}
                    {record.title}
                  </RecordTitle>
                  <Badge type={record.type}>
                    {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                  </Badge>
                </RecordHeader>
                
                <RecordBody>
                  <RecordInfo>
                    <InfoItem>
                      <FaCalendarAlt />
                      {record.date}
                    </InfoItem>
                    <InfoItem>
                      <FaUserMd />
                      {record.doctor}
                    </InfoItem>
                  </RecordInfo>
                  
                  <RecordDescription>
                    {record.description}
                  </RecordDescription>
                  
                  <ButtonGroup>
                    <ActionButton onClick={() => setSelectedRecord(record)}>
                      View Details
                    </ActionButton>
                    
                    {record.fileUrl && (
                      <ActionButton>
                        <FaDownload />
                        Download
                      </ActionButton>
                    )}
                  </ButtonGroup>
                </RecordBody>
                
                <RecordFooter>
                  <RecordDate>Added on {record.date}</RecordDate>
                </RecordFooter>
              </RecordCard>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default MedicalRecords; 