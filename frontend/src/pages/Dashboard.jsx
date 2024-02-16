import React from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  // const { state } = useLocation();
  // const { balance_from, balance_to } = state || { balance_from: 10000 };
  // console.log("this is " + balance_from);
  const { firstname } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setAmount(response.data.balance);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [amount]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out");
    navigate("/signup");
  };

  return (
    <div>
      <button
        className="flex flex-col justify-center h-ful bg-black text-white rounded-lg"
        style={{ position: "fixed", left: "1460px",width:"70px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
      <Appbar user={firstname} />
      <div className="m-8">
        <Balance value={amount} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
