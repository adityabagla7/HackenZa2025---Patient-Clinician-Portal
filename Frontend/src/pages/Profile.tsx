import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2d3748;
  margin: 0;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProfileInfo = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarEditButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.75rem;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ProfileName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const ProfileRole = styled.div`
  font-size: 0.875rem;
  color: #718096;
  background-color: #edf2f7;
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  margin-bottom: 1rem;
`;

const MetricsContainer = styled.div`
  padding: 1.5rem;
`;

const MetricTitle = styled.h3`
  font-size: 0.875rem;
  color: #718096;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const MetricsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetricLabel = styled.div`
  color: #4a5568;
  font-size: 0.875rem;
`;

const MetricValue = styled.div`
  color: #2d3748;
  font-weight: 600;
  font-size: 0.875rem;
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  margin: 0;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3182ce;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: #ebf8ff;
  }
`;

const SaveButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #2b6cb0;
  }
`;

const CancelButton = styled.button`
  background: none;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
`;

const FieldValue = styled.div`
  color: #2d3748;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

const FieldIcon = styled.div`
  color: #a0aec0;
  min-width: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

const AlertMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  background-color: ${({ type }) => type === 'success' ? '#c6f6d5' : '#fed7d7'};
  color: ${({ type }) => type === 'success' ? '#2f855a' : '#c53030'};
