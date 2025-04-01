import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const UserName = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

const Header: React.FC = () => {
  const user = {
    name: 'کاربر سیستم',
    initials: 'ک'
  };

  return (
    <HeaderContainer>
      <HeaderTitle>سیستم حسابداری فروشگاهی</HeaderTitle>
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserAvatar>{user.initials}</UserAvatar>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;