// EditModal.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';

const categories = ['Todo', 'In Progress', 'Done'];

const EditModal = ({ open, task, onClose, onSave }) => {
    const [formData, setFormData] = useState(task || {});

    useEffect(() => {
        setFormData(task || {});
    }, [task]);

    const handleSave = async () => {
        await onSave(formData); 
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 200 }}
                />
                <Select
                    value={formData.category || 'Todo'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    fullWidth
                    margin="dense"
                >
                    {categories.map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModal;