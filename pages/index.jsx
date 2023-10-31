import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "carbon-components-react";

const Home = () => {
  const router = useRouter();

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
      <Button
        onClick={() => router.push("/service-provider")}
        style={{ marginTop: "20px" }}
      >
        Service Provider
      </Button>
      <Button
        onClick={() => router.push("/consumer")}
        style={{ marginTop: "20px" }}
      >
        Consumer
      </Button>
    </div>
  );
};

export default Home;
