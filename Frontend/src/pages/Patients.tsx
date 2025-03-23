import React, { useState } from 'react';
import { FaCalendarAlt, FaClipboardList, FaFileMedical, FaSearch, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 280px;
  position: relative;
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
  min-width: 180px;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const PatientsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  padding: 1rem;
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #4a5568;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const PatientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PatientAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  font-size: 1.25rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PatientName = styled.div`
  font-weight: 500;
  color: #2d3748;
`;

const PatientEmail = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3182ce;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ebf8ff;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ type }) => {
    switch (type) {
      case 'active':
        return '#38a16920';
      case 'inactive':
        return '#e53e3e20';
      case 'new':
        return '#3182ce20';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'active':
        return '#38a169';
      case 'inactive':
        return '#e53e3e';
      case 'new':
        return '#3182ce';
      default:
        return '#a0aec0';
    }
  }};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.75rem;
  background-color: ${({ active }) => (active ? '#3182ce' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#4a5568')};
  border: 1px solid ${({ active }) => (active ? '#3182ce' : '#e2e8f0')};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ active }) => (active ? '#2b6cb0' : '#f7fafc')};
    border-color: ${({ active }) => (active ? '#2b6cb0' : '#3182ce')};
  }
  
  &:disabled {
    background-color: #f7fafc;
    color: #a0aec0;
    border-color: #e2e8f0;
    cursor: not-allowed;
  }
`;

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'new';
  lastVisit: string;
  lastVisitDate: Date;
  image?: string;
}

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  
  // Mock data for patients - in a real app this would come from an API
  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      status: 'active',
      lastVisit: 'Oct 12, 2023',
      lastVisitDate: new Date('2023-10-12'),
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '(555) 987-6543',
      status: 'new',
      lastVisit: 'Never',
      lastVisitDate: new Date('2023-10-18')
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phone: '(555) 456-7890',
      status: 'active',
      lastVisit: 'Sep 28, 2023',
      lastVisitDate: new Date('2023-09-28'),
      image: 'https://randomuser.me/api/portraits/men/43.jpg'
    },
    {
      id: '4',
      name: 'Sophia Brown',
      email: 'sophia.brown@example.com',
      phone: '(555) 234-5678',
      status: 'inactive',
      lastVisit: 'Aug 15, 2023',
      lastVisitDate: new Date('2023-08-15'),
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '5',
      name: 'William Davis',
      email: 'william.davis@example.com',
      phone: '(555) 876-5432',
      status: 'active',
      lastVisit: 'Oct 5, 2023',
      lastVisitDate: new Date('2023-10-05')
    },
    {
      id: '6',
      name: 'Olivia Martinez',
      email: 'olivia.martinez@example.com',
      phone: '(555) 345-6789',
      status: 'active',
      lastVisit: 'Oct 10, 2023',
      lastVisitDate: new Date('2023-10-10'),
      image: 'https://randomuser.me/api/portraits/women/63.jpg'
    }
  ];
  
  // Filter patients based on search term and status filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearchTerm = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             patient.phone.includes(searchTerm);
    const matchesFilter = filter === 'all' || patient.status === filter;
    
    return matchesSearchTerm && matchesFilter;
  });
  
  // Sort patients by last visit (most recent first)
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (a.lastVisit === 'Never') return 1;
    if (b.lastVisit === 'Never') return -1;
    return b.lastVisitDate.getTime() - a.lastVisitDate.getTime();
  });
  
  // Paginate patients
  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = sortedPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  
  // Pagination controls
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div>
      <PageTitle>Patients</PageTitle>
      
      <SearchAndFilterContainer>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <FilterDropdown 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Patients</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="new">New</option>
        </FilterDropdown>
      </SearchAndFilterContainer>
      
      <PatientsTable>
        <TableHeader>
          <div>Patient</div>
          <div>Contact</div>
          <div>Status</div>
          <div>Last Visit</div>
          <div>Actions</div>
        </TableHeader>
        
        {currentPatients.map(patient => (
          <TableRow key={patient.id}>
            <PatientInfo>
              <PatientAvatar>
                {patient.image ? (
                  <img src={patient.image} alt={patient.name} />
                ) : (
                  <FaUser />
                )}
              </PatientAvatar>
              <div>
                <PatientName>{patient.name}</PatientName>
                <PatientEmail>{patient.email}</PatientEmail>
              </div>
            </PatientInfo>
            
            <div>{patient.phone}</div>
            
            <div>
              <Badge type={patient.status}>
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
              </Badge>
            </div>
            
            <div>{patient.lastVisit}</div>
            
            <ActionButtons>
              <ActionButton title="View Medical Records">
                <FaClipboardList />
              </ActionButton>
              <ActionButton title="Schedule Appointment">
                <FaCalendarAlt />
              </ActionButton>
              <ActionButton title="Add Note">
                <FaFileMedical />
              </ActionButton>
            </ActionButtons>
          </TableRow>
        ))}
      </PatientsTable>
      
      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
          
          {[...Array(totalPages)].map((_, i) => (
            <PaginationButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </PaginationButton>
          ))}
          
          <PaginationButton 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </PaginationContainer>
      )}
    </div>
  );
};

export default Patients; 