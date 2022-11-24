// Using Node.js `require()`
import mongoose from "mongoose";

async function Connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopgiaydona");
    console.log("Connect successfully!");
  } catch (err) {
    console.log("Connect failed!", err);
  }
}
export default { Connect };
