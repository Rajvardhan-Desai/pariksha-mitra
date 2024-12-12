import React from 'react';
import { Box, Skeleton } from '@mui/material';

// Login Skeleton
export const LoginSkeleton = () => (
  <Box
    maxWidth="400px"
    mx="auto"
    mt={10}
    p={4}
    border={1}
    borderColor="grey.300"
    borderRadius={2}
  >
    <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="80%" height={40} />
  </Box>
);

// Register Skeleton
export const RegisterSkeleton = () => (
  <Box
    maxWidth="400px"
    mx="auto"
    mt={10}
    p={4}
    border={1}
    borderColor="grey.300"
    borderRadius={2}
  >
    <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
  </Box>
);

// Home Skeleton
export const HomeSkeleton = () => (
  <Box
    sx={{
      py: 4,
      px: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}
  >
    <Skeleton variant="text" width="30%" height={50} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={200} />
    <Skeleton variant="text" width="50%" height={40} sx={{ mt: 2 }} />
  </Box>
);

// Not Found Skeleton (optional)
export const NotFoundSkeleton = () => (
  <Box
    sx={{
      py: 4,
      px: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Skeleton variant="text" width="80%" height={50} />
  </Box>
);
