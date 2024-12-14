import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { AuthContext } from '../context/AuthContext';

// Dynamic NAVIGATION based on user role
const NAVIGATION = (role) => [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        route: '/dashboard',
    },
    ...(role === 'teacher'
        ? [
            {
                segment: 'reports',
                title: 'Reports',
                icon: <BarChartIcon />,
                route: '/reports',
            },
          ]
        : []),
];

const demoTheme = createTheme({
    palette: {
        mode: 'light', // or 'dark'
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

function DemoPageContent({ pathname, user }) {
    return (
        <Box
            sx={{
                py: 4,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            {pathname === "/dashboard" && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Hi {user.name}!
                    </Typography>
                    <Typography variant="h6">
                        Role: {user.role}
                    </Typography>
                </>
            )}
            {pathname === "/reports" && user.role === 'teacher' && (
                <Typography variant="h5">
                    Reports Content
                </Typography>
            )}
            {pathname === "/reports" && user.role !== 'teacher' && (
                <Typography variant="h5" color="error">
                    You do not have access to this page.
                </Typography>
            )}
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

function SidebarFooter({ mini }) {
    const currentYear = new Date().getFullYear();
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
            component="a"
            href="https://github.com/Rajvardhan-Desai"
            target="_blank"
            rel="noopener noreferrer"
        >
            {mini ? "© RD" : `© ${currentYear} Made by RD`}
        </Typography>
    );
}

SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
};

function Home() {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" align="center">
                    You are not logged in.
                </Typography>
            </Box>
        );
    }

    const [session, setSession] = useState({
        user: {
            name: user.name,
            email: user.email,
            image: user.avatarUrl || '',
        },
    });

    const authentication = useMemo(() => ({
        signIn: () => setSession({
            user: {
                name: user.name,
                email: user.email,
                image: user.avatarUrl || '',
            },
        }),
        signOut: () => {
            logout();
            setSession(null);
        },
    }), [user, logout]);

    const router = useDemoRouter('/dashboard');

    return (
        <AppProvider
            branding={{
                logo: '',
                title: 'Pariksha Mitra',
            }}
            session={session}
            authentication={authentication}
            navigation={NAVIGATION(user.role)} 
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout
                slots={{
                    sidebarFooter: SidebarFooter,
                }}
            >
                <DemoPageContent pathname={router.pathname} user={user} logout={logout} />
            </DashboardLayout>
        </AppProvider>
    );
}

export default Home;
