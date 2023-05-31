import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Users = new Schema({
  name: { type: String, required: true, min: 6 },
  email: { type: String, required: true, min: 6 },
  password: { type: String, required: true, min: 6 },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
    },
  ],
});
export default mongoose.model("Users", Users);
