import { useMemo } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ProductPerformance } from '../../../types/dashboard';

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

const mockData: ProductPerformance[] = [
  { name: 'گوشی موبایل', sales: 4000, stock: 2400, profit: 2400 },
  { name: 'لپ تاپ', sales: 3000, stock: 1398, profit: 2210 },
  { name: 'تبلت', sales: 2000, stock: 9800, profit: 2290 },
  { name: 'هدفون', sales: 2780, stock: 3908, profit: 2000 },
  { name: 'شارژر', sales: 1890, stock: 4800, profit: 2181 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}>
        <p style={{ margin: 0 }}>{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color, margin: '5px 0' }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ProductPerformanceChart = () => {
  const data = useMemo(() => mockData, []);

  return (
    <ChartContainer>
      <Title>عملکرد محصولات</Title>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name"
            tick={{ fill: '#666' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#666' }}
            tickLine={false}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="sales" name="فروش" fill="#8884d8" />
          <Bar dataKey="stock" name="موجودی" fill="#82ca9d" />
          <Bar dataKey="profit" name="سود" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};