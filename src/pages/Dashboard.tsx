import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: 'AnjomanMax';
  font-size: 2rem;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 2rem;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Title>داشبورد</Title>
      {/* سایر اجزای داشبورد */}
    </DashboardContainer>
  );
};

export default Dashboard;