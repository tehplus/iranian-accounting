import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'AnjomanMax';
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const Header: React.FC = () => {
  const userName = "کاربر سیستم"; // این باید از سیستم مدیریت حساب کاربری گرفته شود

  return (
    <HeaderContainer>
      <Title>سیستم حسابداری فروشگاه</Title>
      <UserInfo>
        <UserName>{userName}</UserName>
        <Avatar>{userName[0]}</Avatar>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;