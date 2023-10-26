import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Button } from "carbon-components-react";

const Home = () => {
  const router = useRouter();
  const { authUser, loading, logOut } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (authUser) {
        console.log("logged in");
      } else {
        router.push("/login");
      }
    }
  }, [authUser, loading]);

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
      {loading && <p>Loading...</p>}
      {authUser && (
        <div>Congratulations {authUser?.email}! You are logged in.</div>
      )}
      <Button onClick={logOut} style={{ marginTop: "20px" }}>
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
