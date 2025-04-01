import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SalesChart } from '../components/dashboard/charts/SalesChart';
import { ProductPerformanceChart } from '../components/dashboard/charts/ProductPerformanceChart';
import { ExpensesPieChart } from '../components/dashboard/charts/ExpensesPieChart';
import { CustomerStats } from '../types/dashboard';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: repeat(12, 1fr);
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  grid-column: span 3;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 12;
  }
`;

const ChartWrapper = styled.div`
  grid-column: span 6;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 12;
  }
`;

const StatTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 0.875rem;
`;

const StatValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatPercentage = styled.div<{ trend: 'up' | 'down' }>`
  color: ${({ theme, trend }) => 
    trend === 'up' ? theme.colors.success.main : theme.colors.error.main};
  font-size: 0.875rem;
`;

const customerStats: CustomerStats[] = [
  {
    title: 'مشتریان جدید',
    value: 145,
    percentage: 12.5,
    trend: 'up'
  },
  {
    title: 'سفارشات امروز',
    value: 43,
    percentage: 8.2,
    trend: 'up'
  },
  {
    title: 'درآمد امروز',
    value: 15600000,
    percentage: -2.4,
    trend: 'down'
  },
  {
    title: 'بازدید فروشگاه',
    value: 2390,
    percentage: 15.3,
    trend: 'up'
  }
];

const Dashboard = () => {
  return (
    <DashboardContainer>
      {customerStats.map((stat, index) => (
        <StatCard
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatTitle>{stat.title}</StatTitle>
          <StatValue>
            {typeof stat.value === 'number' && stat.title.includes('درآمد')
              ? `${stat.value.toLocaleString()} ریال`
              : stat.value.toLocaleString()}
          </StatValue>
          <StatPercentage trend={stat.trend}>
            {stat.trend === 'up' ? '↑' : '↓'} {Math.abs(stat.percentage)}%
          </StatPercentage>
        </StatCard>
      ))}

      <ChartWrapper>
        <SalesChart />
      </ChartWrapper>

      <ChartWrapper>
        <ProductPerformanceChart />
      </ChartWrapper>

      <ChartWrapper>
        <ExpensesPieChart />
      </ChartWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;