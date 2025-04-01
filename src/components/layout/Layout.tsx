import { ReactNode } from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  margin-right: 280px;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.default};
  min-height: 100vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}

export default Layout;