import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
  overflow-y: auto;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Navbar />
        <MainContent>
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </MainContent>
      </div>
    </LayoutContainer>
  )
}

export default Layout 