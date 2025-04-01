import styled from 'styled-components';
import { Sidebar } from './Sidebar/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  margin-right: 280px;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.default};
`;

function Layout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <h1>سیستم حسابداری فروشگاه</h1>
      </MainContent>
    </LayoutContainer>
  );
}

export default Layout;