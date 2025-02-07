import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Invoice from './Invoice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;