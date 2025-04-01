import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, chartStyles } from '../../../config/chartConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  ${chartStyles.cardStyle}
`;

const ChartTitle = styled.h3`
  ${chartStyles.titleStyle}
`;

const ChartContent = styled.div`
  position: relative;
  height: calc(100% - 60px);
`;

// داده‌های موک برای نمایش نمودار
const expensesData = {
  labels: ['حقوق و دستمزد', 'اجاره', 'تجهیزات', 'بازاریابی', 'حمل و نقل', 'سایر'],
  datasets: [{
    data: [4500000, 3000000, 2000000, 1500000, 1200000, 800000],
    backgroundColor: [
      '#6366f1',
      '#10b981',
      '#f59e0b',
      '#3b82f6',
      '#ef4444',
      '#8b5cf6'
    ],
    borderColor: '#ffffff',
    borderWidth: 2,
    hoverOffset: 4
  }]
};

// تنظیمات اختصاصی نمودار
const options = {
  ...baseChartOptions,
  plugins: {
    ...baseChartOptions.plugins,
    title: {
      display: false
    },
    tooltip: {
      ...baseChartOptions.plugins?.tooltip,
      callbacks: {
        label: function(context: any) {
          const label = context.label || '';
          const value = context.raw;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${new Intl.NumberFormat('fa-IR', {
            style: 'currency',
            currency: 'IRR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(value)} (${percentage}%)`;
        }
      }
    },
    legend: {
      position: 'right' as const,
      rtl: true
    }
  },
  cutout: '60%',
  animation: {
    animateScale: true,
    animateRotate: true
  }
};

export const ExpensesChart = () => {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    
    // به‌روزرسانی نمودار
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>تحلیل هزینه‌های سازمانی</ChartTitle>
      <ChartContent>
        <Doughnut ref={chartRef} data={expensesData} options={options} />
      </ChartContent>
    </ChartContainer>
  );
};