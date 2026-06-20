import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTask } from '../services/api';
import { ClipboardList, Heading, FileText, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = `Description must be at least 20 characters (current length: ${formData.description.trim().length})`;
    }

    if (!['Pending', 'In Progress'].includes(formData.status)) {
      newErrors.status = 'Please choose a valid status option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      await createTask(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Failed to create task:', error);
      setApiError(
        error.response?.data?.message || 'Failed to save task. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
          <div className="mb-4">
            <Link to="/" className="btn btn-link nav-link p-0 d-inline-flex align-items-center gap-1">
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="card task-form-card shadow-lg">
            <div className="card-body p-4 p-md-5">
              
              <div className="text-center mb-4">
                <div className="auth-icon-bg bg-primary-subtle text-primary-custom d-inline-flex p-3 rounded-circle mb-3">
                  <ClipboardList size={32} />
                </div>
                <h3 className="fw-bold text-color-custom">Add New Task</h3>
                <p className="text-muted-custom">Configure task metadata and publish to your workspace</p>
              </div>

              {success && (
                <div className="alert alert-success-custom d-flex align-items-center gap-2 mb-4 animate-fade-in" role="alert">
                  <CheckCircle size={18} className="flex-shrink-0" />
                  <div>Task published successfully! Redirecting...</div>
                </div>
              )}

              {apiError && (
                <div className="alert alert-danger-custom d-flex align-items-center gap-2 mb-4" role="alert">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <div>{apiError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label text-color-custom fw-semibold">
                    Task Title <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-input-custom border-end-0">
                      <Heading size={18} className="text-muted-custom" />
                    </span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      disabled={success}
                      className={`form-control bg-input-custom border-start-0 ${
                        errors.title ? 'is-invalid' : ''
                      }`}
                      placeholder="Enter task title"
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label text-color-custom fw-semibold">
                    Task Description <span className="text-danger">*</span>
                  </label>
                  <div className="input-group align-items-start">
                    <span className="input-group-text bg-input-custom border-end-0 pt-2.5">
                      <FileText size={18} className="text-muted-custom" />
                    </span>
                    <textarea
                      name="description"
                      id="description"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={success}
                      className={`form-control bg-input-custom border-start-0 rounded-end ${
                        errors.description ? 'is-invalid' : ''
                      }`}
                      placeholder="Enter a detailed task description... (Minimum 20 characters)"
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback d-block">{errors.description}</div>
                    )}
                  </div>
                  <div className="form-text text-end text-muted-custom small mt-1">
                    {formData.description.trim().length} / 20 characters minimum
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label htmlFor="status" className="form-label text-color-custom fw-semibold">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={success}
                    className="form-select bg-input-custom text-color-custom"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="btn btn-primary-custom flex-grow-1 py-2.5 d-flex align-items-center justify-content-center gap-2"
                    id="submit-add-task-btn"
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Publish Task'
                    )}
                  </button>
                  <Link
                    to="/"
                    className="btn btn-outline-secondary-custom px-4 py-2.5 d-flex align-items-center justify-content-center"
                  >
                    Cancel
                  </Link>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddTask;
