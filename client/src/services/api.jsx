import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // User endpoints
  getUsers: () => axios.get(`${API_BASE_URL}/users/rankings`),
  addUser: (name) => axios.post(`${API_BASE_URL}/users`, { name }),
  claimPoints: (userId) => axios.post(`${API_BASE_URL}/users/claim`, { userId }),

  // History endpoint
  getPointHistory: () => axios.get(`${API_BASE_URL}/history`),
};
