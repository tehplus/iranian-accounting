import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f8fafc;
`;

const MainLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </Layout>
  );
};

export default MainLayout;