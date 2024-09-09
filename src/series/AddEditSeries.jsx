import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { fetchGenres } from "../Redux/Slices/genreSlice";
import { addSeries, editSeries, fetchSeriesById } from "../Redux/Slices/seriesSlice";

const { Option } = Select;

const AddEditSeries = ({ isModalVisible, handleCancel, editMode, editId }) => {
    const dispatch = useDispatch();
    const { genres, loading } = useSelector((state) => state.genres);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    useEffect(() => {
        if (editMode && editId) {
            const fetchSeriesDetails = async () => {
                try {
                    
                    const seriesDetails = await dispatch(fetchSeriesById(editId)).unwrap();
                    
                    form.setFieldsValue({
                        name: seriesDetails.name,
                        description: seriesDetails.description,
                        genre_ids: seriesDetails.genre_ids.map((id) => id.toString()),
                    });

                    if (seriesDetails.file) {
                        setFileList([
                            {
                                uid: '-1',
                                name: 'trailer-thumbnail.jpg',
                                status: 'done',
                                url: seriesDetails.file, 
                            },
                        ]);
                    }
                } catch (error) {
                    console.error('Error fetching series details:', error.response?.data || error.message);
                    message.error('Failed to fetch series details.');
                }
            };

            fetchSeriesDetails();
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [editMode, editId, form, dispatch]);

    const handleSubmit = async (values) => {
        console.log('genre_ids before sending:', values.genre_ids);

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);

        values.genre_ids.forEach((id, index) => {
            formData.append(`genre_ids[${index}]`, id);
        });

        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);
        }

        try {
            if (editMode) {
                await dispatch(editSeries({ id: editId, series: formData })).unwrap();
                message.success('Series updated successfully');
            } else {
                await dispatch(addSeries(formData)).unwrap();
                message.success('Series added successfully');
            }
            handleCancel(); 
        } catch (error) {
            console.error('Error submitting series:', error);
            message.error('Failed to submit series. Please try again.');
        }
    };

    const handleFileUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const uploadProps = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: () => {
            return false;
        },
        fileList,
        onChange: handleFileUploadChange,
    };

    return (
        <Modal
            title={editMode ? "Edit Series" : "Add Series"}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="Series Name"
                    rules={[{ required: true, message: 'Please enter the series name' }]}
                >
                    <Input placeholder="Enter series name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the series description' }]}
                >
                    <Input.TextArea placeholder="Enter series description" />
                </Form.Item>

                <Form.Item
                    name="file"
                    label="Trailer and Thumbnail"
                    rules={[{ required: true, message: 'Please upload the trailer and thumbnail' }]}
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="genre_ids"
                    label="Genres"
                    rules={[{ required: true, message: 'Please select at least one genre' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select genres"
                        allowClear
                        loading={loading} 
                    >
                        {genres.map((genre) => (
                            <Option key={genre._id} value={genre._id}>
                                {genre.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {editMode ? "Update Series" : "Add Series"}
                    </Button>
                    <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddEditSeries;
