import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeries, addSeries, editSeries, deleteSeries } from '../Redux/Slices/seriesSlice.js';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import AddEditSeries from './AddEditSeries';
import SeriesDetails from './SeriesDetails';

const SeriesList = () => {
    const dispatch = useDispatch();
    const { seriesList, loading, error } = useSelector((state) => state.series);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);

    useEffect(() => {
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
        setSelectedSeriesId(null);
    };

    const handleAddSeries = (series) => {
        dispatch(addSeries(series))
            .then(() => {
                message.success('Series added successfully');
                dispatch(fetchSeries());
            })
            .catch(() => {
                message.error('Failed to add series');
            });
        handleCancel();
    };

    const handleEditSeries = (record) => {
        setEditMode(true);
        setEditId(record._id);
        showModal();
    };

    const handleUpdateSeries = (series) => {
        dispatch(editSeries({ id: editId, series }))
            .then(() => {
                message.success('Series updated successfully');
                dispatch(fetchSeries());
            })
            .catch(() => {
                message.error('Failed to update series');
            });
        handleCancel();
    };

    const handleDeleteSeries = (id) => {
        dispatch(deleteSeries(id))
            .then(() => {
                message.success('Series deleted successfully');
                dispatch(fetchSeries());
            })
            .catch(() => {
                message.error('Failed to delete series');
            });
    };

    const handleViewSeries = (record) => {
        setSelectedSeriesId(record._id); 
        setViewMode(true);
    };

    const columns = [
        {
            title: 'Series Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewSeries(record)}>View</Button>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditSeries(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this series?"
                        onConfirm={() => handleDeleteSeries(record._id)}
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
        <div style={{ padding: '20px', width: '90%', margin: 'auto' }}>
            {!viewMode && !isModalVisible && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0 }}>Series List</h3>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                    >
                        Add Series
                    </Button>
                </div>
            )}

            {viewMode ? (
                <SeriesDetails seriesId={selectedSeriesId} handleBack={handleCancel} />
            ) : isModalVisible ? (
                <AddEditSeries
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    editId={editId}
                    handleAddSeries={handleAddSeries}
                    handleUpdateSeries={handleUpdateSeries}
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
                        dataSource={seriesList}
                        rowKey={(record) => record._id}
                        bordered
                        pagination={{ pageSize: 3 }}
                        style={{ borderRadius: '15px', overflow: 'hidden' }}
                    />
                </div>
            )}
        </div>
    );
};

export default SeriesList;
