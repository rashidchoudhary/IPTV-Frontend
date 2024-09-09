import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EpisodeList from './EpisodeList';

const EpisodeIndex = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>            
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '70px', paddingTop: 'px', width: "100%" }}>
                <EpisodeList />
            </Box>
        </>
    );
};

export default EpisodeIndex;
