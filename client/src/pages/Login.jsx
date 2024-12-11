// src/pages/Login.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Alert,
  FormHelperText,
  Snackbar,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce'; // Ensure correct path
import { AuthContext } from '../context/AuthContext'; // If needed

const Login = () => {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for form validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Touched state variables
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Other state variables
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext); // Ensure AuthContext is correctly imported and provided

  // Debounced values
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPassword = useDebounce(password, 500);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Validation Functions

  // Email Validation
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      return 'Email is required.';
    } else if (!regex.test(value)) {
      return 'Enter a valid email address.';
    } else {
      return '';
    }
  };

  // Password Validation
  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required.';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters long.';
    } else {
      return '';
    }
  };

  // useEffect hooks for debounced validation
  useEffect(() => {
    if (emailTouched) {
      setEmailError(validateEmail(debouncedEmail));
    }
  }, [debouncedEmail, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      setPasswordError(validatePassword(debouncedPassword));
    }
  }, [debouncedPassword, passwordTouched]);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields before submission
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    // Set all touched to true to display errors if any
    setEmailTouched(true);
    setPasswordTouched(true);

    // If any validation errors exist, prevent form submission
    if (emailErr || passwordErr) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/auth/login`, { email: email.trim(), password });
      console.log('Logged in:', data);
      login(data.user, data.token);

      // Set success message and open Snackbar
      setSnackbarMessage('Login successful!');
      setOpenSnackbar(true);

      // Optionally, navigate after a delay to allow users to see the Snackbar

      navigate('/home');

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Typography variant="h3" mt={10} align="center">
        Pariksha Mitra
      </Typography>

      <Box
        maxWidth="400px"
        mx="auto"
        mt={2}
        p={4}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
      >
        <Typography variant="h4" mb={2} align="center" >
          Login
        </Typography>

        <Typography variant="h6" mb={2} align="center" >
        Fill out the information below in order to access your account.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleLogin} noValidate>
          {/* Email Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            error={emailTouched && Boolean(emailError)} // Only show error if touched
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true); // Set touched on change
              }}
              onBlur={() => setEmailTouched(true)} // Set touched on blur
              label="Email"
              required
              aria-describedby="email-error-text"
            />
            {emailTouched && emailError && (
              <FormHelperText id="email-error-text">{emailError}</FormHelperText>
            )}
          </FormControl>

          {/* Password Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            error={passwordTouched && Boolean(passwordError)} // Only show error if touched
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordTouched(true); // Set touched on change
              }}
              onBlur={() => setPasswordTouched(true)} // Set touched on blur
              label="Password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="password-error-text"
            />
            {passwordTouched && passwordError && (
              <FormHelperText id="password-error-text">{passwordError}</FormHelperText>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button

            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </Box>
      <Box
        maxWidth="400px"
        mx="auto"
        mt={2}
        p={4}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        textAlign="center"
      >
        <Typography variant="body1">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            style={{ textDecoration: 'none', color: '#1976d2', marginLeft: '4px' }}
          >
            Register
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // 3 seconds
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default Login;
