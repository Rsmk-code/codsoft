import './App.css';
import {Routes, Route } from "react-router-dom";
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navbar /> }>
        <Route path="login" element={<UserAuthForm type="login" />} />
        <Route path="signup" element={<UserAuthForm type="signup" />} />
      </Route>
    </Routes>
  )
}

export default App;
