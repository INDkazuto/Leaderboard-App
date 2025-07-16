import mongoose from 'mongoose';

const pointHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pointsAwarded: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const PointHistory = mongoose.model('PointHistory', pointHistorySchema);

export default PointHistory;
