import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, chartStyles } from '../../../config/chartConfig';

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

// داده‌های موک برای نمایش نمودار
const productData = {
  labels: ['گوشی موبایل', 'لپ تاپ', 'تبلت', 'هدفون', 'شارژر', 'پاوربانک'],
  datasets: [
    {
      type: 'bar' as const,
      label: 'موجودی',
      data: [150, 90, 120, 300, 450, 250],
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
      borderWidth: 2,
      borderRadius: 4,
    },
    {
      type: 'bar' as const,
      label: 'فروش ماه جاری',
      data: [80, 45, 65, 200, 300, 180],
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      borderWidth: 2,
      borderRadius: 4,
    },
    {
      type: 'line' as const,
      label: 'میانگین فروش',
      data: [100, 60, 80, 250, 350, 200],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    }
  ]
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
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales?.y,
      ticks: {
        ...baseChartOptions.scales?.y?.ticks,
        callback: function(value: any) {
          return new Intl.NumberFormat('fa-IR').format(value) + ' عدد';
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};

export const ProductAnalyticsChart = () => {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // به‌روزرسانی نمودار
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>تحلیل موجودی و فروش محصولات</ChartTitle>
      <Chart ref={chartRef} type='bar' data={productData} options={options} />
    </ChartContainer>
  );
};