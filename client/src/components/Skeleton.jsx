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
    boxShadow={3} // Added shadow for better appearance
  >
    {/* Logo Placeholder */}
    <Skeleton variant="circular" width={60} height={60} sx={{ mb: 3, mx: 'auto' }} />

    {/* Title Placeholder */}
    <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2, mx: 'auto' }} />

    {/* Input Field Placeholders */}
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 3 }} />

    {/* Button Placeholder */}
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />

    {/* Link Placeholder */}
    <Skeleton variant="text" width="70%" height={30} sx={{ mx: 'auto' }} />
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
    boxShadow={3} // Added shadow for better appearance
  >
    {/* Logo Placeholder */}
    <Skeleton variant="circular" width={60} height={60} sx={{ mb: 3, mx: 'auto' }} />

    {/* Title Placeholder */}
    <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2, mx: 'auto' }} />

    {/* Input Field Placeholders */}
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 3 }} />

    {/* Button Placeholder */}
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />

    {/* Link Placeholder */}
    <Skeleton variant="text" width="70%" height={30} sx={{ mx: 'auto' }} />
  </Box>
);


// Home Skeleton
export const HomeSkeleton = () => (
  <Box
    sx={{
      py: 4,
      px: 2,
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    {/* Sidebar Placeholder */}
    <Box sx={{ width: '20%', pr: 2 }}>
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={200} />
    </Box>

    {/* Main Content Placeholder */}
    <Box sx={{ flex: 1, pl: 2 }}>
      <Skeleton variant="text" width="30%" height={50} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="60%" height={30} />
    </Box>
  </Box>
);


// Not Found Skeleton 
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
