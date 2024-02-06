import React from 'react';
import Appbar from '../components/Appbar';

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div style={{ padding: "20px" }}>Your Balance 5000</div>
      <div style={{ padding: "20px" }}>Users</div>
      <div style={{ padding: "20px" }}>
        <div class="search-container">
          <input type="text" placeholder="Search..." />
          
          <button style={{marginLeft:'10px'}} type="submit">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;