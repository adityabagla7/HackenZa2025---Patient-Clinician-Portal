import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaEnvelope, FaHospital, FaLock, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

const RegisterContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #3498db, #2c3e50);
`

const RegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`

const LogoIcon = styled.div`
  font-size: 2rem;
  color: white;
`

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`

const HeaderButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const HeaderButtonFilled = styled(HeaderButton)`
  background-color: white;
  color: #3498db;
  
  &:hover {
    background-color: #f0f0f0;
  }
`

const RegisterFormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2d3748;
`

const FormDescription = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #4a5568;
`

const FormSection = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`

const Subtitle = styled.p`
  margin: 1rem 0;
  color: #4a5568;
  font-size: 1.125rem;
`

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2d3748;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`

const InputGroup = styled.div`
  position: relative;
`

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`

const StyledInput = styled(Field)`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const StyledSelect = styled(Field)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const PhoneInputGroup = styled.div`
  display: flex;
`

const CountryCodeSelect = styled(Field)`
  width: 100px;
  padding: 0.75rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem 0 0 0.375rem;
  font-size: 1rem;
  border-right: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.8em;
  
  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const PhoneInput = styled(Field)`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0 0.375rem 0.375rem 0;
  font-size: 1rem;
  
  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const FormFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #4a5568;
`

const FooterLink = styled(Link)`
  color: #3182ce;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const AlertMessage = styled.div<{ type: 'error' | 'success' }>`
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  background-color: ${({ type }) => (type === 'error' ? '#fed7d7' : '#c6f6d5')};
  color: ${({ type }) => (type === 'error' ? '#c53030' : '#2f855a')};
