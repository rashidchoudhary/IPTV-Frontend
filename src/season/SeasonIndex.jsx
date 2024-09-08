import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SeasonList from './SeasonList';

const SeasonIndex = () => {
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
                <SeasonList />  {/* Display the list of seasons here */}
            </Box>
        </>
    );
};

export default SeasonIndex;
