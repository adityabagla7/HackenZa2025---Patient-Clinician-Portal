import React, { useState } from 'react';
import { FaCalendarPlus, FaEnvelope, FaPhone, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import styled from 'styled-components';

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ active }) => (active ? '#3182ce10' : 'white')};
  color: ${({ active }) => (active ? '#3182ce' : '#4a5568')};
  border: 1px solid ${({ active }) => (active ? '#3182ce' : '#e2e8f0')};
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #3182ce10;
    border-color: #3182ce;
    color: #3182ce;
  }
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
  position: relative;
  background-color: #3182ce;
  height: 100px;
`;

const DoctorAvatar = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: #fff;
  border: 5px solid white;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardBody = styled.div`
  padding: 3rem 1.5rem 1.5rem;
  text-align: center;
`;

const DoctorName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2d3748;
`;

const DoctorSpecialty = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
`;

const DoctorRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #f6ad55;
`;

const DoctorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
  
  svg {
    color: #3182ce;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
  }
`;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  email: string;
  phone: string;
  image: string;
  availability: number;
}

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSpecialty, setActiveSpecialty] = useState<string>('All');
  
  // Mock data for doctors - in a real app this would come from an API
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      email: 'sarah.johnson@example.com',
      phone: '(555) 123-4567',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      availability: 7
    },
    {
      id: '2',
      name: 'Dr. Michael Brown',
      specialty: 'Neurologist',
      rating: 4.7,
      email: 'michael.brown@example.com',
      phone: '(555) 987-6543',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      availability: 3
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      rating: 4.8,
      email: 'emily.davis@example.com',
      phone: '(555) 456-7890',
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      availability: 5
    },
    {
      id: '4',
      name: 'Dr. David Wilson',
      specialty: 'Dermatologist',
      rating: 4.5,
      email: 'david.wilson@example.com',
      phone: '(555) 234-5678',
      image: 'https://randomuser.me/api/portraits/men/43.jpg',
      availability: 2
    },
    {
      id: '5',
      name: 'Dr. Jessica Martinez',
      specialty: 'Ophthalmologist',
      rating: 4.6,
      email: 'jessica.martinez@example.com',
      phone: '(555) 876-5432',
      image: 'https://randomuser.me/api/portraits/women/23.jpg',
      availability: 4
    },
    {
      id: '6',
      name: 'Dr. Robert Taylor',
      specialty: 'Orthopedic',
      rating: 4.9,
      email: 'robert.taylor@example.com',
      phone: '(555) 345-6789',
      image: 'https://randomuser.me/api/portraits/men/64.jpg',
      availability: 8
    }
  ];
  
  // Get unique specialties for filter options
  const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];
  
  // Filter doctors based on search term and active specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearchTerm = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = activeSpecialty === 'All' || doctor.specialty === activeSpecialty;
    
    return matchesSearchTerm && matchesSpecialty;
  });
  
  // Function to render star ratings
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} style={{ opacity: 0.3 }} />
        ))}
      </>
    );
  };
  
  return (
    <div>
      <PageTitle>Find a Doctor</PageTitle>
      
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      <FiltersContainer>
        {specialties.map((specialty) => (
          <FilterChip 
            key={specialty}
            active={activeSpecialty === specialty}
            onClick={() => setActiveSpecialty(specialty)}
          >
            {specialty}
          </FilterChip>
        ))}
      </FiltersContainer>
      
      <Grid>
        {filteredDoctors.map(doctor => (
          <Card key={doctor.id}>
            <CardHeader>
              <DoctorAvatar>
                <img src={doctor.image} alt={doctor.name} />
              </DoctorAvatar>
            </CardHeader>
            <CardBody>
              <DoctorName>{doctor.name}</DoctorName>
              <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
              
              <DoctorRating>
                {renderStarRating(doctor.rating)}
                <span style={{ marginLeft: '0.5rem', color: '#4a5568' }}>{doctor.rating.toFixed(1)}</span>
              </DoctorRating>
              
              <DoctorDetails>
                <DetailItem>
                  <FaEnvelope />
                  {doctor.email}
                </DetailItem>
                <DetailItem>
                  <FaPhone />
                  {doctor.phone}
                </DetailItem>
                <DetailItem>
                  <FaCalendarPlus />
                  {doctor.availability} slots available this week
                </DetailItem>
              </DoctorDetails>
              
              <Button>
                <FaCalendarPlus size={14} />
                Book Appointment
              </Button>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Doctors; 