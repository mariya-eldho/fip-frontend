import React, { useState } from "react";
import { Form, TextInput, Button } from "carbon-components-react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  signinWithEmail,
  signinWithGoogle,
} from "../../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userAuth);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    await dispatch(signinWithGoogle());
    router.push("/service-provider");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signinWithEmail(email, password));
    router.push("/service-provider");
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
          Log In As Service Provider
        </Button>
      </Form>
      <div style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <a
          onClick={() => router.push("/service-provider/signup")}
          style={{ cursor: "pointer", color: "#0f62fe" }}
        >
          Sign up
        </a>
      </div>
      <Button onClick={handleGoogleSignIn} className={styles.googleSignIn}>
        <FcGoogle style={{ marginRight: "1rem", height: "20px" }} />
        Sign in with Google
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
