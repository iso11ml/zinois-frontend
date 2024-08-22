import './app.css';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layout';
import AuthenticationPage from './pages/authentication/authentication-page';
import HomePage from './pages/home/home-page';

function App() {
  return (
    <RootLayout>
      <main className='h-screen flex items-center justify-center'>
        <Routes>
          <Route path="/authentication" element={<AuthenticationPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </RootLayout>
  );
}

export default App;
