import React, { useState } from "react";
import { Form, TextInput, Button } from "carbon-components-react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/login.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { logIn, GoogleLogin, error } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    await logIn();
    router.push("/");
  };

  const googleSignIn = async (e) => {
    e.preventDefault();
    await GoogleLogin();
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form onSubmit={onSubmit} style={{ width: "300px" }}>
        <TextInput
          id="email"
          labelText="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          id="password"
          labelText="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" style={{ marginTop: "20px", width: "100%" }}>
          Log In
        </Button>
      </Form>
      <div style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <a
          onClick={() => router.push("/signup")}
          style={{ cursor: "pointer", color: "#0f62fe" }}
        >
          Sign up
        </a>
      </div>
      <Button onClick={googleSignIn} className={styles.googleSignIn}>
        <FcGoogle style={{ marginRight: "1rem", height: "20px" }} />
        Sign in with Google
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
