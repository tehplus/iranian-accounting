import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MenuItem as MenuItemType } from '../../../types/menu';
import * as Icons from '@mui/icons-material';
import { KeyboardArrowDown, KeyboardArrowLeft } from '@mui/icons-material';
import { menuIcons } from '../menuIcons';

interface MenuItemProps {
  item: MenuItemType;
  isOpen?: boolean;
  level?: number;
  onClick?: () => void;
}

const MenuItemContainer = styled.div<{ level?: number; isActive?: boolean }>`
  padding: ${({ level = 0 }) => `8px ${level * 16 + 16}px`};
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : theme.colors.text.primary};
  background-color: ${({ theme, isActive }) => 
    isActive ? `${theme.colors.primary.main}10` : 'transparent'};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary.main}10`};
  }
`;

const IconWrapper = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const Title = styled.span`
  flex: 1;
  font-size: 0.875rem;
`;

const ArrowIcon = styled.div<{ isOpen?: boolean }>`
  transform: ${({ isOpen }) => isOpen ? 'rotate(-90deg)' : 'none'};
  transition: transform 0.3s ease;
`;

const SubMenu = styled.div<{ isOpen?: boolean }>`
  height: ${({ isOpen }) => isOpen ? 'auto' : '0'};
  overflow: hidden;
  transition: height 0.3s ease;
`;

export const MenuItem: React.FC<MenuItemProps> = ({ 
  item, 
  isOpen, 
  level = 0,
  onClick 
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = item.path === location.pathname;

  const handleClick = () => {
    if (item.children) {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else if (item.path) {
      navigate(item.path);
    }
    onClick?.();
  };

  const IconComponent = item.icon ? menuIcons[item.icon] : null;

  return (
    <>
      <MenuItemContainer
        level={level}
        isActive={isActive}
        onClick={handleClick}
      >
        {IconComponent && (
          <IconWrapper>
            <IconComponent fontSize="small" />
          </IconWrapper>
        )}
        <Title>{item.title}</Title>
        {item.children && (
          <ArrowIcon isOpen={isSubMenuOpen}>
            <KeyboardArrowLeft fontSize="small" />
          </ArrowIcon>
        )}
      </MenuItemContainer>
      {item.children && (
        <SubMenu isOpen={isSubMenuOpen}>
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              onClick={onClick}
            />
          ))}
        </SubMenu>
      )}
    </>
  );
};