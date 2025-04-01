import React from 'react';
import styled from 'styled-components';
import { SalesChart } from './charts/SalesChart';
import { ProductAnalyticsChart } from './charts/ProductAnalyticsChart';
import { ProductsPieChart } from './charts/ProductsPieChart';
import { ExpensesChart } from './charts/ExpensesChart';
import { InventoryChart } from './charts/InventoryChart';
import { RevenueChart } from './charts/RevenueChart';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

const ChartWrapper = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const ChartsGrid: React.FC = () => {
  return (
    <GridContainer>
      {/* نمودار فروش - تمام عرض */}
      <ChartWrapper className="full-width">
        <SalesChart />
      </ChartWrapper>

      {/* نمودار تحلیل محصولات */}
      <ChartWrapper>
        <ProductAnalyticsChart />
      </ChartWrapper>

      {/* نمودار دایره‌ای محصولات */}
      <ChartWrapper>
        <ProductsPieChart />
      </ChartWrapper>

      {/* نمودار هزینه‌ها */}
      <ChartWrapper>
        <ExpensesChart />
      </ChartWrapper>

      {/* نمودار موجودی */}
      <ChartWrapper>
        <InventoryChart />
      </ChartWrapper>

      {/* نمودار درآمد - تمام عرض */}
      <ChartWrapper className="full-width">
        <RevenueChart />
      </ChartWrapper>
    </GridContainer>
  );
};

export default ChartsGrid;