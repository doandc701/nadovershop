import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Product = new Schema({
  title: { type: String, maxLength: 255 },
  original_price: { type: String, maxLength: 255 },
  price: { type: String, maxLength: 255 },
  breadcrumb: { type: String, maxLength: 600 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  quatity: { type: String, maxLength: 255 },
  slug: { type: String, maxLength: 255 },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", Product);