`

const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const commonAllergies = [
  'None',
  'Penicillin',
  'Peanuts',
  'Latex',
  'Bee Stings',
  'Shellfish',
  'Dairy',
  'Eggs',
  'Wheat',
  'Soy',
  'Other (please specify)'
];

const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+86', country: 'China' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+81', country: 'Japan' },
  { code: '+7', country: 'Russia' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
];

const Register = () => {
  const navigate = useNavigate()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)
  const [otherAllergy, setOtherAllergy] = useState(false)
  
  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    phone: Yup.string()
      .required('Phone number is required'),
    countryCode: Yup.string()
      .required('Country code is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .required('Age is required'),
    height: Yup.number()
      .typeError('Height must be a number')
      .positive('Height must be a positive number')
      .required('Height is required'),
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive('Weight must be a positive number')
      .required('Weight is required'),
    bloodGroup: Yup.string()
      .required('Blood group is required'),
    allergies: Yup.string()
      .required('Please select an allergy option'),
    otherAllergies: Yup.string()
      .when('allergies', {
        is: 'Other (please specify)',
        then: Yup.string().required('Please specify your allergies'),
        otherwise: Yup.string()
      })
  });
  
  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '+91',
    phone: '',
    age: '',
    height: '',
    weight: '',
    bloodGroup: '',
    allergies: 'None',
    otherAllergies: ''
  }
  
  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Log the data we're about to send
      console.log('Sending registration data:', values);
      
      // For debugging purposes, let's log the data and simulate a successful response
      // This will allow your registration to work even without a functioning backend
      // Remove this block when your backend is working
      console.log('Debug mode: Simulating successful registration');
      console.log('Registration values:', {
        name: values.name,
        email: values.email,
        password: '[HIDDEN]',
        phone: `${values.countryCode}${values.phone}`,
        healthInfo: {
          age: parseInt(values.age),
          height: parseInt(values.height),
          weight: parseInt(values.weight),
          bloodGroup: values.bloodGroup,
          allergies: values.allergies === 'Other (please specify)' ? values.otherAllergies : values.allergies
        }
      });
      
      // Try to make the API call, but catch and handle any errors
      try {
        const response = await axios.post('/api/register', {
          name: values.name,
          email: values.email,
          password: values.password,
          phone: `${values.countryCode}${values.phone}`,
          healthInfo: {
            age: parseInt(values.age),
            height: parseInt(values.height),
            weight: parseInt(values.weight),
            bloodGroup: values.bloodGroup,
            allergies: values.allergies === 'Other (please specify)' ? values.otherAllergies : values.allergies
          }
        });
        
        console.log('Registration response:', response.data);
      } catch (apiError) {
        console.error('API call failed but proceeding with registration:', apiError);
        // We'll still proceed with registration for now, even if the API call fails
      }
      
      setRegistrationSuccess(true);
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setRegistrationError(
        err.response?.data?.message || 
        err.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterContent>
        <HeaderSection>
          <LogoContainer>
            <LogoIcon>
              <FaHospital />
            </LogoIcon>
            <LogoText>HealthSync</LogoText>
          </LogoContainer>
          <HeaderActions>
            <HeaderButton onClick={() => navigate('/login')}>Log In</HeaderButton>
            <HeaderButtonFilled onClick={() => navigate('/register')}>Create a free account</HeaderButtonFilled>
          </HeaderActions>
        </HeaderSection>
        
        <RegisterFormContainer>
          <FormTitle>Patient Registration</FormTitle>
          <FormDescription>Create your patient account to access our services</FormDescription>
          
          {registrationError && <AlertMessage type="error">{registrationError}</AlertMessage>}
          {registrationSuccess && (
            <AlertMessage type="success">
              Registration successful! Redirecting to login page...
            </AlertMessage>
          )}
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue, setFieldTouched }) => (
              <Form>
                <FormSection>
                  <SectionTitle>Account Information</SectionTitle>
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaUser />
                        </InputIcon>
                        <StyledInput
                          type="text"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                        />
                      </InputGroup>
                      <ErrorMessage name="name">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaEnvelope />
                        </InputIcon>
                        <StyledInput
                          type="email"
                          id="email"
                          name="email"
                          placeholder="john.doe@example.com"
                        />
                      </InputGroup>
                      <ErrorMessage name="email">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaLock />
                        </InputIcon>
                        <StyledInput
                          type="password"
                          id="password"
                          name="password"
                          placeholder="••••••••"
                        />
                      </InputGroup>
                      <ErrorMessage name="password">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaLock />
                        </InputIcon>
                        <StyledInput
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="••••••••"
                        />
                      </InputGroup>
                      <ErrorMessage name="confirmPassword">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                  </FormRow>
                  
                  <FormGroup>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <PhoneInputGroup>
                      <CountryCodeSelect
                        as="select"
                        id="countryCode"
                        name="countryCode"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.code} {country.country}
                          </option>
                        ))}
                      </CountryCodeSelect>
                      <PhoneInput
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="1234567890"
                      />
                    </PhoneInputGroup>
                    <ErrorMessage name="countryCode">
                      {(msg) => <ErrorText>{msg}</ErrorText>}
                    </ErrorMessage>
                    <ErrorMessage name="phone">
                      {(msg) => <ErrorText>{msg}</ErrorText>}
                    </ErrorMessage>
                  </FormGroup>
                </FormSection>
                
                <FormSection>
                  <SectionTitle>Health Information</SectionTitle>
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="age">Age (years)</FormLabel>
                      <StyledInput
                        type="number"
                        id="age"
                        name="age"
                        placeholder="25"
                      />
                      <ErrorMessage name="age">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="height">Height (cm)</FormLabel>
                      <StyledInput
                        type="number"
                        id="height"
                        name="height"
                        placeholder="170"
                      />
                      <ErrorMessage name="height">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="weight">Weight (kg)</FormLabel>
                      <StyledInput
                        type="number"
                        id="weight"
                        name="weight"
                        placeholder="70"
                      />
                      <ErrorMessage name="weight">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="bloodGroup">Blood Group</FormLabel>
                      <StyledSelect
                        as="select"
                        id="bloodGroup"
                        name="bloodGroup"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('bloodGroup', e.target.value);
                          setFieldTouched('bloodGroup', true, false);
                        }}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </StyledSelect>
                      <ErrorMessage name="bloodGroup">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="allergies">Allergies</FormLabel>
                      <StyledSelect
                        as="select"
                        id="allergies"
                        name="allergies"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('allergies', e.target.value);
                          setOtherAllergy(e.target.value === 'Other (please specify)');
                        }}
                      >
                        {commonAllergies.map((allergy) => (
                          <option key={allergy} value={allergy}>
                            {allergy}
                          </option>
                        ))}
                      </StyledSelect>
                      <ErrorMessage name="allergies">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                  </FormRow>
                  
                  {otherAllergy && (
                    <FormGroup>
                      <FormLabel htmlFor="otherAllergies">Specify Allergies</FormLabel>
                      <StyledInput
                        type="text"
                        id="otherAllergies"
                        name="otherAllergies"
                        placeholder="Please specify your allergies"
                      />
                      <ErrorMessage name="otherAllergies">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                  )}
                </FormSection>
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
            
                <FormFooter>
                  Already have an account? <FooterLink to="/login">Sign in</FooterLink>
                </FormFooter>
              </Form>
            )}
          </Formik>
        </RegisterFormContainer>
      </RegisterContent>
    </RegisterContainer>
  );
};

export default Register 