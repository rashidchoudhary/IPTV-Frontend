import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, addGenre, editGenre, deleteGenre } from "../Redux/Slices/genreSlice.js";
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import AddEditGenre from './AddEditGenre';
import GenreDetails from './GenreDetails';

const GenreList = () => {
    const dispatch = useDispatch();
    const { genres, loading, error } = useSelector((state) => state.genres);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newGenreName, setNewGenreName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditMode(false);
        setNewGenreName('');
        setEditId(null);
        setViewMode(false);
        setSelectedGenre(null);
    };

    const handleAddGenre = () => {
        if (newGenreName.trim()) {
            dispatch(addGenre({ name: newGenreName }))
                .then(() => {
                    message.success('Genre added successfully');
                    dispatch(fetchGenres()); 
                })
                .catch(() => {
                    message.error('Failed to add genre');
                });
            handleCancel();
        }
    };

    const handleEditGenre = (record) => {
        setEditMode(true);
        setEditId(record._id);
        setNewGenreName(record.name);
        showModal();
    };

    const handleUpdateGenre = () => {
        if (newGenreName.trim()) {
            dispatch(editGenre({ id: editId, name: newGenreName }))
                .then(() => {
                    message.success('Genre updated successfully');
                    dispatch(fetchGenres());
                })
                .catch(() => {
                    message.error('Failed to update genre');
                });
            handleCancel();
        }
    };

    const handleDeleteGenre = (id) => {
        dispatch(deleteGenre(id))
            .then(() => {
                message.success('Genre deleted successfully');
                dispatch(fetchGenres()); 
            })
            .catch(() => {
                message.error('Failed to delete genre');
            });
    };

    const handleViewGenre = (record) => {
        setSelectedGenre(record);
        setViewMode(true);
    };

    const columns = [
        {
            title: 'Genre Name',
            dataIndex: 'name',
            key: 'name',
            width: '60%',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '80%',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewGenre(record)}>View</Button>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditGenre(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this genre?"
                        onConfirm={() => handleDeleteGenre(record._id)}
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
                    <h3 style={{ margin: 0 }}>Genre List</h3>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                    >
                        Add Genre
                    </Button>
                </div>
            )}

            {viewMode ? (
                <GenreDetails genre={selectedGenre} handleBack={handleCancel} />
            ) : isModalVisible ? (
                <AddEditGenre
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    newGenreName={newGenreName}
                    setNewGenreName={setNewGenreName}
                    handleAddGenre={handleAddGenre}
                    handleUpdateGenre={handleUpdateGenre}
                />
            ) : (
                <div style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                }}>
                    <Table
                        columns={columns}
                        dataSource={genres}
                        rowKey={(record) => record._id}
                        bordered
                        pagination={{ pageSize: 3 }}
                        style={{ borderRadius: '15px', overflow: 'hidden', width: '100%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default GenreList;
