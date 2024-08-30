import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import GenreIndex from '../genre/GenreIndex';

const Home = () => {
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
            <Header onLogout={logout} />
            <Sidebar />
            <GenreIndex/>            
        </>
    );
};

export default Home;
