import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all tasks (supports query filters)
export const getTasks = async (params = {}) => {
  const response = await API.get('/tasks', { params });
  return response.data;
};

// Create a task
export const createTask = async (taskData) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
};

// Update a task (details or status)
export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};

export default API;
