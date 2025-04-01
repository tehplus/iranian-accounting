import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import NewPersonForm from '../components/persons/NewPersonForm';
import PersonsList from '../components/persons/PersonsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'persons',
        children: [
          {
            path: 'new',
            element: <NewPersonForm />
          },
          {
            index: true,
            element: <PersonsList />
          }
        ]
      }
    ]
  }
]);

export default router;