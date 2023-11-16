import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState([]);

  // const data = [
  //   { name: router.query.dish, orders: 400, pv: 2400, amt: 2400 },
  //   { name: router.query.dish, orders: 400, pv: 2400, amt: 2400 },
  //   { name: router.query.dish, orders: 400, pv: 2400, amt: 2400 },
  //   { name: router.query.dish, orders: 400, pv: 2400, amt: 2400 },
  //   { name: router.query.dish, orders: 400, pv: 2400, amt: 2400 },
  //   { name: router.query.dish, orders: 400, pv: 2400, amt: 2400 },
  // ];

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/analytics", {
        method: "POST", // You can use other HTTP methods like GET, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json", // Specify the content type if you're sending JSON data
          // Additional headers can be added here
        },
        body: JSON.stringify({
          "Food Name": router.query.dish,
          // Add any other data you want to include in the request body
        }),
      });

      if (!response.ok) {
        throw new Error("Network request failed");
      }

      const result = await response.json();
      setData(
        result.Quantity.map((item, i) => ({
          name: router.query.dish,
          orders: Math.floor(item),
          amt: 2400,
        }))
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query) {
      fetchData();
    }
  }, [router.query]);

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
      <ResponsiveContainer width="60%" height="60%">
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#0f62fe" />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#ccc",
              color: "#0f62fe",
            }}
          />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="orders" fill="#0f62fe" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
      {router.query.dish}
    </div>
  );
}
