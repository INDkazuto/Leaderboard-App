import React, { useState } from 'react';

const AddUserModal = ({ show, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddUser(name);
      setName('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to add user');

    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header mb-3">
          <h5 className="modal-title d-flex align-items-center gap-2">
            <span className="text-primary fs-4">➕</span> Add New User
          </h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label fw-semibold">
                Name
              </label>
              <input
                id="userName"
                type="text"
                className="form-control"
                placeholder="Enter user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
