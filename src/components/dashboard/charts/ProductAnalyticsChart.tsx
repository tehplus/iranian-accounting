import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, chartStyles } from '../../../config/chartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  ${chartStyles.cardStyle}
`;

const ChartTitle = styled.h3`
  ${chartStyles.titleStyle}
`;

const productData: ChartData<'bar', number[], string> = {
  labels: ['لپ‌تاپ', 'موبایل', 'تبلت', 'ساعت هوشمند', 'هدفون', 'پاوربانک'],
  datasets: [
    {
      label: 'فروش',
      data: [650, 590, 350, 320, 280, 240],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderRadius: 4,
      borderSkipped: false,
    },
    {
      label: 'موجودی',
      data: [120, 150, 80, 90, 70, 50],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderRadius: 4,
      borderSkipped: false,
    }
  ]
};

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      rtl: true,
      labels: {
        font: {
          family: 'AnjomanMax',
          size: 12,
        },
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      rtl: true,
      titleFont: {
        family: 'AnjomanMax',
        size: 13,
      },
      bodyFont: {
        family: 'AnjomanMax',
        size: 12,
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
            label += new Intl.NumberFormat('fa-IR').format(context.parsed.y) + ' عدد';
          }
          return label;
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'AnjomanMax',
          size: 12,
        },
      },
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
          size: 12,
        },
        callback: function(value) {
          return new Intl.NumberFormat('fa-IR').format(value as number) + ' عدد';
        }
      }
    }
  }
};

export const ProductAnalyticsChart = () => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // اینجا می‌توانیم تنظیمات اضافی نمودار را اعمال کنیم
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>تحلیل محصولات</ChartTitle>
      <Bar 
        ref={chartRef}
        data={productData}
        options={options}
      />
    </ChartContainer>
  );
};

export default ProductAnalyticsChart;