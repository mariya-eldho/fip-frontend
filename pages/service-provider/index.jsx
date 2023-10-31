import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "carbon-components-react";
import Table from "../../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/slices/authSlice";

const Home = () => {
  const router = useRouter();
  const { user, loadingUser } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        console.log("logged in");
      } else {
        router.push("/service-provider/login");
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
        height: "100vh",
        width: "80%",
        margin: "auto",
        padding: "100px",
      }}
    >
      <Table />
      {loadingUser && <p>Loading...</p>}
      {user && (
        <div>
          Congratulations {user?.email}! You are logged in as a Service Provider
        </div>
      )}
      <Button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
