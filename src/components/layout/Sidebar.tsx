import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 280px;
  background: #ffffff;
  border-left: 1px solid #e2e8f0;
  padding: 2rem 0;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #6366f1;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled.div<{ $active?: boolean }>`
  padding: 0.75rem 2rem;
  color: ${props => props.$active ? '#6366f1' : '#64748b'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  background: ${props => props.$active ? '#eff6ff' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
    color: #6366f1;
  }
`;

const SubMenu = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  background: #f8fafc;
`;

const SubMenuItem = styled(Link)<{ $active?: boolean }>`
  padding: 0.75rem 3rem;
  color: ${props => props.$active ? '#6366f1' : '#64748b'};
  text-decoration: none;
  font-weight: 500;
  display: block;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: #f1f5f9;
    color: #6366f1;
  }
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
  transform: ${props => props.$isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
  display: inline-block;
  margin-right: 0.5rem;
  &:after {
    content: '▼';
    font-size: 0.8rem;
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'داشبورد',
      path: '/dashboard',
    },
    {
    id: 'persons',
    label: 'اشخاص',
    path: '/persons',
      subItems: [
      { path: '/persons/new', label: 'افزودن شخص جدید' },
      { path: '/persons/list', label: 'لیست اشخاص' },
        { path: '/persons/categories', label: 'دسته‌بندی اشخاص' }
      ]
    },
    {
      id: 'products',
      label: 'کالاها',
      path: '/products',
      subItems: [
        { path: '/products/new', label: 'افزودن کالای جدید' },
        { path: '/products/list', label: 'لیست کالاها' },
        { path: '/products/categories', label: 'دسته‌بندی کالاها' },
        { path: '/products/inventory', label: 'موجودی انبار' }
      ]
    },
    {
      id: 'invoices',
      label: 'فاکتورها',
      path: '/invoices',
      subItems: [
        { path: '/invoices/sales/new', label: 'فاکتور فروش جدید' },
        { path: '/invoices/sales/list', label: 'لیست فاکتورهای فروش' },
        { path: '/invoices/purchases/new', label: 'فاکتور خرید جدید' },
        { path: '/invoices/purchases/list', label: 'لیست فاکتورهای خرید' }
      ]
    },
    {
      id: 'treasury',
      label: 'خزانه‌داری',
      path: '/treasury',
      subItems: [
        { path: '/treasury/transactions/new', label: 'تراکنش جدید' },
        { path: '/treasury/transactions/list', label: 'لیست تراکنش‌ها' },
        { path: '/treasury/accounts', label: 'حساب‌های بانکی' },
        { path: '/treasury/cash', label: 'صندوق' }
      ]
    },
    {
      id: 'reports',
      label: 'گزارشات',
      path: '/reports',
      subItems: [
        { path: '/reports/sales', label: 'گزارش فروش' },
        { path: '/reports/purchases', label: 'گزارش خرید' },
        { path: '/reports/inventory', label: 'گزارش موجودی' },
        { path: '/reports/financial', label: 'گزارش مالی' },
        { path: '/reports/profit-loss', label: 'سود و زیان' }
      ]
    },
    {
      id: 'settings',
      label: 'تنظیمات',
      path: '/settings',
      subItems: [
        { path: '/settings/company', label: 'اطلاعات شرکت' },
        { path: '/settings/users', label: 'مدیریت کاربران' },
        { path: '/settings/backup', label: 'پشتیبان‌گیری' },
        { path: '/settings/preferences', label: 'تنظیمات عمومی' }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isMenuOpen = (menuId: string) => openMenus.includes(menuId);

  const isItemActive = (path: string) => location.pathname === path;

  const isMenuActive = (item: typeof menuItems[0]) => {
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.path);
    }
    return location.pathname === item.path;
  };

  return (
    <SidebarContainer>
      <Logo>حسابداری</Logo>
      <NavMenu>
        {menuItems.map(item => (
          <NavItem key={item.id}>
            {item.subItems ? (
              <>
                <NavLink 
                  $active={isMenuActive(item)}
                  onClick={() => toggleMenu(item.id)}
                >
                  {item.label}
                  <Arrow $isOpen={isMenuOpen(item.id)} />
                </NavLink>
                <SubMenu $isOpen={isMenuOpen(item.id)}>
                  {item.subItems.map(subItem => (
                    <SubMenuItem
                      key={subItem.path}
                      to={subItem.path}
                      $active={isItemActive(subItem.path)}
                    >
                      {subItem.label}
                    </SubMenuItem>
                  ))}
                </SubMenu>
              </>
            ) : (
              <NavLink 
                as={Link}
                to={item.path}
                $active={isItemActive(item.path)}
              >
                {item.label}
              </NavLink>
            )}
          </NavItem>
        ))}
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;