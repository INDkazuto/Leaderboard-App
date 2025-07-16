// routes/historyRoutes.js
import express from 'express';
import PointHistory from '../modles/PointHistory.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const history = await PointHistory.find().populate('userId', 'name').sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
