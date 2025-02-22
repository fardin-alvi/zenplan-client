import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { Authcontext } from '../provider/AuthProvider';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import EditModal from '../component/EditModal';
import moment from 'moment'

const categories = ['Todo', 'In Progress', 'Done'];

const ItemTypes = {
    TASK: 'task',
};

const Task = () => {
    const [newTask, setNewTask] = useState({ title: '', description: '', category: 'Todo' });
    const [editTask, setEditTask] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false); 
    const { user } = useContext(Authcontext);
    const queryClient = useQueryClient();

    // Fetch tasks
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/tasks');
            return res.data;
        },
    });

    // Handle task update
    const handleUpdateTask = async (updatedTask) => {
        await axios.patch(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask);
        queryClient.invalidateQueries(['tasks']);
        setOpenEditModal(false); 
    };

    // Handle task add
    const handleCreateTask = async () => {
        const res = await axios.post('http://localhost:5000/tasks', {
            ...newTask,
            user: user.uid,
        });
        toast.success('Task Added Successfully');
        refetch();
        setNewTask({ title: '', description: '', category: 'Todo' });
    };

    // Handle task delete
    const handleDeleteTask = async (taskId) => {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        toast.success('Deleted Task');
        refetch();
    };

    const DragItem = ({ task, index }) => {
        const [, dragRef] = useDrag({
            type: ItemTypes.TASK,
            item: { id: task._id, index },
        });

        return (
            <div ref={dragRef} className="p-2 mb-2 bg-base-200 rounded shadow">
                <h4 className="font-bold">{task.title}</h4>
                <p className="text-white">{task.description}</p>
                <p className="text-gray-300 text-sm">
                    {moment(task.createdAt).format("MMMM Do YYYY, h:mm a")}
                </p>
                <div className="flex justify-between mt-2">
                    <Button onClick={() => { setEditTask(task); setOpenEditModal(true); }}>
                        Edit
                    </Button>
                    <Button color="error" onClick={() => handleDeleteTask(task._id)}>Delete</Button>
                </div>
            </div>
        );
    };

    const DropZone = ({ category, tasks }) => {
        const [, dropRef] = useDrop({
            accept: ItemTypes.TASK,
            drop: (item) => {
                const draggedTask = tasks.find(t => t._id === item.id);
                const newCategory = category;
                const newOrder = tasks.filter(t => t.category === category).length + 1;

                // Update task order and category
                handleUpdateTask({
                    ...draggedTask,
                    category: newCategory,
                    order: newOrder,
                    originalCategory: draggedTask.category,
                });
            },
        });

        return (
            <div ref={dropRef} className="flex-1 p-4 rounded border-white border">
                <h3 className="text-xl font-bold mb-4 text-white">{category}</h3>
                {tasks
                    .filter(t => t.category === category)
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                        <DragItem key={task._id} task={task} index={index} />
                    ))}
            </div>
        );
    };

    // Handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreateTask();
    };

    return (
        <div className="p-4">
            {/* Add Task Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 flex bg-blue-50 gap-x-3 items-center rounded">
                <TextField
                    label="Title"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    className="mb-4"
                />
                <TextField
                    label="Description"
                    multiline
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    className="mb-4"
                />
                <Button type="submit" variant="contained" color="primary">Add Task</Button>
            </form>

            {/* Task Columns */}
            <div className="flex flex-col md:flex-row gap-4">
                {categories.map(category => (
                    <DropZone key={category} category={category} tasks={tasks} />
                ))}
            </div>

            {/* Edit Modal */}
            <EditModal
                open={openEditModal}
                task={editTask}
                onClose={() => setOpenEditModal(false)}
                onSave={handleUpdateTask}
            />
        </div>
    );
};

export default Task;
