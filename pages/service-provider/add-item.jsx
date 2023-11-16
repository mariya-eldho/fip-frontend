import React, { useState } from "react";
import {
  Form,
  TextInput,
  Button,
  Loading,
  Dropdown,
} from "carbon-components-react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";

const items = ["breakfast", "lunch", "dinner"];

const AddItem = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(items[4]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5001/add_food", {
        method: "POST", // You can use other HTTP methods like GET, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json", // Specify the content type if you're sending JSON data
          // Additional headers can be added here
        },
        body: JSON.stringify({
          id: shortid.generate(),
          name: foodName,
          price: price,
          type: currentItem,
        }),
      });

      if (!response.ok) {
        throw new Error("Network request failed");
      }

      setLoading(false);
      router.push("/service-provider");
    } catch (e) {
      console.log(e);
    }
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
      {loading ? (
        <Loading className={"some-class"} withOverlay={false} />
      ) : (
        <Form onSubmit={onSubmit} style={{ width: "300px" }}>
          <TextInput
            required
            id="foodName"
            labelText="Dish Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextInput
            required
            id="price"
            labelText="Price"
            type="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Dropdown
            id="default"
            titleText="Type"
            initialSelectedItem={items[0]}
            label="Option 1"
            items={items}
            style={{
              width: 300,
              marginBottom: "10px",
            }}
            onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
            selectedItem={currentItem}

            // itemToString={(item) => (item ? item.text : "")}
          />
          <Button type="submit" style={{ marginTop: "10px", width: "100%" }}>
            Add Dish to Menu
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddItem;
