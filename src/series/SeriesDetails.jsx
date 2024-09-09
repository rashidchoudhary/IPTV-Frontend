import React, { useEffect } from 'react';
import { Descriptions, Button, Card, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { fetchSeriesById } from '../Redux/Slices/seriesSlice';
import { fetchGenres } from '../Redux/Slices/genreSlice';

const { Title, Paragraph } = Typography;

const SeriesDetails = ({ seriesId, handleBack }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (seriesId) {
            dispatch(fetchSeriesById(seriesId));
        }
        dispatch(fetchGenres()); 
    }, [dispatch, seriesId]);

    const series = useSelector((state) =>
        state.series.seriesList.find((s) => s._id === seriesId)
    );

    const genres = useSelector((state) => state.genres.genres);

    const loading = useSelector((state) => state.series.loading);
    const error = useSelector((state) => state.series.error);

    if (loading) return <Spin tip="Loading series details..." />;

    if (error) return <p>Error loading series details: {error}</p>;

    if (!series) return <p>No series data available.</p>;

    const genreNames = series.genre_ids
        ? series.genre_ids.map((genreId) => {
            const genre = genres.find((g) => g._id === genreId);
            return genre ? genre.name : 'Unknown Genre';
        })
        : ['No Genres Available'];

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Card
                style={{
                    width: '60vw',
                    maxWidth: '600px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <PlayCircleOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
                </div>
                <Title level={2} style={{ marginBottom: '16px', textAlign: 'center' }}>
                    {series.name || "No Name Available"}
                </Title>
                <Paragraph style={{ marginBottom: '16px', textAlign: 'center' }}>
                    {series.description || "No Description Available"}
                </Paragraph>
                <Descriptions title="" bordered>
                    <Descriptions.Item label="" style={{ margin: '0', padding: '0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ marginLeft:"160px"}}>Genres:</strong>
                            <span>{genreNames.join(', ')}</span>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
                <Button onClick={handleBack} type="default" style={{ marginTop: '20px', alignSelf: 'center' }} icon={<ArrowLeftOutlined />}>
                    Back
                </Button>
            </Card>
        </div>
    );
};

export default SeriesDetails;