`;

// Component
const Profile: React.FC = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor' || user?.role === 'clinician';
  
  // Sample data for the doctor/patient metrics
  const metrics = isDoctor ? {
    patientsCount: 48,
    appointmentsToday: 8,
    appointmentsThisWeek: 37,
    yearsOfExperience: 7
  } : {
    upcomingAppointments: 2,
    pendingPrescriptions: 1,
    testsAwaitingResults: 3,
    medicalAlerts: 0
  };
  
  // Profile form state
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: (user?.name?.split(' ')[0] || 'John'),
    lastName: (user?.name?.split(' ')[1] || 'Doe'),
    email: user?.email || 'john.doe@example.com',
    phone: '(123) 456-7890',
    dateOfBirth: '1985-06-15',
    bloodType: 'A+',
    address: '123 Medical Center Dr, Healthcare City',
    emergencyContact: 'Jane Doe (Spouse) - (123) 456-7891'
  });
  
  // Doctor-specific form values
  const [doctorFormValues, setDoctorFormValues] = useState({
    specialty: 'Cardiology',
    medicalLicense: 'ML12345678',
    hospitalAffiliation: 'General Hospital Medical Center',
    education: 'University of Medicine, MD'
  });
  
  // Success message state
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (isDoctor && Object.keys(doctorFormValues).includes(name)) {
      setDoctorFormValues({
        ...doctorFormValues,
        [name]: value
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send the form data to the server here
    // For this demo, we'll just simulate a successful update
    
    setTimeout(() => {
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 500);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
      </PageHeader>
      
      {successMessage && (
        <AlertMessage type="success">{successMessage}</AlertMessage>
      )}
      
      <ProfileGrid>
        <ProfileSidebar>
          <ProfileInfo>
            <ProfileAvatar>
              <Avatar 
                src={(user as any)?.avatar || 
                  `https://ui-avatars.com/api/?name=${formValues.firstName}+${formValues.lastName}&background=3182ce&color=fff`} 
                alt="Profile" 
              />
              <AvatarEditButton>
                <FaEdit style={{ marginRight: '4px' }} size={12} />
                Change Photo
              </AvatarEditButton>
            </ProfileAvatar>
            
            <ProfileName>{formValues.firstName} {formValues.lastName}</ProfileName>
            <ProfileRole>
              {isDoctor ? `Doctor - ${doctorFormValues.specialty}` : 'Patient'}
            </ProfileRole>
          </ProfileInfo>
          
          <MetricsContainer>
            <MetricTitle>{isDoctor ? 'Doctor Metrics' : 'Patient Summary'}</MetricTitle>
            <MetricsList>
              {isDoctor ? (
                <>
                  <MetricItem>
                    <MetricLabel>Patients</MetricLabel>
                    <MetricValue>{metrics.patientsCount}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Today's Appointments</MetricLabel>
                    <MetricValue>{metrics.appointmentsToday}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>This Week's Appointments</MetricLabel>
                    <MetricValue>{metrics.appointmentsThisWeek}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Years of Experience</MetricLabel>
                    <MetricValue>{metrics.yearsOfExperience}</MetricValue>
                  </MetricItem>
                </>
              ) : (
                <>
                  <MetricItem>
                    <MetricLabel>Upcoming Appointments</MetricLabel>
                    <MetricValue>{metrics.upcomingAppointments}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Prescriptions</MetricLabel>
                    <MetricValue>{metrics.pendingPrescriptions}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Pending Test Results</MetricLabel>
                    <MetricValue>{metrics.testsAwaitingResults}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Medical Alerts</MetricLabel>
                    <MetricValue>{metrics.medicalAlerts}</MetricValue>
                  </MetricItem>
                </>
              )}
            </MetricsList>
          </MetricsContainer>
        </ProfileSidebar>
        
        <InfoSection>
          <form onSubmit={handleSubmit}>
            <SectionHeader>
              <SectionTitle>Personal Information</SectionTitle>
              {isEditing ? (
                <ButtonGroup>
                  <SaveButton type="submit">
                    <FaSave />
                    Save Changes
                  </SaveButton>
                  <CancelButton type="button" onClick={() => setIsEditing(false)}>
                    <FaTimes />
                    Cancel
                  </CancelButton>
                </ButtonGroup>
              ) : (
                <EditButton type="button" onClick={() => setIsEditing(true)}>
                  <FaEdit />
                  Edit Profile
                </EditButton>
              )}
            </SectionHeader>
            
            <FieldsContainer>
              <FieldGroup>
                <FieldLabel>First Name</FieldLabel>
                {isEditing ? (
                  <FormInput
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <FieldValue>
                    <FieldIcon><FaUser /></FieldIcon>
                    {formValues.firstName}
                  </FieldValue>
                )}
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Last Name</FieldLabel>
                {isEditing ? (
                  <FormInput
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <FieldValue>
                    <FieldIcon><FaUser /></FieldIcon>
                    {formValues.lastName}
                  </FieldValue>
                )}
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Email</FieldLabel>
                {isEditing ? (
                  <FormInput
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <FieldValue>
                    <FieldIcon><FaEnvelope /></FieldIcon>
                    {formValues.email}
                  </FieldValue>
                )}
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Phone</FieldLabel>
                {isEditing ? (
                  <FormInput
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <FieldValue>
                    <FieldIcon><FaPhone /></FieldIcon>
                    {formValues.phone}
                  </FieldValue>
                )}
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Date of Birth</FieldLabel>
                {isEditing ? (
                  <FormInput
                    type="date"
                    name="dateOfBirth"
                    value={formValues.dateOfBirth}
                    onChange={handleInputChange}
                  />
                ) : (
                  <FieldValue>
                    <FieldIcon><FaCalendarAlt /></FieldIcon>
                    {new Date(formValues.dateOfBirth).toLocaleDateString()}
                  </FieldValue>
                )}
              </FieldGroup>
              
              {!isDoctor && (
                <FieldGroup>
                  <FieldLabel>Blood Type</FieldLabel>
                  {isEditing ? (
                    <FormSelect
                      name="bloodType"
                      value={formValues.bloodType}
                      onChange={handleInputChange}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </FormSelect>
                  ) : (
                    <FieldValue>
                      <FieldIcon><FaIdCard /></FieldIcon>
                      {formValues.bloodType}
                    </FieldValue>
                  )}
                </FieldGroup>
              )}
              
              <FieldGroup>
                <FieldLabel>Address</FieldLabel>
                {isEditing ? (
                  <FormInput
                    name="address"
                    value={formValues.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <FieldValue>
                    <FieldIcon><FaIdCard /></FieldIcon>
                    {formValues.address}
                  </FieldValue>
                )}
              </FieldGroup>
              
              {!isDoctor && (
                <FieldGroup>
                  <FieldLabel>Emergency Contact</FieldLabel>
                  {isEditing ? (
                    <FormInput
                      name="emergencyContact"
                      value={formValues.emergencyContact}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <FieldValue>
                      <FieldIcon><FaPhone /></FieldIcon>
                      {formValues.emergencyContact}
                    </FieldValue>
                  )}
                </FieldGroup>
              )}
              
              {isDoctor && (
                <>
                  <FieldGroup>
                    <FieldLabel>Specialty</FieldLabel>
                    {isEditing ? (
                      <FormInput
                        name="specialty"
                        value={doctorFormValues.specialty}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <FieldValue>
                        <FieldIcon><FaUserMd /></FieldIcon>
                        {doctorFormValues.specialty}
                      </FieldValue>
                    )}
                  </FieldGroup>
                  
                  <FieldGroup>
                    <FieldLabel>Medical License</FieldLabel>
                    {isEditing ? (
                      <FormInput
                        name="medicalLicense"
                        value={doctorFormValues.medicalLicense}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <FieldValue>
                        <FieldIcon><FaIdCard /></FieldIcon>
                        {doctorFormValues.medicalLicense}
                      </FieldValue>
                    )}
                  </FieldGroup>
                  
                  <FieldGroup>
                    <FieldLabel>Hospital Affiliation</FieldLabel>
                    {isEditing ? (
                      <FormInput
                        name="hospitalAffiliation"
                        value={doctorFormValues.hospitalAffiliation}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <FieldValue>
                        <FieldIcon><FaHospital /></FieldIcon>
                        {doctorFormValues.hospitalAffiliation}
                      </FieldValue>
                    )}
                  </FieldGroup>
                  
                  <FieldGroup>
                    <FieldLabel>Education</FieldLabel>
                    {isEditing ? (
                      <FormInput
                        name="education"
                        value={doctorFormValues.education}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <FieldValue>
                        <FieldIcon><FaUserMd /></FieldIcon>
                        {doctorFormValues.education}
                      </FieldValue>
                    )}
                  </FieldGroup>
                </>
              )}
            </FieldsContainer>
          </form>
        </InfoSection>
      </ProfileGrid>
    </PageContainer>
  );
};

export default Profile; 