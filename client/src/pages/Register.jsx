import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Button,
  Alert,
  FormHelperText,
  Snackbar,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import useDebounce from '../hooks/useDebounce'; // Ensure correct path

const Register = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [invitationCode, setInvitationCode] = useState('PMTH24');

  // State variables for form validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [invitationCodeError, setInvitationCodeError] = useState('');

  // Touched state variables
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [roleTouched, setRoleTouched] = useState(false);
  const [invitationCodeTouched, setInvitationCodeTouched] = useState(false);

  // Other state variables
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debounced values
  const debouncedName = useDebounce(name, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPassword = useDebounce(password, 500);
  const debouncedRole = useDebounce(role, 500);
  const debouncedInvitationCode = useDebounce(invitationCode, 500);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Validation Functions

  // Name Validation
  const validateName = (value) => {
    if (!value.trim()) {
      return 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      return 'Name can only contain letters and spaces.';
    } else if (value.trim().length < 2) {
      return 'Name must be at least 2 characters long.';
    } else {
      return '';
    }
  };

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
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{6,}$/;
    if (!value) {
      return 'Password is required.';
    } else if (!regex.test(value)) {
      return 'Password must be at least 6 characters and include uppercase, lowercase, number, and special character.';
    } else {
      return '';
    }
  };

  // Role Validation
  const validateRole = (value) => {
    if (!value) {
      return 'Role is required.';
    } else if (!['student', 'teacher'].includes(value)) {
      return 'Invalid role selected.';
    } else {
      return '';
    }
  };

  // Invitation Code Validation
  const validateInvitationCode = (value) => {
    if (role === 'teacher') {
      if (!value.trim()) {
        return 'Invitation code is required to register as a teacher.';
      }
      // Add any frontend-specific validation for the invitation code
      else if (value.trim().length < 6) {
        return 'Invitation code must be at least 6 characters long.';
      }
    }
    return '';
  };

  // useEffect hooks for debounced validation
  useEffect(() => {
    if (nameTouched) {
      setNameError(validateName(debouncedName));
    }
  }, [debouncedName, nameTouched]);

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

  useEffect(() => {
    if (roleTouched) {
      setRoleError(validateRole(debouncedRole));
    }
  }, [debouncedRole, roleTouched]);

  useEffect(() => {
    if (invitationCodeTouched) {
      setInvitationCodeError(validateInvitationCode(debouncedInvitationCode));
    }
  }, [debouncedInvitationCode, invitationCodeTouched, role]);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError('');

    // Validate all fields before submission
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const roleErr = validateRole(role);
    const invitationCodeErr = validateInvitationCode(invitationCode);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setRoleError(roleErr);
    setInvitationCodeError(invitationCodeErr);

    // Set all touched to true to display errors if any
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setRoleTouched(true);
    setInvitationCodeTouched(true);

    // If any validation errors exist, prevent form submission
    if (nameErr || emailErr || passwordErr || roleErr || invitationCodeErr) {
      return;
    }

    let baseURL = '';

    if (process.env.NODE_ENV === 'development') {
      // Use the environment variable only in development
      baseURL = import.meta.env.VITE_API_URL;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      };

      if (role === 'teacher') {
        payload.invitationCode = invitationCode.trim();
      }

      const { data } = await axios.post(`${baseURL}/api/auth/register`, payload);
      login(data.user, data.token);

      // Set success message and open Snackbar
      setSnackbarMessage('Registration successful!');
      setOpenSnackbar(true);

      // Navigate after a short delay to allow users to see the Snackbar
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      setServerError(
        err.response?.data?.error || 'Registration failed. Please try again.'
      );
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
        <Typography variant="h4" mb={2} align="center">
          Register
        </Typography>
        <Typography variant="h6" mb={2} align="center">
          Fill out the information below to create your account.
        </Typography>
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}
        <form onSubmit={handleRegister} noValidate>
          {/* Name Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            error={nameTouched && Boolean(nameError)}
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameTouched(true); // Set touched on change
              }}
              onBlur={() => setNameTouched(true)} // Set touched on blur
              label="Name"
              required
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              aria-describedby="name-error-text"
            />
            {nameTouched && nameError && (
              <FormHelperText id="name-error-text">
                {nameError}
              </FormHelperText>
            )}
          </FormControl>

          {/* Email Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            error={emailTouched && Boolean(emailError)}
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
              <FormHelperText id="email-error-text">
                {emailError}
              </FormHelperText>
            )}
          </FormControl>

          {/* Password Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            error={passwordTouched && Boolean(passwordError)}
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
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="password-error-text"
            />
            {passwordTouched && passwordError && (
              <FormHelperText id="password-error-text">
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>

          {/* Role Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            error={roleTouched && Boolean(roleError)}
          >
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setRoleTouched(true); // Set touched on change
              }}
              onBlur={() => setRoleTouched(true)} // Set touched on blur
              label="Role"
              required
              aria-describedby="role-error-text"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            {roleTouched && roleError && (
              <FormHelperText id="role-error-text">
                {roleError}
              </FormHelperText>
            )}
          </FormControl>

          {/* Invitation Code Field */}
          {role === 'teacher' && (
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              error={invitationCodeTouched && Boolean(invitationCodeError)}
            >
              <InputLabel htmlFor="invitationCode">Invitation Code</InputLabel>
              <OutlinedInput
                id="invitationCode"
                type="text"
                value={invitationCode} 
                onChange={(e) => {
                  setInvitationCode(e.target.value);
                  setInvitationCodeTouched(true); // Set touched on change
                }}
                onBlur={() => setInvitationCodeTouched(true)} // Set touched on blur
                label="Invitation Code"
                required
                aria-describedby="invitationCode-error-text invitationCode-hint-text"
              />

              {/* Error Message */}
              {invitationCodeTouched && invitationCodeError && (
                <FormHelperText id="invitationCode-error-text" error>
                  {invitationCodeError}
                </FormHelperText>
              )}

              {/* Hint Text */}
              <FormHelperText
  id="invitationCode-hint-text"
  sx={{ color: 'text.secondary'}}
>
  Please enter the invitation code <strong>PMTH24</strong>. This code remains valid until the application exits its beta phase.
</FormHelperText>
            </FormControl>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
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
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              marginLeft: '4px',
            }}
          >
            Login
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

export default Register;
