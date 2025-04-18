import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
  Color
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, createGradient, chartStyles } from '../../../config/chartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartContainer = styled.div`
  ${chartStyles.cardStyle}
`;

const ChartTitle = styled.h3`
  ${chartStyles.titleStyle}
`;

interface ExpenseDataPoint {
  month: string;
  fixed: number;
  variable: number;
}

const expenseData: ExpenseDataPoint[] = [
  { month: 'فروردین', fixed: 12500000, variable: 8500000 },
  { month: 'اردیبهشت', fixed: 12500000, variable: 9200000 },
  { month: 'خرداد', fixed: 12800000, variable: 9800000 },
  { month: 'تیر', fixed: 12800000, variable: 11500000 },
  { month: 'مرداد', fixed: 13000000, variable: 10800000 },
  { month: 'شهریور', fixed: 13000000, variable: 12000000 },
  { month: 'مهر', fixed: 13500000, variable: 13200000 },
  { month: 'آبان', fixed: 13500000, variable: 12800000 },
  { month: 'آذر', fixed: 14000000, variable: 13500000 },
  { month: 'دی', fixed: 14000000, variable: 14200000 },
  { month: 'بهمن', fixed: 14500000, variable: 13800000 },
  { month: 'اسفند', fixed: 14500000, variable: 15500000 }
];

const chartData: ChartData<'line'> = {
  labels: expenseData.map(data => data.month),
  datasets: [
    {
      label: 'هزینه‌های ثابت',
      data: expenseData.map(data => data.fixed),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    },
    {
      label: 'هزینه‌های متغیر',
      data: expenseData.map(data => data.variable),
      borderColor: '#f43f5e',
      backgroundColor: 'rgba(244, 63, 94, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }
  ]
};

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      rtl: true,
      labels: {
        font: {
          family: 'AnjomanMax',
          size: 12
        },
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      rtl: true,
      titleFont: {
        family: 'AnjomanMax',
        size: 13
      },
      bodyFont: {
        family: 'AnjomanMax',
        size: 12
      },
      padding: 12,
      backgroundColor: 'rgba(30, 41, 59, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      displayColors: true,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('fa-IR', {
              style: 'currency',
              currency: 'IRR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'AnjomanMax',
          size: 12
        }
      }
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        color: 'rgba(99, 102, 241, 0.1)',
        display: true,
        lineWidth: 1,
        tickColor: 'rgba(99, 102, 241, 0.1)',
        tickWidth: 1,
        offset: true
      },
      ticks: {
        font: {
          family: 'AnjomanMax',
          size: 12
        },
        callback: function(value) {
          return new Intl.NumberFormat('fa-IR', {
            style: 'currency',
            currency: 'IRR',
            notation: 'compact',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(value as number);
        }
      }
    }
  }
};

export const ExpensesChart = () => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient1 = createGradient(ctx, ['rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0.0)']);
    const gradient2 = createGradient(ctx, ['rgba(244, 63, 94, 0.5)', 'rgba(244, 63, 94, 0.0)']);

    const newData = {
      ...chartData,
      datasets: chartData.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: index === 0 ? gradient1 : gradient2
      }))
    };

    chart.data = newData;
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>نمودار هزینه‌های ماهانه</ChartTitle>
      <Line 
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </ChartContainer>
  );
};

export default ExpensesChart;