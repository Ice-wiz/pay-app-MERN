import Heading from "../components/Heading";
import Button from "../components/Button";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/');
    }
  }, []);

  const handleOnClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email: email,
        password: password,
      });
      console.log("Signin successful", response);  
      localStorage.setItem("token", response.data.token);
     
      const firstname=response.data.firstname;   
    // Redirect the user to the dashboard page
    navigate(`/dashboard/${firstname}`);
    // You can use the useHistory hook from react-router-dom to do this

    } catch (error) {
      console.error("Error during signin", error);
      // Display an error message to the user
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Card-like container */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.3)",
            width: "300px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingBottom: "20px" }}>
            <Heading text={"Signin"} />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <SubHeading text={"Enter credentials"} />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"email"}
              placeholder={"abc@gmail.com"}
              setFunction={setEmail}
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"password"}
              setFunction={setPassword}
              placeholder={"xxxxx"}
            />
          </div>
          <div style={{ paddingBottom: "20px", width: "200px" }}>
            <Button text={"Click"} onClick={handleOnClick} />
          </div>
          <div style={{ paddingBottom: "20px", width: "200px" }}>
            <BottomWarning
              text={"Already have an account?"}
              buttonText={"Signup"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;