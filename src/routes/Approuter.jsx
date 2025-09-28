import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../Pages/Login/Loginpage';
import AuthRoute from './Protect/AuthRoute';
import LoginAuthRoute from './Protect/LoginAuthRoute';
import UsersList from '../Pages/User/UsersList';

const AppRouter = () => (
   <Routes>
      <Route element={<LoginAuthRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<AuthRoute />}>
        <Route path="/users" element={<UsersList />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
);

export default AppRouter;
