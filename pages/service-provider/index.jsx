import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, DatePicker, DatePickerInput } from "carbon-components-react";
import Table from "../../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/slices/authSlice";
import AnalyticsTable from "../../components/AnalyticsTable";


const Home = () => {
  const router = useRouter();
  const { user, loadingUser } = useSelector((state) => state.userAuth);
  const [date, setDate] = useState(new Date());
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
      <DatePicker
        datePickerType="single"
        value={date}
        onChange={function noRefCheck(e) {
          console.log(e);
          setDate(new Date(e));
        }}
        onClose={function noRefCheck() {}}
        onOpen={function noRefCheck() {}}
      >
        <DatePickerInput
          id="date-picker-single"
          labelText="Date Picker label"
          onChange={function noRefCheck(e) {
            console.log(e.target.value);
          }}
          onClose={function noRefCheck() {}}
          onOpen={function noRefCheck() {}}
          placeholder="mm/dd/yyyy"
        />
      </DatePicker>
      <AnalyticsTable date={date} />
      {/* <Table /> */}
      {/* {loadingUser && <p>Loading...</p>}
      {user && (
        <div>
          Congratulations {user?.email}! You are logged in as a Service Provider
        </div>
      )} */}
      {/* <Button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Sign Out
      </Button> */}
    </div>
  );
};

export default Home;
