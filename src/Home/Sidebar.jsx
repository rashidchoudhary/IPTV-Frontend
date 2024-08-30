import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import EpisodeIcon from '@mui/icons-material/Theaters'; // Custom icon for Episode

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box
            sx={{
                width: '250px',
                height: '100vh',
                backgroundColor: '#3f51b5',
                color: 'white',
                paddingTop: '41px', // Offset for AppBar
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
            <List>
                <ListItem
                    button
                    onClick={() => handleNavigation('/')}
                    sx={{
                        cursor: "pointer",
                        backgroundColor: '#303f9f', // Active button background
                        '&:hover': {
                            backgroundColor: '#283593', // Darker shade on hover
                        },
                    }}
                >
                    <ListItemIcon>
                        <CategoryIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Genre" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => handleNavigation('/series')}
                    sx={{
                        cursor: "pointer",
                        '&:hover': {
                            
                            backgroundColor: '#283593', // Darker shade on hover
                        },
                    }}
                >
                    <ListItemIcon>
                        <MovieIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Series" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => handleNavigation('/season')}
                    sx={{
                        cursor: "pointer",
                        '&:hover': {
                            backgroundColor: '#283593', // Darker shade on hover
                        },
                    }}
                >
                    <ListItemIcon>
                        <TvIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Season" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => handleNavigation('/episode')}
                    sx={{
                        cursor: "pointer",
                        '&:hover': {
                            backgroundColor: '#283593', 
                        },
                    }}
                >
                    <ListItemIcon>
                        <EpisodeIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Episode" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
