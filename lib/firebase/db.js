import { db } from ".";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

export const getUserFromDb = async (id) => {
  const docRef = doc(db, "users", id);
  const user = await getDoc(docRef);
  return user;
};

export const setUserInDb = async (id, userData) => {
  const usersCollection = collection(db, "users");
  await setDoc(doc(usersCollection, id), userData);
};

// export const setOrderInDb = async (userId, orderData) => {
//   const ordersCollection = collection(db, "users", userId, "orders");
//   await setDoc(doc(ordersCollection, id), orderData);
// };
