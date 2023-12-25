import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRouter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
