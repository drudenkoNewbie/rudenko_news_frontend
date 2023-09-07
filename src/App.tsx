import { useRoutes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import './App.css';
import UserPage from './pages/UserPage';
import Layout from './components/Layout';

function App() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />
        },
        {
          path: 'users/:id',
          element: <UserPage />
        }
      ]
    }
  ]);
}

export default App;
