import Heading from "../components/Heading";
import Button from "../components/Button";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  //states
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
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
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          email,
          firstname,
          lastname,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate(`/dashboard/${firstname}`);
      console.log("Signup Successful", response.data);
    } catch (error) {
      console.log("Error in Signup", error);
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
              setFunction={setFirstName}
              placeholder={"aryan"}
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"lastname"}
              setFunction={setLastName}
              placeholder={"sharma"}
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <InputBox
              text={"email"}
              setFunction={setEmail}
              placeholder={"abc@gmail.com"}
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
              buttonText={"Signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

// import  {useState}  from "react"
// import  BottomWarning  from "../components/BottomWarning"
// import  Button  from "../components/Button"
// import  Heading  from "../components/Heading"
// import  InputBox  from "../components/InputBox"
// import  SubHeading  from "../components/SubHeading"
// import axios from "axios";
// import { useNavigate } from "react-router-dom"

//  const Signup = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     return <div className="bg-slate-300 h-screen flex justify-center">
//     <div className="flex flex-col justify-center">
//       <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//         <Heading label={"Sign up"} />
//         <SubHeading label={"Enter your infromation to create an account"} />
//         <InputBox onChange={e => {
//           setFirstName(e.target.value);
//         }} placeholder="John" label={"First Name"} />
//         <InputBox onChange={(e) => {
//           setLastName(e.target.value);
//         }} placeholder="Doe" label={"Last Name"} />
//         <InputBox onChange={e => {
//           setEmail(e.target.value);
//         }} placeholder="harkirat@gmail.com" label={"Email"} />
//         <InputBox onChange={(e) => {
//           setPassword(e.target.value)
//         }} placeholder="123456" label={"Password"} />
//         <div className="pt-4">
//           <Button onClick={async () => {
//             const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
//               Email,
//               firstName,
//               lastName,
//               password
//             });
//             localStorage.setItem("token", response.data.token)
//             navigate("/dashboard")
//           }} label={"Sign up"} />
//         </div>
//         <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//       </div>
//     </div>
//   </div>
// }

// export default Signup
