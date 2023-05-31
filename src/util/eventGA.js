// import admin from "firebase-admin";
// // import firebase from "firebase/app";
// import * as firebase from "firebase/analytics";
// import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const user = "user123"; // Thông tin người dùng
// const eventName = "purchase"; // Tên sự kiện
// const eventParams = {
//   item_id: "product123",
//   item_name: "Product XYZ",
//   item_category: "Electronics",
//   price: 9.99,
//   currency: "USD",
// }; // Tham số của sự kiện
import { getGA } from "../index.js";
export const sendGoogleAnalytics = (user, eventName, eventParams) => {
  //   admin.firebase
  console.log("Firebase Admin SDK", getGA);
  //   getGA
  //     .analytics()
  //     .logEvent(user, eventName, eventParams)
  //     .then(() => {
  //       console.log("Event logged successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error logging event:", error);
  //     });
};
