import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import GenreIndex from '../genre/GenreIndex';
import SeriesIndex from '../series/SeriesIndex';
import SeasonIndex from '../season/SeasonIndex';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    React.useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    
    const renderIndex = () => {
        switch (location.pathname) {
            case '/':
                return <GenreIndex />;
            case '/series':
                return <SeriesIndex />;
            case '/season':
                return <SeasonIndex/>; 
            case '/episode':
                return <div>Episode Index</div>;
            default:
                return <GenreIndex />;
        }
    };

    return (
        <>
            <Header onLogout={logout} />
            <Sidebar />
            {renderIndex()}
        </>
    );
};

export default Home;
