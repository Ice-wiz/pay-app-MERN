import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
// import Appbar from "./components/Appbar";

function App() {
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {<Route path="/signin" element={<Signin />} />}
          {<Route path="/signup" element={<Signup />} />}
          {<Route path="/dashboard/:firstname" element={<Dashboard />} />}
          {<Route path="/send" element={<SendMoney />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
