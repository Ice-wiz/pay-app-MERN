import React from 'react';
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { balance_from, balance_to } = state || { balance_from: 10000 };
  const { firstname } = useParams();


  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out");
    navigate('/signup');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Appbar user={firstname} />
      <div className="m-8">
        <Balance value={balance_from} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;