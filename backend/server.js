import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import historyRoutes from './routes/historyRoutes.js'

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);

// Initialize Users Endpoint
// app.post('/api/init-users', async (req, res) => {
//   try {
//     const response = await fetch('http://localhost:3000/api/users/init', {
//       method: 'POST'
//     });
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





