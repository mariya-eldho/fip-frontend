import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Loading } from "carbon-components-react";
import { useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  const { user, loadingUser } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        router.push("/service-provider");
      } else {
        router.push("/service-provider/login");
      }
    }
  }, [user, loadingUser]);

  return (
    // <div className="container">
    //   <div className="item">
    //     <img src="/service-provider.png" style={{ width: "300px" }} />
    //     <Button
    //       onClick={() => router.push("/service-provider")}
    //       style={{ marginTop: "20px" }}
    //     >
    //       Service Provider
    //     </Button>
    //   </div>
    //   <div className="item">
    //     <img src="/consumer.png" style={{ width: "300px" }} />
    //     <Button
    //       onClick={() => router.push("/consumer")}
    //       style={{ marginTop: "20px" }}
    //     >
    //       Consumer
    //     </Button>
    //   </div>
    //   <style jsx>{`
    //     .container {
    //       display: flex;
    //       flex-direction: row;
    //       align-items: center;
    //       justify-content: center;
    //       min-height: 100vh;
    //       padding-top: 50px;
    //     }
    //     .item {
    //       display: flex;
    //       flex-direction: column;
    //       align-items: center;
    //       justify-content: center;
    //       margin: 100px;
    //     }
    //     @media (max-width: 600px) {
    //       .container {
    //         flex-direction: column;
    //       }
    //       .item {
    //         margin: 20px;
    //       }
    //     }
    //   `}</style>
    // </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {loadingUser && <Loading className={"some-class"} withOverlay={false} />}
    </div>
  );
};

export default Home;
