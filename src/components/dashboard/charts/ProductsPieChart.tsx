import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  DefaultDataPoint,
  ScriptableContext,
  Color
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { baseChartOptions, chartStyles } from '../../../config/chartConfig';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  ${chartStyles.cardStyle}
`;

const ChartTitle = styled.h3`
  ${chartStyles.titleStyle}
`;

interface CategoryData {
  category: string;
  count: number;
  color: string;
}

const categories: CategoryData[] = [
  { category: 'لپ‌تاپ و کامپیوتر', count: 35, color: 'rgba(99, 102, 241, 0.8)' },
  { category: 'موبایل و تبلت', count: 25, color: 'rgba(16, 185, 129, 0.8)' },
  { category: 'لوازم جانبی', count: 20, color: 'rgba(251, 146, 60, 0.8)' },
  { category: 'قطعات', count: 12, color: 'rgba(139, 92, 246, 0.8)' },
  { category: 'گیمینگ', count: 8, color: 'rgba(236, 72, 153, 0.8)' }
];

type PieDataType = ChartData<'pie', number[], string>;

const pieData: PieDataType = {
  labels: categories.map(cat => cat.category),
  datasets: [
    {
      data: categories.map(cat => cat.count),
      backgroundColor: categories.map(cat => cat.color) as Color[],
      borderWidth: 0,
      hoverOffset: 4
    }
  ]
};

const options: ChartOptions<'pie'> = {
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
        generateLabels: (chart) => {
          const dataset = chart.data.datasets[0];
          const data = dataset.data as number[];
          const total = data.reduce((sum, value) => sum + value, 0);
          const labels = chart.data.labels as string[];
          const colors = dataset.backgroundColor as string[];
          
          return labels.map((label, index) => ({
            text: `${label} (${new Intl.NumberFormat('fa-IR').format((data[index] / total) * 100)}٪)`,
            fillStyle: colors[index],
            hidden: false,
            lineCap: undefined,
            lineDash: undefined,
            lineDashOffset: undefined,
            lineJoin: undefined,
            lineWidth: undefined,
            strokeStyle: undefined,
            pointStyle: 'circle',
            rotation: undefined,
            textAlign: undefined,
            datasetIndex: 0,
            index
          }));
        }
      }
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
          const dataset = context.dataset;
          const data = dataset.data as number[];
          const total = data.reduce((sum, value) => sum + value, 0);
          const value = context.parsed;
          const percentage = ((value / total) * 100).toFixed(1);
          
          return ` ${context.label}: ${new Intl.NumberFormat('fa-IR').format(value)} (${new Intl.NumberFormat('fa-IR').format(Number(percentage))}٪)`;
        }
      }
    }
  }
};

export const ProductsPieChart = () => {
  const chartRef = useRef<ChartJS<'pie'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // اینجا می‌توانیم تنظیمات اضافی نمودار را اعمال کنیم
    chart.update();
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>توزیع دسته‌بندی محصولات</ChartTitle>
      <Pie 
        ref={chartRef}
        data={pieData}
        options={options}
      />
    </ChartContainer>
  );
};

export default ProductsPieChart;