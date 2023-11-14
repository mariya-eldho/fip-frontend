import React, { useState } from "react";
import { Form, TextInput, Button } from "carbon-components-react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/login.module.scss";
import Image from 'next/image'
import {
  signinWithEmail,
  signinWithGoogle,
} from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import YourImage from '../../public/loginfsp.svg';

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
    <div className={styles.loginPageContainer}>
      {/* Move the login form to the left */}
      <div className={styles.loginForm}>
      <div className={styles.loginHeading}>
        <h4>Login</h4>
      </div>
      <Form onSubmit={onSubmit} style={{ width: "320px" }}>
        <TextInput
          id="email"
          labelText="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <TextInput
          id="password"
          labelText="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" style={{ marginTop: "20px", paddingLeft: "19%" ,width:"100%", backgroundColor:"#450d73", justifyContent:"space-around",}}>
        LOGIN
        </Button>
      </Form>
      <br />
      
      <p style={{alignContent: "center"}}>OR</p>
      <Button onClick={handleGoogleSignIn} className={styles.googleSignIn} style={{backgroundColor: "#450d73",}}>
          <FcGoogle style={{ marginRight: "1rem", height: "20px" }} />
          Sign in with Google
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
      <div > 
        <p style={{  textAlign: "center",  marginTop: "25%", }}> Don't have an account? {" "} <br />
        <a
          onClick={() => router.push("/service-provider/signup")}
          style={{ cursor: "pointer", color: "#450d73" }}
        >
          Sign up
        </a></p> 
      </div>  
      </div>

      

      {/* Add an image on the right */}
      <div className={styles.imageContainer}>
        <Image src={YourImage} alt="Your Image"  className={styles.image} />
      </div>
    </div>
  );
};

export default LoginPage;
