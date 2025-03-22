import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
`

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: #3182ce;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 576px) {
    font-size: 4rem;
  }
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin: 1rem 0 2rem;
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`

const Description = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
  max-width: 500px;
  margin-bottom: 2.5rem;
`

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #3182ce;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
    text-decoration: none;
  }
`

const NotFound = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Description>
      <HomeButton to="/">
        <FaHome />
        Return to Home
      </HomeButton>
    </Container>
  )
}

export default NotFound 