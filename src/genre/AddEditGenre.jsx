import React from 'react';
import { Modal, Button } from 'antd';
import { TextField } from '@mui/material';

const AddEditGenre = ({
    isModalVisible,
    handleCancel,
    editMode,
    newGenreName,
    setNewGenreName,
    handleAddGenre,
    handleUpdateGenre,
}) => {
    return (
        <Modal
            title={editMode ? "Edit Genre" : "Add Genre"}
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={editMode ? handleUpdateGenre : handleAddGenre}
            okText={editMode ? "Update" : "Add"}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={editMode ? handleUpdateGenre : handleAddGenre}
                >
                    {editMode ? "Update" : "Add"}
                </Button>
            ]}
            width="65%"
            style={{ top: 35, padding: 20, marginLeft: 150}}
            bodyStyle={{ height: 'calc(100vh - 300px)', overflow: 'auto' }}
            centered
        >
            <div style={{ padding: '20px' }}>
                <TextField
                    label="Genre Name"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </div>
        </Modal>
    );
};

export default AddEditGenre;
