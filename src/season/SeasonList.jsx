import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeasons, addSeason, editSeason, deleteSeason } from "../Redux/Slices/seasonSlice.js";
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import AddEditSeason from './AddEditSeason';
import SeasonDetails from './SeasonDetails';
import { fetchSeries } from "../Redux/Slices/seriesSlice.js";

const SeasonList = () => {
    const dispatch = useDispatch();
    const { seasons, loading, error } = useSelector((state) => state.seasons);
    const { seriesList } = useSelector((state) => state.series);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        dispatch(fetchSeasons());
        dispatch(fetchSeries());
    }, [dispatch]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditMode(false);
        setEditId(null);
        setViewMode(false);
        setSelectedSeason(null);
    };

    const handleAddSeason = (values) => {
        dispatch(addSeason(values))
            .then(() => {
                message.success('Season added successfully');
                dispatch(fetchSeasons());
                handleCancel();
            })
            .catch(() => {
                message.error('Failed to add season');
            });
    };

    const handleUpdateSeason = (values) => {
        if (editId) {
            dispatch(editSeason({ id: editId, ...values }))
                .then(() => {
                    message.success('Season updated successfully');
                    dispatch(fetchSeasons());
                    handleCancel();
                })
                .catch(() => {
                    message.error('Failed to update season');
                });
        }
    };

    const handleDeleteSeason = (id) => {
        dispatch(deleteSeason(id))
            .then(() => {
                message.success('Season deleted successfully');
                dispatch(fetchSeasons());
            })
            .catch(() => {
                message.error('Failed to delete season');
            });
    };

    const handleViewSeason = (record) => {
        setSelectedSeason(record);
        setViewMode(true);
    };

    const columns = [
        {
            title: 'Season Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '50%',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '20%',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewSeason(record)}>View</Button>
                    <Button type="link" icon={<EditOutlined />} onClick={() => {
                        setEditMode(true);
                        setEditId(record._id);
                        setSelectedSeason(record);
                        showModal();
                    }}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this season?"
                        onConfirm={() => handleDeleteSeason(record._id)}
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
                    <h3 style={{ margin: 0 }}>Season List</h3>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setEditMode(false);
                            showModal();
                        }}
                    >
                        Add Season
                    </Button>
                </div>
            )}

            {viewMode ? (
                <SeasonDetails season={selectedSeason} handleBack={handleCancel} />
            ) : isModalVisible ? (
                <AddEditSeason
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    newSeasonData={selectedSeason || {}}
                    handleAddSeason={handleAddSeason}
                    handleUpdateSeason={handleUpdateSeason}
                    seriesList={seriesList}
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
                        dataSource={seasons}
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

export default SeasonList;
