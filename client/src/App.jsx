import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import { Box, Typography } from '@mui/material';
import {
  LoginSkeleton,
  RegisterSkeleton,
  HomeSkeleton,
  NotFoundSkeleton,
} from './components/Skeleton';

// Lazy-loaded pages
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<RegisterSkeleton />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoginSkeleton />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<NotFoundSkeleton />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
