import React from 'react';
import moment from 'moment';

const PointHistory = ({ history }) => (
  <div className="point-history mt-4">
    <h3 className="fw-bold mb-3">📜 Point Claim History</h3>
    {history.length === 0 ? (
      <p className="text-muted">No point claims yet.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '200px' }}>Date</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record._id}>
                <td>{moment(record.date).format('MMM D, YYYY • h:mm A')}</td>
                <td>{record.userId?.name || 'Unknown'}</td>
                <td>
                  <span className="badge bg-success">+{record.pointsAwarded}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default PointHistory;
