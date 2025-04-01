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
  ChartOptions
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

interface RevenueDataPoint {
  month: string;
  grossRevenue: number;
  netRevenue: number;
  operatingCosts: number;
}

const revenueData: RevenueDataPoint[] = [
  { month: 'فروردین', grossRevenue: 25000000, netRevenue: 18500000, operatingCosts: 6500000 },
  { month: 'اردیبهشت', grossRevenue: 28000000, netRevenue: 20800000, operatingCosts: 7200000 },
  { month: 'خرداد', grossRevenue: 32000000, netRevenue: 24200000, operatingCosts: 7800000 },
  { month: 'تیر', grossRevenue: 38000000, netRevenue: 28500000, operatingCosts: 9500000 },
  { month: 'مرداد', grossRevenue: 35000000, netRevenue: 26200000, operatingCosts: 8800000 },
  { month: 'شهریور', grossRevenue: 42000000, netRevenue: 31500000, operatingCosts: 10500000 },
  { month: 'مهر', grossRevenue: 45000000, netRevenue: 33800000, operatingCosts: 11200000 },
  { month: 'آبان', grossRevenue: 43000000, netRevenue: 32200000, operatingCosts: 10800000 },
  { month: 'آذر', grossRevenue: 48000000, netRevenue: 36000000, operatingCosts: 12000000 },
  { month: 'دی', grossRevenue: 52000000, netRevenue: 39000000, operatingCosts: 13000000 },
  { month: 'بهمن', grossRevenue: 50000000, netRevenue: 37500000, operatingCosts: 12500000 },
  { month: 'اسفند', grossRevenue: 58000000, netRevenue: 43500000, operatingCosts: 14500000 }
];

const chartData: ChartData<'line'> = {
  labels: revenueData.map(data => data.month),
  datasets: [
    {
      label: 'درآمد ناخالص',
      data: revenueData.map(data => data.grossRevenue),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    },
    {
      label: 'درآمد خالص',
      data: revenueData.map(data => data.netRevenue),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    },
    {
      label: 'هزینه‌های عملیاتی',
      data: revenueData.map(data => data.operatingCosts),
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

export const RevenueChart = () => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient1 = createGradient(ctx, ['rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0.0)']);
    const gradient2 = createGradient(ctx, ['rgba(16, 185, 129, 0.5)', 'rgba(16, 185, 129, 0.0)']);
    const gradient3 = createGradient(ctx, ['rgba(244, 63, 94, 0.5)', 'rgba(244, 63, 94, 0.0)']);

    const newData = {
      ...chartData,
      datasets: chartData.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: index === 0 ? gradient1 : index === 1 ? gradient2 : gradient3
      }))
    };

    chart.data = newData;
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>نمودار درآمد و هزینه‌های عملیاتی</ChartTitle>
      <Line 
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </ChartContainer>
  );
};

export default RevenueChart;