import React from "react";
import { useRouter } from "next/router";
import { Button } from "carbon-components-react";

const Home = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="item">
        <img src="/service-provider.png" style={{ width: "300px" }} />
        <Button
          onClick={() => router.push("/service-provider")}
          style={{ marginTop: "20px" }}
        >
          Service Provider
        </Button>
      </div>
      <div className="item">
        <img src="/consumer.png" style={{ width: "300px" }} />
        <Button
          onClick={() => router.push("/consumer")}
          style={{ marginTop: "20px" }}
        >
          Consumer
        </Button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding-top: 50px;
        }
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 100px;
        }
        @media (max-width: 600px) {
          .container {
            flex-direction: column;
          }
          .item {
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
