import React from 'react';

const ClaimButton = ({ selectedUser, onClick, isClaiming, error }) => {
  const disabled = !selectedUser || isClaiming;

  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`btn claim-btn ${disabled ? 'btn-disabled' : 'btn-active'}`}
        title={!selectedUser ? 'Select a user to claim points' : ''}
      >
        {isClaiming ? (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        ) : null}
        {isClaiming ? 'Processing...' : 'Claim Points'}
      </button>

      {/* Error message display */}
      {error && (
        <div className="mt-2 text-danger small">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default ClaimButton;
