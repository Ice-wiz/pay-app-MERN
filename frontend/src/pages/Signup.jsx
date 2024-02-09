import Heading from "../components/Heading";
import Button from "../components/Button";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from 'axios';
// import Link from 'react-router-dom'

const Signup = () => {
  //states

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = async() => {
    try {
      const response=await axios.post('http://localhost:3000/api/v1/user/signup',{
        username:email,
        password:password,
        firstName:firstName,
        lastName:lastName
      });
      localStorage.setItem("token", response.data.token)
      console.log("Signup Successful",response.data)
    } catch (error) {
      console.log("Error in Signup",error);
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
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.3)",
            width: "350px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingBottom: "20px" }}>
            <Heading text={"Signup"} />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <SubHeading text={"Enter information"} />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"firstName"}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={"aryan"}
              
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"lastname"}
              Onchange={(e) => setLastName(e.target.value)}
              placeholder={"sharma"}
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"email"}
              Onchange={(e) => setEmail(e.target.value)}
              placeholder={"abc@gmail.com"}
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"password"}
              Onchange={(e) => setPassword(e.target.value)}
              placeholder={"xxxxx"}
            />
          </div>

          <div style={{ paddingBottom: "20px", width: "200px" }}>
            <Button text={"Click"} onClick={handleOnClick} />
          </div>
          <div style={{ paddingBottom: "20px", width: "200px" }}>
            <BottomWarning
              text={"Already have an account?"}
              buttonText={"Signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
