import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaHeartbeat,
  FaAllergies,
  FaPills,
  FaHandHoldingMedical,
  FaUserFriends,
  FaSmoking,
  FaWineGlass,
  FaRunning,
  FaUtensils,
  FaSave,
  FaClipboardCheck
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
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2d3748;
  margin: 0;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
`;

const TextInput = styled.input`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

const SelectInput = styled.select`
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  
  &:hover {
    background-color: #2b6cb0;
  }
`;

const SuccessMessage = styled.div`
  background-color: #c6f6d5;
  color: #2f855a;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Component
const MedicalDetails: React.FC = () => {
  const { user } = useAuth();
  
  // State for form fields
  const [formData, setFormData] = useState({
    // Existing Conditions
    hasDiabetes: false,
    hasHypertension: false,
    hasHeartDisease: false,
    hasAsthma: false,
    hasThyroid: false,
    otherConditions: '',
    
    // Allergies
    drugAllergies: '',
    foodAllergies: '',
    environmentalAllergies: '',
    
    // Current Medications
    currentMedications: '',
    
    // Past Surgeries
    pastSurgeries: '',
    
    // Family Medical History
    familyHistory: '',
    
    // Lifestyle & Habits
    smoking: 'no',
    smokingFrequency: '',
    alcohol: 'no',
    alcoholFrequency: '',
    exerciseRoutine: 'none',
    exerciseFrequency: '',
    diet: 'none',
    dietDetails: ''
  });
  
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a backend API
    // For this demo, we'll just show a success message
    console.log('Form submitted with data:', formData);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Medical Details</PageTitle>
      </PageHeader>
      
      {showSuccess && (
        <SuccessMessage>
          <FaClipboardCheck />
          Your medical details have been successfully saved.
        </SuccessMessage>
      )}
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {/* Medical History Section */}
          <SectionTitle>
            <FaHeartbeat />
            Existing Conditions
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>Select all that apply:</FormLabel>
              <CheckboxGroup>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    name="hasDiabetes"
                    checked={formData.hasDiabetes}
                    onChange={handleInputChange}
                  />
                  Diabetes
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    name="hasHypertension"
                    checked={formData.hasHypertension}
                    onChange={handleInputChange}
                  />
                  Hypertension
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    name="hasHeartDisease"
                    checked={formData.hasHeartDisease}
                    onChange={handleInputChange}
                  />
                  Heart Disease
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    name="hasAsthma"
                    checked={formData.hasAsthma}
                    onChange={handleInputChange}
                  />
                  Asthma
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    name="hasThyroid"
                    checked={formData.hasThyroid}
                    onChange={handleInputChange}
                  />
                  Thyroid Disorder
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Other Conditions</FormLabel>
              <TextArea
                name="otherConditions"
                value={formData.otherConditions}
                onChange={handleInputChange}
                placeholder="Please specify any other medical conditions"
              />
            </FormGroup>
          </FormGrid>
          
          <SectionTitle>
            <FaAllergies />
            Allergies
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>Drug Allergies</FormLabel>
              <TextArea
                name="drugAllergies"
                value={formData.drugAllergies}
                onChange={handleInputChange}
                placeholder="List any drug allergies"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Food Allergies</FormLabel>
              <TextArea
                name="foodAllergies"
                value={formData.foodAllergies}
                onChange={handleInputChange}
                placeholder="List any food allergies"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Environmental Allergies</FormLabel>
              <TextArea
                name="environmentalAllergies"
                value={formData.environmentalAllergies}
                onChange={handleInputChange}
                placeholder="List any environmental allergies (pollen, dust, etc.)"
              />
            </FormGroup>
          </FormGrid>
          
          <SectionTitle>
            <FaPills />
            Current Medications
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>List all current medications with dosage</FormLabel>
              <TextArea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleInputChange}
                placeholder="Example: Lisinopril 10mg daily, Metformin 500mg twice daily"
              />
            </FormGroup>
          </FormGrid>
          
          <SectionTitle>
            <FaHandHoldingMedical />
            Past Surgeries
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>List any surgeries with year</FormLabel>
              <TextArea
                name="pastSurgeries"
                value={formData.pastSurgeries}
                onChange={handleInputChange}
                placeholder="Example: Appendectomy (2010), Knee replacement (2018)"
              />
            </FormGroup>
          </FormGrid>
          
          <SectionTitle>
            <FaUserFriends />
            Family Medical History
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>List genetic disorders or hereditary diseases in your family</FormLabel>
              <TextArea
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleInputChange}
                placeholder="Example: Mother - diabetes, Father - heart disease, Sibling - cancer"
              />
            </FormGroup>
          </FormGrid>
          
          <SectionTitle>
            <FaSmoking />
            Lifestyle & Habits
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>Smoking</FormLabel>
              <RadioGroup>
                <CheckboxLabel>
                  <CheckboxInput
                    type="radio"
                    name="smoking"
                    value="no"
                    checked={formData.smoking === 'no'}
                    onChange={handleInputChange}
                  />
                  No
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="radio"
                    name="smoking"
                    value="yes"
                    checked={formData.smoking === 'yes'}
                    onChange={handleInputChange}
                  />
                  Yes
                </CheckboxLabel>
              </RadioGroup>
              
              {formData.smoking === 'yes' && (
                <TextInput
                  name="smokingFrequency"
                  value={formData.smokingFrequency}
                  onChange={handleInputChange}
                  placeholder="Frequency (e.g., 5 cigarettes/day)"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Alcohol Consumption</FormLabel>
              <RadioGroup>
                <CheckboxLabel>
                  <CheckboxInput
                    type="radio"
                    name="alcohol"
                    value="no"
                    checked={formData.alcohol === 'no'}
                    onChange={handleInputChange}
                  />
                  No
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="radio"
                    name="alcohol"
                    value="yes"
                    checked={formData.alcohol === 'yes'}
                    onChange={handleInputChange}
                  />
                  Yes
                </CheckboxLabel>
              </RadioGroup>
              
              {formData.alcohol === 'yes' && (
                <TextInput
                  name="alcoholFrequency"
                  value={formData.alcoholFrequency}
                  onChange={handleInputChange}
                  placeholder="Frequency (e.g., 2 drinks/week)"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Exercise Routine</FormLabel>
              <SelectInput
                name="exerciseRoutine"
                value={formData.exerciseRoutine}
                onChange={handleInputChange}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="occasionally">Occasionally</option>
              </SelectInput>
              
              {formData.exerciseRoutine !== 'none' && (
                <TextInput
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleInputChange}
                  placeholder="Details (e.g., 30 min cardio, 3 times/week)"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Dietary Preferences</FormLabel>
              <SelectInput
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
              >
                <option value="none">Select a preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="other">Other</option>
              </SelectInput>
              
              {formData.diet === 'other' && (
                <TextInput
                  name="dietDetails"
                  value={formData.dietDetails}
                  onChange={handleInputChange}
                  placeholder="Please specify your dietary preference"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </FormGroup>
          </FormGrid>
          
          <SubmitButton type="submit">
            <FaSave />
            Save Medical Details
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default MedicalDetails; 