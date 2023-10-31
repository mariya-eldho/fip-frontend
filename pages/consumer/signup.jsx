import { useState } from "react";
import { useRouter } from "next/router";
import { Form, TextInput, Button } from "carbon-components-react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerWithEmail,
  signinWithGoogle,
} from "../../store/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/login.module.scss";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.userAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => await dispatch(signinWithGoogle());

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      registerWithEmail({
        userName: userName,
        email: email,
        password: password,
      })
    );
    router.push("/consumer");
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
          id="userName"
          labelText="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextInput
          id="email"
          labelText="Email"
          type="email"
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
          Sign Up as Consumer
        </Button>
      </Form>
      <Button onClick={handleGoogleSignIn} className={styles.googleSignIn}>
        <FcGoogle style={{ marginRight: "1rem", height: "20px" }} />
        Sign in with Google
      </Button>
      <div className="mt-5"></div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <a
          onClick={() => router.push("/consumer/login")}
          style={{ cursor: "pointer", color: "#0f62fe" }}
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default SignUp;
