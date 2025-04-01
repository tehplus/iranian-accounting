import styled from 'styled-components';
import { MenuItem } from './MenuItem';
import { menuItems } from '../../../config/menuItems';

const SidebarContainer = styled.div`
  width: 280px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-left: 1px solid ${({ theme }) => theme.colors.divider};
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  padding-top: 16px;
  
  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary.light};
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary.main};
  }
`;

const Logo = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 16px;
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>سیستم حسابداری فروشگاه</Logo>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </SidebarContainer>
  );
};