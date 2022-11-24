import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, maxLength: 255 },
  images: { type: String, maxLength: 255 },
  price:  { type: String, maxLength: 255 },
  original_price: { type: String, maxLength: 255 },
  product_type:{type: String, maxLength: 255}, //new //hot
  description :{type: String, maxLength: 255},
  imagechild1 :{type: String, maxLength: 255},
  imagechild2 :{type: String, maxLength: 255},
  imagechild3 :{type: String, maxLength: 255},
  slug:{type: String, maxLength: 255},
},{
  timestamps : true
});

export default mongoose.model("Product", Product);
