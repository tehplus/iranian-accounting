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
  ScriptableContext,
  ScriptableScaleContext,
  Scale,
  CoreScaleOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, createGradient, chartStyles, ChartDataType } from '../../../config/chartConfig';

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

type DatasetType = {
  label: string;
  data: number[];
  borderWidth: number;
  fill: boolean;
  tension: number;
  backgroundColor: string | CanvasGradient;
  borderColor: string;
};

// داده‌های نمودار با تایپ صحیح
const salesData: ChartData<'line', number[], string> = {
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
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderColor: '#6366f1',
    },
    {
      label: 'سود',
      data: [300000, 500000, 800000, 1300000, 1200000, 2100000,
             2400000, 2600000, 2200000, 2400000, 2500000, 2900000],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10b981',
    }
  ]
};

// تنظیمات اختصاصی نمودار با تایپ صحیح
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
  },
  elements: {
    line: {
      tension: 0.4
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 6,
      backgroundColor: 'white',
      borderWidth: 2
    }
  }
};

export const SalesChart = () => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient1 = createGradient(ctx, ['rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0.0)']);
    const gradient2 = createGradient(ctx, ['rgba(16, 185, 129, 0.5)', 'rgba(16, 185, 129, 0.0)']);

    // به‌روزرسانی رنگ‌های نمودار
    const newData = {
      ...salesData,
      datasets: salesData.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: index === 0 ? gradient1 : gradient2
      }))
    };

    chart.data = newData;
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>نمودار فروش و سود سالانه</ChartTitle>
      <Line 
        ref={chartRef}
        data={salesData}
        options={options}
      />
    </ChartContainer>
  );
};

export default SalesChart;