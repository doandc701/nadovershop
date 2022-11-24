import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Couser = new Schema({
  name: { type: String, maxLength: 255 },
  image: { type: String, maxLength: 255 },
  slug: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export default mongoose.model("Couser", Couser);
