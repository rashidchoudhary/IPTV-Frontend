import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons'; 
import { fetchSeries } from "../Redux/Slices/seriesSlice"; 

const { Title, Paragraph } = Typography;

const SeasonDetails = ({ season, handleBack }) => {
    const dispatch = useDispatch();
    const seriesList = useSelector((state) => state.series.seriesList);
    const [seriesName, setSeriesName] = useState('');

    useEffect(() => {
        if (!seriesList.length) {
            dispatch(fetchSeries());
        }
    }, [dispatch, seriesList.length]);

    useEffect(() => {
        if (season && seriesList.length) {
            const series = seriesList.find(series => series._id === season.series_id);
            if (series) {
                setSeriesName(series.name);
            }
        }
    }, [season, seriesList]);

    if (!season) {
        return null;
    }

    return (
        <Card
            style={{ 
                width: '90vw', 
                maxWidth: '600px', 
                height: 'auto', 
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}
        >
            <CalendarOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
            <Title level={2} style={{ marginTop: '20px' }}>{season.name}</Title>
            <Paragraph><strong>Series:</strong> {seriesName}</Paragraph>
            <Paragraph><strong>Description:</strong> {season.description}</Paragraph>
            <Button type="default" onClick={handleBack} style={{ marginTop: '20px' }}>
                Back
            </Button>
        </Card>
    );
};

export default SeasonDetails;
