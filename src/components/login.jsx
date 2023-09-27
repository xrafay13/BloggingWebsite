import React, { useState } from "react";
import "./login.css";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

import {
  Title,
  TextInput,
  Checkbox,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom/dist";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      sendPasswordResetEmail(auth, email).then((data) => {
        alert("Check your G-Mail");
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      alert("SIGNIN SUCCESSFUL");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="white-form">
          <Title
            style={{ marginBottom: "1rem", color: "black", fontSize: "3rem" }}
            order={1}
          >
            Login
          </Title>
          <TextInput
            className="emailInput"
            variant="filled"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            styles={{
              input: {
                border: "none",
                fontSize: "15px",
              },
            }}
          />
          <PasswordInput
            className="passwordInput"
            variant="filled"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            styles={{
              input: {
                border: "none",
                fontSize: "15px",
              },
            }}
          />

          <p
            onClick={handleForgotPassword}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = "underline";
              e.target.style.color = "crimson";
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = "none";
              e.target.style.color = "grey";
            }}
            style={{
              background: "none",
              border: "none",
              color: "grey",
              cursor: "pointer",

              marginTop: "2rem",
              textDecoration: "underline",
            }}
          >
            Forgot your password?
          </p>

          <Button
            className="login-button"
            variant="filled"
            color="orange"
            size="lg"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </div>

        <div className="pink-form">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",

              height: "100%",
            }}
          >
            <Title
              style={{
                marginBottom: "1rem",
                color: "white",
                fontSize: "2rem",
              }}
              order={1}
            >
              HELLO, FRIEND!
            </Title>
            <Title
              style={{
                marginBottom: "2rem",
                color: "white",
              }}
              order={6}
            >
              Enter your details and start your journey with us
            </Title>
            <Button
              className="signup-button"
              variant="filled"
              color="red"
              size="lg"
              radius="xl"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
