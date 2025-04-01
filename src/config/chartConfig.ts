import { ChartOptions } from 'chart.js';

// تنظیمات پایه مشترک برای همه نمودارها
export const baseChartOptions: ChartOptions = {
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
            label += new Intl.NumberFormat('fa-IR').format(context.parsed.y);
          }
          return label;
        }
      }
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
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
      grid: {
        borderDash: [5, 5],
        drawBorder: false,
      },
      ticks: {
        font: {
          family: 'AnjomanMax',
          size: 12,
        },
        callback: function(value) {
          return new Intl.NumberFormat('fa-IR').format(value as number);
        }
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 6,
    },
  },
};

// تابع ایجاد گرادیانت برای پس‌زمینه نمودارها
export const createGradient = (ctx: CanvasRenderingContext2D, colors: string[]) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  return gradient;
};

// تنظیمات ظاهری مشترک برای همه نمودارها
export const chartStyles = {
  cardStyle: {
    background: '#ffffff',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgb(99 102 241 / 0.1)',
    height: '400px',
  },
  titleStyle: {
    color: '#1e293b',
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '1rem',
    fontFamily: 'AnjomanMax',
  },
};