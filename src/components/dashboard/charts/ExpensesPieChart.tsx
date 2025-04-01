import { useMemo } from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { ExpenseData } from '../../../types/dashboard';

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  height: 400px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.25rem;
`;

const mockData: ExpenseData[] = [
  { category: 'حقوق و دستمزد', amount: 4000000, color: '#8884d8' },
  { category: 'اجاره', amount: 3000000, color: '#82ca9d' },
  { category: 'تجهیزات', amount: 2000000, color: '#ffc658' },
  { category: 'بازاریابی', amount: 1500000, color: '#ff7c43' },
  { category: 'سایر', amount: 1000000, color: '#666' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}>
        <p style={{ margin: 0 }}>{data.category}</p>
        <p style={{ color: data.color, margin: '5px 0' }}>
          {`مبلغ: ${data.amount.toLocaleString()} ریال`}
        </p>
      </div>
    );
  }
  return null;
};

export const ExpensesPieChart = () => {
  const data = useMemo(() => mockData, []);

  return (
    <ChartContainer>
      <Title>نمودار هزینه‌ها</Title>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};