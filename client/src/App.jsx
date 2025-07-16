import React, { useState, useEffect } from "react";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import PointHistory from "./components/PointHistory";
import AddUserModal from "./components/AddUserModal";
import { api } from "./services/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [notification, setNotification] = useState(null);
  const [claimError, setClaimError] = useState(null); // 🆕 error state for claim

  // Fetch initial users and history
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, historyRes] = await Promise.all([
        api.getUsers(),
        api.getPointHistory(),
      ]);
      setUsers(usersRes?.data || []);
      setHistory(historyRes?.data || []);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    setClaimError(null); // 🧹 clear previous errors
    try {
      setIsClaiming(true);
      const response = await api.claimPoints(selectedUser);

      // Update users with latest rankings
      setUsers(response?.data?.rankings || []);

      const claimedUser = response?.data?.rankings?.find(
        (u) => u._id === selectedUser
      );

      setNotification({
        message: `${claimedUser?.name || "User"} earned ${
          response?.data?.pointsAdded || 0
        } points!`,
        user: claimedUser,
      });

      // Refresh history
      const historyRes = await api.getPointHistory();
      setHistory(historyRes?.data || []);

      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Claim failed:", error);
      const msg =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong while claiming points.";
      setClaimError(msg); // 🆕 set claim error
      setNotification({
        message: msg,
        user: null,
      });
      setTimeout(() => {
        setClaimError(null);
        setNotification(null);
      }, 5000);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      await api.addUser(name);
      const response = await api.getUsers();
      setUsers(response?.data || []);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 fw-bold">🎯 Point Claim System</h1>

      {notification && (
        <div
          className={`alert ${
            claimError ? "alert-danger" : "alert-success"
          } text-center fade-in-out`}
        >
          {notification.message}
        </div>
      )}

      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
            onAddUserClick={() => setShowAddModal(true)}
          />
          <ClaimButton
            selectedUser={selectedUser}
            onClick={handleClaimPoints}
            isClaiming={isClaiming}
            error={claimError}
          />
        </div>
      </div>

      <div className="row gx-4 gy-3">
        <div className="col-md-6">
          <Leaderboard leaderboard={users} />
        </div>
        <div className="col-md-6">
          <PointHistory history={history} />
        </div>
      </div>
      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
}

export default App;
