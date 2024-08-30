import React from 'react';
import { Button, Typography, Card } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const GenreDetails = ({ genre, handleBack }) => {
    return (
        <Card
            style={{ 
                width: '90vw', // Adjust width as needed
                maxWidth: '600px', // Optional: Restricts maximum width
                height: '60vh', // Adjust height as needed
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backgroundColor: '#fff', // Optional: Ensures the card has a white background
                overflow: 'auto' // Optional: Ensures overflow is managed
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
