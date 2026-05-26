import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css';

//import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import AccountSelect from './pages/AccountSelect';
import Dashboard from './pages/Dashboard';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />}></Route>

                <Route path="/cadastro" element={<Signup />}></Route>

                <Route path="/accounts" element={<AccountSelect />}></Route>

                <Route path="/dashboard" element={<Dashboard />}></Route>

            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
