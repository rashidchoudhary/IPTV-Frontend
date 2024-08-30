import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ onLogout }) => {
    return (
        <AppBar position="fixed" style={{ zIndex: 1201 }}>
            <Toolbar style={{ minHeight: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6" color="inherit" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="src/assets/Logo2.jpg" alt="Logo" style={{ height: '35px', marginRight: '10px', borderRadius: "50%" }} />
                        IPTV APP
                    </Typography>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <div style={{ position: 'relative', marginRight: '20px' }}>
                            <InputBase
                                placeholder="Search…"
                                disabled
                                inputProps={{ 'aria-label': 'search' }}
                                style={{
                                    color: 'inherit',
                                    paddingLeft: '40px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    borderRadius: '4px',
                                    width: '200px',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '60%',
                                    transform: 'translateY(-50%)',
                                    color: 'white',
                                }}
                            >
                                <SearchIcon />
                            </div>
                        </div>
                        <Button
                            onClick={onLogout}
                            style={{
                                color: 'white',
                                border: '1px solid white',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <LogoutIcon style={{ marginRight: '5px' }} />
                            Logout
                        </Button>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
