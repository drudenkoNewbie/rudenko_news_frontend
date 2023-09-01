import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import MainPage from './pages/MainPage';
import './App.css';
import UserPage from './pages/UserPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="*"></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
