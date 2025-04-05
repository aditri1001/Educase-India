import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/Landing';
import LoginPage from './pages/login/Login';
import CreateAccountPage from './pages/create-account/CreateAccount';
import AccountSettingsPage from './pages/account-setting/AccountSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;