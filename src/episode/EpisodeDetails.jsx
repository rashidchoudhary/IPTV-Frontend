import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons'; 
import { fetchSeasons } from "../Redux/Slices/seasonSlice";
import { fetchFiles } from "../Redux/Slices/fileSlice"; 

const { Title, Paragraph } = Typography;

const EpisodeDetails = ({ episode, handleBack }) => {
    const dispatch = useDispatch();
    const seasonsList = useSelector((state) => state.seasons.seasons);
    const filesList = useSelector((state) => state.files.files);
    const [seasonName, setSeasonName] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        if (!seasonsList.length) {
            dispatch(fetchSeasons());
        }
        if (!filesList.length) {
            dispatch(fetchFiles());
        }
    }, [dispatch, seasonsList.length, filesList.length]);

    useEffect(() => {
        if (episode && seasonsList.length) {
            const season = seasonsList.find(season => season._id === episode.season_id);
            if (season) {
                setSeasonName(season.name);
            }
        }
        if (episode && filesList.length) {
            const thumbnailFile = filesList.find(file => file._id === episode.thumbnail_id);
            if (thumbnailFile) {
                setThumbnail(thumbnailFile.url); 
            }
        }
    }, [episode, seasonsList, filesList]);

    if (!episode) {
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
            <Title level={2} style={{ marginTop: '20px' }}>{episode.name}</Title>
            <Paragraph><strong>Season:</strong> {seasonName}</Paragraph>
            <Paragraph><strong>Description:</strong> {episode.description}</Paragraph>
            {thumbnail && <img src={thumbnail} alt="Thumbnail" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />}
            <Button type="default" onClick={handleBack} style={{ marginTop: '20px' }}>
                Back
            </Button>
        </Card>
    );
};

export default EpisodeDetails;
