import React from 'react';

const getRankDisplay = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  if (typeof rank === 'number') return `#${rank}`;
  return '-';
};

const Leaderboard = ({ leaderboard }) => (
  <div className="leaderboard mt-4">
    <h3 className="fw-bold mb-3">🏆 Leaderboard</h3>
    {leaderboard.length === 0 ? (
      <p className="text-muted">No users found.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '80px' }}>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user._id}>
                <td className="fw-bold text-center">{getRankDisplay(user.rank ?? index + 1)}</td>
                <td>{user.name || '-'}</td>
                <td>{user.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default Leaderboard;
