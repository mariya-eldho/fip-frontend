import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "carbon-components-react";
import { signOut } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {loadingUser && <p>Loading...</p>}
      {user && (
        <div>
          Congratulations {user?.email}! You are logged in as a consumer
        </div>
      )}
      <Button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
