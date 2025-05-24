import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { HelpPage } from './pages/HelpPage';
import { AnimalsPage } from './pages/AnimalsPage';
import { UserPage } from './pages/UserPage';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{
          background: '#f0f2f5',
          //minHeight: 'calc(100vh - 134px)'
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
