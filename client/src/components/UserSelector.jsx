import React from 'react';

const UserSelector = ({ users, selectedUser, onUserSelect, onAddUserClick }) => (
  <div className="user-selector d-flex gap-2 flex-grow-1">
    <select
      value={selectedUser || ''}
      onChange={(e) => onUserSelect(e.target.value)}
      className="form-select"
      aria-label="Select user"
    >
      <option value="" disabled>
        👤 Select a user
      </option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>

    <button
      onClick={onAddUserClick}
      className="btn btn-outline-primary"
      aria-label="Add new user"
    >
      ➕ Add User
    </button>
  </div>
);

export default UserSelector;
