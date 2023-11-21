import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Orders from "../../components/Orders";
import { Button } from "carbon-components-react";
import { signOut } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "@carbon/react";

const Home = () => {
  const router = useRouter();
  const { user, loadingUser } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        console.log("logged in");
      } else {
        router.push("/consumer/login");
      }
    }
  }, [user, loadingUser]);

  const handleLogout = async () => {
    await dispatch(signOut());
    router.push("/");
  };
  return (
    <Theme theme="white">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "80%",
          margin: "auto",
          
        }}
      >
        <Orders />
        
      </div>
    </Theme>
  );
};

export default Home;
