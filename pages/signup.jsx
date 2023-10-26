import { useState } from "react";
import { useRouter } from "next/router";
import { Form, TextInput, Button } from "carbon-components-react";

import { useAuth } from "../context/AuthUserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  //Optional error handling
  const [err, setErr] = useState(null);

  const { signUp, error } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErr(null);
    if (passwordOne === passwordTwo) {
      setErr(null);
      await signUp(email, passwordOne);
    } else {
      setErr("Password do not match");
    }
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
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
        />
        <TextInput
          id="password"
          labelText="Confirm Password"
          type="password"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
        <Button type="submit" style={{ marginTop: "20px", width: "100%" }}>
          Sign Up
        </Button>
      </Form>
      {err && <p style={{ color: "red" }}>{err}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <a
          onClick={() => router.push("/login")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default SignUp;
