import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Form, TextInput, Button } from "carbon-components-react";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "@carbon/react";
import {
  registerWithEmail,
  signinWithGoogle,
} from "../../store/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/login.module.scss";
import YourImage from '../../public/img.jpg';


const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.userAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    await dispatch(signinWithGoogle());
    router.push("/consumer");
  };

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
    <div>
      <Theme theme="white">
      <div className={styles.loginPageContainer}>
      {/* Move the login form to the left */}
      <div className={styles.loginForm}>
      <div className={styles.loginHeading}>
        <h4>Sign Up</h4>
      </div>
      <Form onSubmit={onSubmit} style={{ width: "320px" }}>
        <TextInput
          id="userName"
          labelText="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextInput
          id="email"
          labelText="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextInput
          id="password"
          labelText="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" style={{ marginTop: "20px", paddingLeft: "19%" ,width:"100%", backgroundColor:"#450d73", justifyContent:"space-around",}}>
        SIGN UP
        </Button>
      </Form> <br />
      <p style={{alignContent: "center"}}>OR</p>
      <Button onClick={handleGoogleSignIn} className={styles.googleSignIn} style={{backgroundColor: "#450d73",}}>
        <FcGoogle style={{ marginRight: "1rem", height: "20px" }} />
        Sign in with Google
      </Button>
      <div className="mt-5"></div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "20px", textAlign: "center", }}>
        Already have an account?{" "} <br />
        <a
          onClick={() => router.push("/consumer/login")}
          style={{ cursor: "pointer", color: "#450d73" }}
        >
          Log in
        </a>
      </div>
    </div>
     {/* Add an image on the right */}
     <div className={styles.imageContainer}>
        <Image src={YourImage} alt="Your Image"  className={styles.image} />
      </div>
    </div>

      </Theme>
    </div>
      );
}

 export default SignUp;
