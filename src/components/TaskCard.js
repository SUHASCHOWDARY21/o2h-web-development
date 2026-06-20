import React from 'react';
import { Calendar, Trash2, CheckCircle2, Play } from 'lucide-react';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge bg-success-custom';
      case 'In Progress':
        return 'badge bg-info-custom';
      case 'Pending':
      default:
        return 'badge bg-warning-custom';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`card task-card h-100 ${task.status === 'Completed' ? 'completed-task' : ''}`}>
      <div className="card-body d-flex flex-column">
        
        {/* Top Badges */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className={getStatusBadgeClass(task.status)}>{task.status}</span>
          <span className="text-muted-custom small d-flex align-items-center gap-1">
            <Calendar size={12} />
            {formatDate(task.createdAt)}
          </span>
        </div>
        
        {/* Title & Description */}
        <h5 className="card-title fw-bold mb-2 text-gradient-hover text-color-custom">{task.title}</h5>
        <p className="card-text text-muted-custom flex-grow-1 task-description">
          {task.description}
        </p>

        {/* Buttons / Actions */}
        <div className="mt-3 pt-3 border-top border-muted-custom d-flex justify-content-between align-items-center gap-2">
          <div className="d-flex gap-2">
            {task.status === 'Pending' && (
              <button
                onClick={() => onStatusChange(task.id || task._id, 'In Progress')}
                className="btn btn-sm btn-outline-info-custom d-flex align-items-center gap-1"
                title="Start Task"
              >
                <Play size={14} />
                <span>Start</span>
              </button>
            )}
            
            {task.status !== 'Completed' && (
              <button
                onClick={() => onStatusChange(task.id || task._id, 'Completed')}
                className="btn btn-sm btn-outline-success-custom d-flex align-items-center gap-1"
                title="Complete Task"
              >
                <CheckCircle2 size={14} />
                <span>Complete</span>
              </button>
            )}
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                onDelete(task.id || task._id);
              }
            }}
            className="btn btn-sm btn-outline-danger-custom d-flex align-items-center gap-1 ms-auto"
            title="Delete Task"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
