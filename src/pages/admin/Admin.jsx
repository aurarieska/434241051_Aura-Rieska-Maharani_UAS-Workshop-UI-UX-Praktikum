import { Routes, Route, Navigate } from 'react-router-dom';
import AdminShell from '../../components/admin/AdminShell';
import Dashboard from './Dashboard';
import Categories from './Categories';
import Services from './Services';
import Stylists from './Stylists';
import Articles from './Articles';
import Users from './Users';
import Transactions from './Transactions';

export default function Admin() {
  return (
    <Routes>
      <Route element={<AdminShell />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="services" element={<Services />} />
        <Route path="stylists" element={<Stylists />} />
        <Route path="articles" element={<Articles />} />
        <Route path="users" element={<Users />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}