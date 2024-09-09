import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Button, Select } from 'antd';
import { useSelector } from 'react-redux';

const AddEditEpisode = ({
    isModalVisible,
    handleCancel,
    editMode,
    newEpisodeData,
    handleAddEpisode,
    handleUpdateEpisode,
    seasonList, 
}) => {
    const [form] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    const { files } = useSelector((state) => state.files);
    const fileList = files.data || []; 

    useEffect(() => {
        console.log('Files array length:', fileList.length);
    }, [files]);

    useEffect(() => {
        if (editMode) {
            setCurrentId(newEpisodeData._id);
            form.setFieldsValue({
                name: newEpisodeData.name,
                description: newEpisodeData.description,
                season_id: newEpisodeData.season_id,
                thumbnail_id: newEpisodeData.thumbnail_id
            });
        } else {
            form.resetFields();
        }
    }, [editMode, newEpisodeData, form]);

    const onFinish = (values) => {
        if (editMode) {
            handleUpdateEpisode({ ...values, _id: currentId }); 
        } else {
            handleAddEpisode(values);
        }
    };

    return (
        <Modal
            title={editMode ? 'Edit Episode' : 'Add Episode'}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={editMode ? newEpisodeData : {}}
            >
                <Form.Item
                    label="Episode Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the episode name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Season"
                    name="season_id"
                    rules={[{ required: true, message: 'Please select a season!' }]}
                >
                    <Select placeholder="Select a season">
                        {seasonList.map(season => (
                            <Select.Option key={season._id} value={season._id}>
                                {season.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Thumbnail"
                    name="thumbnail_id"
                    rules={[{ required: true, message: 'Please select a thumbnail!' }]}
                >
                    <Select placeholder="Select a thumbnail">
                        {fileList.map(file => (
                            <Select.Option key={file._id} value={file._id}>
                                {file.original_name} {/* Use the original name */}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {editMode ? 'Update Episode' : 'Add Episode'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddEditEpisode;
