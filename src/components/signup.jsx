import React, { useState } from "react";
import {
  Title,
  TextInput,
  Checkbox,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom/dist";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        confirmPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-background">
      <div className="login-container">
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
              WELCOME BACK!
            </Title>
            <Title
              style={{
                marginBottom: "2rem",
                color: "white",
              }}
              order={6}
            >
              To keep connected with us please login with your personal info
            </Title>
            <Button
              className="signup-button"
              variant="filled"
              color="red"
              size="lg"
              radius="xl"
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </div>
        </div>

        <div className="white-form">
          <Title
            style={{ marginBottom: "1rem", color: "black", fontSize: "3rem" }}
            order={1}
          >
            SignUp
          </Title>
          <TextInput
            variant="filled"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextInput
            className="passwordInput"
            variant="filled"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            className="passwordInput"
            variant="filled"
            withAsterisk
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            className="passwordInput"
            variant="filled"
            withAsterisk
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            className="login-button"
            variant="filled"
            color="orange"
            size="lg"
            onClick={handleSignUp}
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
