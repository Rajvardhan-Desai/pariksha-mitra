// Home.jsx
import React, { useState, useContext } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
    Avatar
} from "@mui/material";
import {
    Menu as MenuIcon,
    Dashboard,
    BarChart,
    Logout,
    AccountCircle,
} from "@mui/icons-material";
import { AuthContext } from '../context/AuthContext'; // Adjust the import path as needed

const navItems = [
    { text: "Dashboard", icon: <Dashboard />, route: "/dashboard" },
    { text: "Reports", icon: <BarChart />, route: "/reports" },
];

const Home = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState("/dashboard");
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // Consume AuthContext
    const { user, logout } = useContext(AuthContext);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        console.log("Sign out clicked");
        logout();
        handleMenuClose();
    };

    const handleNavigation = (route) => {
        setSelectedRoute(route);
        // Implement actual navigation logic here, e.g., using React Router
    };

    // If user is not logged in, show a message or redirect to login
    if (!user) {
        return (
            <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6" align="center">
                    You are not logged in.
                </Typography>
            </Box>
        );
    }

    const drawerWidth = isDrawerOpen ? 240 : 70;

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />

            {/* App Bar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left: Hamburger Menu and Title */}
                    <Box display="flex" alignItems="center">
                        {/* Always show the hamburger icon */}
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Pariksha Mitra
                        </Typography>
                    </Box>
                    {/* Right: Profile Dropdown */}
                    <Box display="flex" alignItems="center">
                        <Tooltip title="Profile">
                            <IconButton
                                onClick={handleMenuOpen}
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                                aria-label="Open profile menu"
                            >
                                {user.avatarUrl ? (
                                    <Avatar alt={user.name} src={user.avatarUrl} />
                                ) : (
                                    <AccountCircle fontSize="large" />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Profile Dropdown Menu */}
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                    {user.avatarUrl ? (
                        <Avatar alt={user.name} src={user.avatarUrl} sx={{ mr: 2, width: 50, height: 50 }} />
                    ) : (
                        <AccountCircle fontSize="large" sx={{ mr: 2, width: 50, height: 50 }} />
                    )}
                    <Box>
                        <Typography variant="body1" fontWeight="bold">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <MenuItem onClick={handleSignOut}>
                    <Logout fontSize="small" sx={{ mr: 1 }} />
                    Sign Out
                </MenuItem>
            </Menu>

            {/* Sidebar Drawer (Permanent) */}
            <Drawer
                variant="permanent"
                open={isDrawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        transition: "width 0.3s",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {navItems.map((item) => (
                            <Tooltip
                                title={isDrawerOpen ? "" : item.text}
                                placement="right"
                                key={item.text}
                            >
                                <ListItem
                                    button
                                    onClick={() => handleNavigation(item.route)}
                                    selected={selectedRoute === item.route}
                                    sx={{
                                        justifyContent: isDrawerOpen ? "flex-start" : "center",
                                        paddingLeft: isDrawerOpen ? 2 : 1,
                                        ...(selectedRoute === item.route && {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            }
                                        })
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            justifyContent: "center",
                                            minWidth: 0,
                                            color: selectedRoute === item.route ? 'white' : 'inherit'
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary={item.text} />}
                                </ListItem>

                            </Tooltip>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                    marginLeft: `${drawerWidth}px`,
                    transition: "margin-left 0.3s",
                    overflowY: "auto",
                }}
            >
                <Toolbar />
                {/* Conditional Rendering Based on Selected Route */}
                {selectedRoute === "/dashboard" && (
                    <>
                        <Typography variant="h5" gutterBottom>
                            {`Hi ${user.name} !`}
                        </Typography>
                        <Typography variant="h6">
                            {`Role: ${user.role}`}
                        </Typography>
                    </>
                )}
                {selectedRoute === "/reports" && (
                    <Typography variant="h5">
                        Reports Content
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Home;
