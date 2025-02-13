import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Pets from './Pets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;