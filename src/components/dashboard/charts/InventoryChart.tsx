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
  ChartOptions,
  Color
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

interface InventoryDataPoint {
  category: string;
  inStock: number;
  minRequired: number;
  maxAllowed: number;
}

const inventoryData: InventoryDataPoint[] = [
  { category: 'لپ‌تاپ', inStock: 85, minRequired: 50, maxAllowed: 150 },
  { category: 'موبایل', inStock: 120, minRequired: 70, maxAllowed: 200 },
  { category: 'تبلت', inStock: 45, minRequired: 30, maxAllowed: 100 },
  { category: 'ساعت هوشمند', inStock: 65, minRequired: 40, maxAllowed: 120 },
  { category: 'هدفون', inStock: 95, minRequired: 60, maxAllowed: 180 },
  { category: 'پاوربانک', inStock: 55, minRequired: 35, maxAllowed: 110 }
];

const chartData: ChartData<'bar'> = {
  labels: inventoryData.map(data => data.category),
  datasets: [
    {
      label: 'موجودی فعلی',
      data: inventoryData.map(data => data.inStock),
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 20
    },
    {
      label: 'حداقل موجودی',
      data: inventoryData.map(data => data.minRequired),
      backgroundColor: 'rgba(244, 63, 94, 0.8)',
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 20
    },
    {
      label: 'حداکثر مجاز',
      data: inventoryData.map(data => data.maxAllowed),
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 20
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
            label += new Intl.NumberFormat('fa-IR').format(context.parsed.y) + ' عدد';
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
          return new Intl.NumberFormat('fa-IR').format(value as number) + ' عدد';
        }
      }
    }
  }
};

export const InventoryChart = () => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // به‌روزرسانی چارت بعد از تغییرات
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>وضعیت موجودی انبار</ChartTitle>
      <Bar 
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </ChartContainer>
  );
};

export default InventoryChart;