import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Role = new Schema(
  {
    name: { type: String, required: true, min: 6 },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Roles", Role);
