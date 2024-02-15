import { Input } from "postcss";
import React from "react";

const Appbar = ({user}) => {  
  return (
    <div >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "2px solid #e0e0e0",
          padding: "20px",
        }}
      >
        <div>Payment app</div>
        <div>hello,{user}</div>
      </div>
    </div>
  );
};

export default Appbar;
