import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaEnvelope, FaHospital, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #3498db, #2c3e50);
`

const LoginContent = styled.div`
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

const LoginOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  padding: 2rem 0;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`

const DividerLine = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  
  @media (max-width: 992px) {
    width: 100%;
    height: 1px;
  }
`

const LoginOption = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 450px;
`

const OptionTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
`

const OptionDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 2rem;
`

const LoginFormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`

const FormTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2d3748;
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

const Login = () => {
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [userType, setUserType] = useState<'patient' | 'clinician'>('patient')
  
  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  
  // Initial form values
  const initialValues = {
    email: '',
    password: '',
  }
  
  // Handle form submission
  const handleSubmit = async (values: { email: string, password: string }, { setSubmitting }: any) => {
    try {
      await login(values.email, values.password)
      setLoginSuccess(true)
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        // The redirection is now handled by the <Navigate> component in App.tsx
        // based on the user's role from AuthContext
        navigate('/')
      }, 1000)
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <LoginContainer>
      <LoginContent>
        <HeaderSection>
          <LogoContainer>
            <LogoIcon>
              <FaHospital />
            </LogoIcon>
            <LogoText>Clinic Portal</LogoText>
          </LogoContainer>
          <HeaderActions>
            <HeaderButton onClick={() => navigate('/login')}>Log In</HeaderButton>
            <HeaderButtonFilled onClick={() => navigate('/register')}>Create a free account</HeaderButtonFilled>
          </HeaderActions>
        </HeaderSection>
        
        <LoginOptionsContainer>
          <LoginOption>
            <OptionTitle>For Patients</OptionTitle>
            <OptionDescription>
              Book appointments, access medical records, view prescriptions, and communicate with your healthcare providers.
            </OptionDescription>
            <LoginFormContainer>
              <FormTitle>Patient Login</FormTitle>
              
              {error && userType === 'patient' && <AlertMessage type="error">{error}</AlertMessage>}
              {loginSuccess && userType === 'patient' && (
                <AlertMessage type="success">Login successful! Redirecting...</AlertMessage>
              )}
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, formikBag) => {
                  setUserType('patient');
                  handleSubmit(values, formikBag);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
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
                          placeholder="patient@example.com"
                        />
                      </InputGroup>
                      <ErrorMessage name="email">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
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
                    
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && userType === 'patient' ? 'Signing in...' : 'Sign in as Patient'}
                    </Button>
                  </Form>
                )}
              </Formik>
              
              <FormFooter>
                <div>Don't have an account? <FooterLink to="/register">Register here</FooterLink></div>
                <div style={{ marginTop: '0.5rem' }}>
                  <FooterLink to="/forgot-password">Forgot your password?</FooterLink>
                </div>
              </FormFooter>
            </LoginFormContainer>
          </LoginOption>
          
          <DividerLine />
          
          <LoginOption>
            <OptionTitle>For Clinicians</OptionTitle>
            <OptionDescription>
              Manage patient appointments, update medical records, write prescriptions, and view your schedule.
            </OptionDescription>
            <LoginFormContainer>
              <FormTitle>Clinician Login</FormTitle>
              
              {error && userType === 'clinician' && <AlertMessage type="error">{error}</AlertMessage>}
              {loginSuccess && userType === 'clinician' && (
                <AlertMessage type="success">Login successful! Redirecting...</AlertMessage>
              )}
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, formikBag) => {
                  setUserType('clinician');
                  // Modify the email to indicate this is a clinician login
                  const clinicianValues = {
                    ...values,
                    email: values.email.includes('@') 
                      ? values.email.replace('@', '-clinician@') 
                      : `${values.email}-clinician@example.com`
                  };
                  handleSubmit(clinicianValues, formikBag);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FormGroup>
                      <FormLabel htmlFor="clinician_email">Email</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaEnvelope />
                        </InputIcon>
                        <StyledInput
                          type="email"
                          id="clinician_email"
                          name="email"
                          placeholder="doctor@example.com"
                        />
                      </InputGroup>
                      <ErrorMessage name="email">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="clinician_password">Password</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaLock />
                        </InputIcon>
                        <StyledInput
                          type="password"
                          id="clinician_password"
                          name="password"
                          placeholder="••••••••"
                        />
                      </InputGroup>
                      <ErrorMessage name="password">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && userType === 'clinician' ? 'Signing in...' : 'Sign in as Clinician'}
                    </Button>
                  </Form>
                )}
              </Formik>
              
              <FormFooter>
                <div>Contact administrator for clinician access</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <FooterLink to="/forgot-password">Forgot your password?</FooterLink>
                </div>
              </FormFooter>
            </LoginFormContainer>
          </LoginOption>
        </LoginOptionsContainer>
      </LoginContent>
    </LoginContainer>
  )
}

export default Login 