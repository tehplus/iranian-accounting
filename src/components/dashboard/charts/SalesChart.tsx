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
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, createGradient, chartStyles } from '../../../config/chartConfig';

// ثبت کامپوننت‌های مورد نیاز Chart.js
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

// داده‌های موک برای نمایش نمودار
const salesData = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
           'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  datasets: [
    {
      label: 'فروش',
      data: [1200000, 1900000, 3000000, 5000000, 4800000, 8000000, 
             9200000, 9800000, 8500000, 9100000, 9500000, 11000000],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: 'سود',
      data: [300000, 500000, 800000, 1300000, 1200000, 2100000,
             2400000, 2600000, 2200000, 2400000, 2500000, 2900000],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    }
  ]
};

export const SalesChart = () => {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient1 = createGradient(ctx, ['rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0.0)']);
    const gradient2 = createGradient(ctx, ['rgba(16, 185, 129, 0.5)', 'rgba(16, 185, 129, 0.0)']);

    // به‌روزرسانی رنگ‌های نمودار
    salesData.datasets[0].backgroundColor = gradient1;
    salesData.datasets[0].borderColor = '#6366f1';
    salesData.datasets[1].backgroundColor = gradient2;
    salesData.datasets[1].borderColor = '#10b981';

    chart.update();
  }, []);

  // تنظیمات اختصاصی نمودار فروش
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
    scales: {
      ...baseChartOptions.scales,
      y: {
        ...baseChartOptions.scales?.y,
        ticks: {
          ...baseChartOptions.scales?.y?.ticks,
          callback: function(value: any) {
            return new Intl.NumberFormat('fa-IR', {
              style: 'currency',
              currency: 'IRR',
              notation: 'compact',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(value);
          }
        }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartTitle>نمودار فروش و سود سالانه</ChartTitle>
      <Line ref={chartRef} data={salesData} options={options} />
    </ChartContainer>
  );
};