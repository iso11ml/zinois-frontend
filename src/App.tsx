import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout';
import AuthenticationPage from './pages/authentication/authentication-page';
import HomePage from './pages/home/home-page';


function App() {
  return (
    <Router>
      <RootLayout>
        <main className='h-screen flex items-center justify-center'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
          </Routes>
        </main>
      </RootLayout>
    </Router>
  );
}

export default App;
