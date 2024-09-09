import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Button, Select } from 'antd';

const AddEditSeason = ({
    isModalVisible,
    handleCancel,
    editMode,
    newSeasonData,
    handleAddSeason,
    handleUpdateSeason,
    seriesList 
}) => {
    const [form] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);
    
    useEffect(() => {
        if (editMode) {
            setCurrentId(newSeasonData._id);
            form.setFieldsValue({
                name: newSeasonData.name,
                description: newSeasonData.description,
                series_id: newSeasonData.series_id,
            });
        } else {
            form.resetFields();
        }
    }, [editMode, newSeasonData, form]);

    const onFinish = (values) => {
        if (editMode) {
            handleUpdateSeason({ ...values, _id: currentId }); 
        } else {
            handleAddSeason(values);
        }
    };

    return (
        <Modal
            title={editMode ? 'Edit Season' : 'Add Season'}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={editMode ? newSeasonData : {}}
            >
                <Form.Item
                    label="Season Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the season name!' }]}
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
                    label="Series"
                    name="series_id"
                    rules={[{ required: true, message: 'Please select a series!' }]}
                >
                    <Select placeholder="Select a series">
                        {seriesList.map(series => (
                            <Select.Option key={series._id} value={series._id}>
                                {series.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {editMode ? 'Update Season' : 'Add Season'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddEditSeason;
