import React from 'react';
import { Button, Typography, Card } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const GenreDetails = ({ genre, handleBack }) => {
    return (
        <Card
            style={{ 
                width: '90vw',
                maxWidth: '600px', 
                height: '60vh', 
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
                overflow: 'auto' 
            }}
        >
            <BookOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
            <Title level={2} style={{ marginTop: '20px' }}>{genre.name}</Title>
            <Paragraph><strong>ID:</strong> {genre._id}</Paragraph>
            <Button type="default" onClick={handleBack} style={{ marginTop: '20px' }}>
                Back
            </Button>
        </Card>
    );
};

export default GenreDetails;
