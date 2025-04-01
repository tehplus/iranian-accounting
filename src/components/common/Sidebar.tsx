import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 280px;
  background-color: #ffffff;
  border-left: 1px solid #e2e8f0;
  height: 100vh;
  padding: 2rem 0;
`;

const Logo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  font-family: 'AnjomanMax';
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled(Link)<{ $active?: boolean }>`
  padding: 0.75rem 2rem;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray[600]};
  background-color: ${props => props.$active ? props.theme.colors.gray[50] : 'transparent'};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.primary};
  }
`;

const SubMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  padding-right: 2.5rem;
`;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState<string[]>(['persons']);

  const isActive = (path: string) => location.pathname === path;
  const isMenuOpen = (menuId: string) => openMenus.includes(menuId);

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <SidebarContainer>
      <Logo>فروشگاه من</Logo>
      <Menu>
        <MenuItem to="/" $active={isActive('/')}>
          داشبورد
        </MenuItem>

        {/* منوی اشخاص */}
        <MenuItem 
          to="#" 
          $active={location.pathname.startsWith('/persons')}
          onClick={() => toggleMenu('persons')}
        >
          اشخاص
        </MenuItem>
        <SubMenu $isOpen={isMenuOpen('persons')}>
          <MenuItem to="/persons/new" $active={isActive('/persons/new')}>
            شخص جدید
          </MenuItem>
          <MenuItem to="/persons" $active={isActive('/persons')}>
            لیست اشخاص
          </MenuItem>
        </SubMenu>

        {/* سایر منوها */}
        {/* ... */}
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;