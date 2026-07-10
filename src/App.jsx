import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { C } from './constants/theme';

import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import UserShell from './components/UserShell';

import Landing from './pages/Landing';
import Login from './pages/Login';

import Services from './pages/user/Services';
import ServiceDetail from './pages/user/ServiceDetail';   // ← NEW
import Cart from './pages/user/Cart';
import Payment from './pages/user/Payment';
import Bookings from './pages/user/Bookings';
import Articles from './pages/user/Articles';
import ArticleDetail from './pages/user/ArticleDetail';
import Profile from './pages/user/Profile';

import Admin from './pages/admin/Admin';

export default function App() {
  const { toast } = useApp();

  return (
    <div style={{
      background: C.bg, color: C.taupe,
      fontFamily: 'Manrope, system-ui, sans-serif', minHeight: '100vh',
    }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<ProtectedRoute role="user"><UserShell /></ProtectedRoute>}>
          <Route index element={<Navigate to="services" replace />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />   {/* ← NEW */}
          {/* removed: stylists & stylists/:stylistId */}
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin/*" element={
          <ProtectedRoute role="admin"><Admin /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {toast && <Toast toast={toast} />}
    </div>
  );
}