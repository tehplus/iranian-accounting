import { ChartOptions } from 'chart.js';
import { css } from 'styled-components';

export const chartStyles = {
  cardStyle: css`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: auto;
  `,
  titleStyle: css`
    font-family: 'AnjomanMax';
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
    text-align: right;
    padding: 0 1rem;
  `
};

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  colors: string[]
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  const step = 1 / (colors.length - 1);
  
  colors.forEach((color, index) => {
    gradient.addColorStop(index * step, color);
  });
  
  return gradient;
};

export const baseChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
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
      displayColors: true
    }
  },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        tickWidth: 0,
        lineWidth: 0
      },
      border: {
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
      grid: {
        color: 'rgba(99, 102, 241, 0.1)',
        display: true,
        lineWidth: 1,
        tickWidth: 1,
        offset: true
      },
      border: {
        display: false
      },
      ticks: {
        font: {
          family: 'AnjomanMax',
          size: 12
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
      backgroundColor: '#fff',
      borderWidth: 2
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
};

export type ChartDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string | CanvasGradient;
    borderWidth: number;
    fill: boolean;
    tension: number;
  }[];
};