import express from "express";
import User from "../modles/User.js";
import { calculateRanks } from "../utils/rankingUtils.js";
import PointHistory from "../modles/PointHistory.js";

const router = express.Router();

// Initialize users (bulk creation)
router.post("/init", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Not allowed in production" });
  }

  try {
    const userNames = [
      "Rahul",
      "Kamal",
      "Sanak",
      "Priya",
      "Vikram",
      "Anjali",
      "Arjun",
      "Neha",
      "Rohan",
      "Sneha",
    ];
    await User.deleteMany({});
    const users = await User.insertMany(userNames.map((name) => ({ name })));
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create single user
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const existingUser = await User.findOne({ name });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim points
router.post("/claim", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID required" });

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: randomPoints } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    const historyRecord = new PointHistory({
      userId: updatedUser._id,
      pointsAwarded: randomPoints,
    });
    await historyRecord.save();

    const allUsers = await User.find();
    const rankedUsers = calculateRanks(allUsers);

    res.json({
      user: updatedUser,
      pointsAdded: randomPoints,
      rankings: rankedUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get rankings
router.get("/rankings", async (req, res) => {
  try {
    const users = await User.find();
    const rankedUsers = calculateRanks(users);
    res.json(rankedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
