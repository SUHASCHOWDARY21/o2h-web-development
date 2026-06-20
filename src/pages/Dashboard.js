import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, updateTask, deleteTask } from '../services/api';
import TaskCard from '../components/TaskCard';
import StatsSection from '../components/StatsSection';
import { Search, Plus, ListTodo, SlidersHorizontal, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    Pending: 0,
    'In Progress': 0,
    Completed: 0
  });

  // Query variables
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sort, setSort] = useState('newest');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch tasks callback
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getTasks({
        search,
        status: statusFilter,
        sort
      });
      setTasks(response.data.tasks);
      setStats(response.data.stats);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(
        err.response?.data?.message || 'Failed to fetch tasks. Please verify that the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sort]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Event handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await updateTask(id, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task status:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setActionLoading(true);
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert(err.response?.data?.message || 'Failed to delete task');
      setActionLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4 animate-fade-in">
        <div>
          <h2 className="fw-bold text-color-custom m-0">Project Workspace</h2>
          <p className="text-muted-custom m-0">Organize, schedule, and complete project tasks</p>
        </div>
        <Link to="/add-task" className="btn btn-primary-custom d-flex align-items-center justify-content-center gap-2 align-self-start align-self-sm-center" id="add-task-btn">
          <Plus size={18} />
          <span>Add New Task</span>
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger-custom d-flex justify-content-between align-items-center mb-4" role="alert">
          <div>{error}</div>
          <button onClick={fetchTasks} className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Numerical Stats Widgets */}
      <StatsSection stats={stats} />

      {/* Search & Filter bar */}
      <div className="card mb-4 shadow-sm animate-fade-in">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            
            {/* Search Input */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-input-custom border-end-0">
                  <Search size={18} className="text-muted-custom" />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  className="form-control bg-input-custom border-start-0 text-color-custom"
                  placeholder="Search tasks..."
                  id="search-input"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-input-custom border-end-0">
                  <SlidersHorizontal size={16} className="text-muted-custom" />
                </span>
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="form-select bg-input-custom text-color-custom border-start-0"
                  id="sort-select"
                >
                  <option value="newest">Latest Created</option>
                  <option value="oldest">Oldest Created</option>
                  <option value="title_asc">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-start justify-content-sm-end gap-1 flex-wrap">
              <button
                onClick={() => handleFilterChange('')}
                className={`btn btn-sm ${statusFilter === '' ? 'btn-primary-custom' : 'btn-outline-secondary-custom'}`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange('Pending')}
                className={`btn btn-sm ${statusFilter === 'Pending' ? 'btn-warning-custom' : 'btn-outline-warning-custom'}`}
              >
                Pending
              </button>
              <button
                onClick={() => handleFilterChange('In Progress')}
                className={`btn btn-sm ${statusFilter === 'In Progress' ? 'btn-info-custom' : 'btn-outline-info-custom'}`}
              >
                In Progress
              </button>
              <button
                onClick={() => handleFilterChange('Completed')}
                className={`btn btn-sm ${statusFilter === 'Completed' ? 'btn-success-custom' : 'btn-outline-success-custom'}`}
              >
                Completed
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Task Listing View */}
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 min-vh-40">
          <div className="spinner-border text-primary-custom mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted-custom">Loading task list...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="card text-center py-5 shadow-sm animate-fade-in">
          <div className="card-body">
            <div className="bg-primary-subtle text-primary-custom d-inline-flex p-3 rounded-circle mb-3">
              <ListTodo size={40} />
            </div>
            <h4 className="fw-bold text-color-custom">No Tasks Found</h4>
            <p className="text-muted-custom mx-auto max-w-400">
              {search || statusFilter
                ? "No tasks match your search or filter configuration. Reset filters to see tasks."
                : "Your project management board is empty! Add your very first task to get started."}
            </p>
            {search || statusFilter ? (
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('');
                }}
                className="btn btn-outline-secondary-custom mt-2"
              >
                Clear Filters
              </button>
            ) : (
              <Link to="/add-task" className="btn btn-primary-custom mt-2">
                Create First Task
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Action Blocker Overlay */}
          {actionLoading && (
            <div className="action-loading-overlay">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          )}
          
          <div className="row g-3 animate-fade-in">
            {tasks.map((task) => (
              <div key={task.id || task._id} className="col-12 col-md-6 col-lg-4">
                <TaskCard
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
