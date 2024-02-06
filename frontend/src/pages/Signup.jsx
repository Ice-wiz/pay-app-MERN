import { Link } from "react-router-dom";

import Heading from "../components/Heading";
import Button from "../components/Button";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";

const Signup = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div style={{ paddingBottom: "10px" }}>
          <Heading text={"Signup"} />{" "}
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <SubHeading text={"enter information"}></SubHeading>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <InputBox text={"email"} placeholder={"abc@gmail.com"}></InputBox>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <InputBox text={"password"} placeholder={"xxxxx"}></InputBox>
        </div>

        <div style={{ paddingBottom: "10px", width: "200px", border: "1px" }}>
          <Button text={"click"} onClick={() => console.log("hi")} />
        </div>
      </div>
    </>
  );
};

export default Signup;
