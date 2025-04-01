import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { store } from './store/store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { register } from 'chart.js';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
} from 'chart.js';

// ثبت کامپوننت‌های Chart.js به صورت سراسری
register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// تنظیمات پیش‌فرض برای React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 دقیقه
    },
  },
});

// تنظیمات زبان و منطقه برای اعداد فارسی
const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
Intl.NumberFormat.prototype.formatToParts = new Proxy(
  Intl.NumberFormat.prototype.formatToParts,
  {
    apply: function(target, thisArg, argumentsList) {
      const result = target.apply(thisArg, argumentsList);
      if (thisArg.resolvedOptions().locale.startsWith('fa')) {
        return result.map(part => {
          if (part.type === 'integer' || part.type === 'decimal' || part.type === 'group') {
            return {
              ...part,
              value: part.value.split('').map(d => persianNumerals[d] || d).join('')
            };
          }
          return part;
        });
      }
      return result;
    }
  }
);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* سایر مسیرها در اینجا اضافه خواهند شد */}
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;