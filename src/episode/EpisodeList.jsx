import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes, addEpisode, editEpisode, deleteEpisode } from '../Redux/Slices/episodeSlice';
import { fetchSeasons } from '../Redux/Slices/seasonSlice';
import { fetchFiles } from '../Redux/Slices/fileSlice';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import AddEditEpisode from './AddEditEpisode';
import EpisodeDetails from './EpisodeDetails';

const EpisodeList = () => {
    const dispatch = useDispatch();
    const { episodes, loading, error } = useSelector((state) => state.episodes);
    const { seasons } = useSelector((state) => state.seasons);
    const { files } = useSelector((state) => state.files);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newEpisode, setNewEpisode] = useState({ name: '', description: '', season_id: '', thumbnail_id: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3 });

    useEffect(() => {
        dispatch(fetchEpisodes());
        dispatch(fetchSeasons());
        dispatch(fetchFiles());
    }, [dispatch]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditMode(false);
        setNewEpisode({ name: '', description: '', season_id: '', thumbnail_id: '' });
        setEditId(null);
        setViewMode(false);
        setSelectedEpisode(null);
    };

    const handleAddEpisode = (values) => {
        dispatch(addEpisode(values))
            .then(() => {
                message.success('Episode added successfully');
                dispatch(fetchEpisodes());
            })
            .catch((err) => {
                console.error('Failed to add episode:', err);
                message.error('Failed to add episode');
            });
        handleCancel();
    };

    const handleEditEpisode = (record) => {
        setEditMode(true);
        setEditId(record._id);
        setNewEpisode({
            name: record.name,
            description: record.description,
            season_id: record.season_id || '',
            thumbnail_id: record.thumbnail_id || ''
        });
        showModal();
    };

    const handleUpdateEpisode = (values) => {
        dispatch(editEpisode({ id: editId, ...values }))
            .then(() => {
                message.success('Episode updated successfully');
                dispatch(fetchEpisodes());
            })
            .catch((err) => {
                console.error('Failed to update episode:', err);
                message.error('Failed to update episode');
            });
        handleCancel();
    };

    const handleDeleteEpisode = (id) => {
        dispatch(deleteEpisode(id))
            .then(() => {
                message.success('Episode deleted successfully');
                dispatch(fetchEpisodes());
            })
            .catch((err) => {
                console.error('Failed to delete episode:', err);
                message.error('Failed to delete episode');
            });
    };

    const handleViewEpisode = (record) => {
        setSelectedEpisode(record);
        setViewMode(true);
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: 'Episode Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewEpisode(record)}>View</Button>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditEpisode(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this episode?"
                        onConfirm={() => handleDeleteEpisode(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<DeleteOutlined />} danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', width: '100%', margin: 'auto' }}>
            {!viewMode && !isModalVisible && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0 }}>Episode List</h3>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                    >
                        Add Episode
                    </Button>
                </div>
            )}

            {viewMode ? (
                <EpisodeDetails episode={selectedEpisode} handleBack={handleCancel} />
            ) : isModalVisible ? (
                <AddEditEpisode
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    newEpisodeData={newEpisode}
                    handleAddEpisode={handleAddEpisode}
                    handleUpdateEpisode={handleUpdateEpisode}
                    seasonList={seasons}
                    fileList={files}
                />
            ) : (
                <div style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '95%',
                }}>
                    <Table
                        columns={columns}
                        dataSource={episodes}
                        rowKey={(record) => record._id}
                        bordered
                        pagination={pagination}
                        onChange={handleTableChange}
                        style={{ borderRadius: '15px', overflow: 'hidden', width: '100%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default EpisodeList;
