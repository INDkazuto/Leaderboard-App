// utils/rankingUtils.js
export const calculateRanks = (users) => {
  const sorted = [...users].sort((a, b) => b.points - a.points);
  return sorted.map((user, index) => ({
    ...user.toObject(),
    rank: index + 1,
  }));
};
