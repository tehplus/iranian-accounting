import { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SalesChart } from '../components/dashboard/charts/SalesChart';
import { ProductAnalyticsChart } from '../components/dashboard/charts/ProductAnalyticsChart';
import { ExpensesChart } from '../components/dashboard/charts/ExpensesChart';

// استایل‌های کامپوننت
const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: repeat(12, 1fr);
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

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
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
`;

const StatValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 600;
`;

const StatChange = styled.div<{ trend: 'up' | 'down' }>`
  color: ${({ theme, trend }) => 
    trend === 'up' ? theme.colors.success.main : theme.colors.error.main};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '${({ trend }) => trend === 'up' ? '↑' : '↓'}';
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// انیمیشن‌های کارت‌ها
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

// داده‌های آماری
const statsData = [
  {
    title: 'فروش امروز',
    value: 12500000,
    change: 12.5,
    trend: 'up' as const,
    color: '#6366f1',
    icon: '💰'
  },
  {
    title: 'سفارشات',
    value: 43,
    change: 8.2,
    trend: 'up' as const,
    color: '#10b981',
    icon: '📦'
  },
  {
    title: 'بازدیدکنندگان',
    value: 1567,
    change: -2.4,
    trend: 'down' as const,
    color: '#f59e0b',
    icon: '👥'
  },
  {
    title: 'میانگین سبد خرید',
    value: 850000,
    change: 15.3,
    trend: 'up' as const,
    color: '#3b82f6',
    icon: '🛒'
  }
];

const Dashboard = () => {
  useEffect(() => {
    // در اینجا می‌توانیم داده‌های واقعی را از API دریافت کنیم
    document.title = 'داشبورد مدیریت | سیستم حسابداری';
  }, []);

  return (
    <DashboardContainer>
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.title}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={cardVariants}
        >
          <StatIcon color={stat.color}>{stat.icon}</StatIcon>
          <StatTitle>{stat.title}</StatTitle>
          <StatValue>
            {stat.title.includes('فروش') || stat.title.includes('سبد') 
              ? new Intl.NumberFormat('fa-IR', {
                  style: 'currency',
                  currency: 'IRR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(stat.value)
              : new Intl.NumberFormat('fa-IR').format(stat.value)
            }
          </StatValue>
          <StatChange trend={stat.trend}>
            {Math.abs(stat.change)}٪ نسبت به ماه قبل
          </StatChange>
        </StatCard>
      ))}

      <ChartWrapper>
        <SalesChart />
      </ChartWrapper>

      <ChartWrapper>
        <ProductAnalyticsChart />
      </ChartWrapper>

      <ChartWrapper style={{ gridColumn: 'span 12' }}>
        <ExpensesChart />
      </ChartWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;