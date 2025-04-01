import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import MainLayout from './components/layout/MainLayout';
import NewPersonForm from './components/persons/NewPersonForm';
import PersonsList from './components/persons/PersonsList';
import db from './utils/Database';

// Import CSS files
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  direction: rtl;
  min-height: 100vh;
  background-color: #f8fafc;
`;

function App() {
  useEffect(() => {
    // راه‌اندازی دیتابیس هنگام شروع برنامه
    const initDatabase = async () => {
      try {
        await db.init();
        console.log('دیتابیس با موفقیت راه‌اندازی شد');
      } catch (error) {
        console.error('خطا در راه‌اندازی دیتابیس:', error);
      }
    };

    initDatabase();
  }, []);

  return (
    <AppContainer>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/persons/new" element={<NewPersonForm />} />
            <Route path="/persons/list" element={<PersonsList />} />
            <Route path="/" element={<div>صفحه اصلی</div>} />
            {/* بقیه مسیرها بعداً اضافه می‌شوند */}
          </Routes>
        </MainLayout>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppContainer>
  );
}

export default App;