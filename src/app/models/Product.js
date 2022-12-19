import mongoose from "mongoose";
//tạo slug tự động
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;

// add plugin
mongoose.plugin(slug);

const Product = new Schema(
  {
    name: { type: String },
    images: { type: String },
    price: { type: Number },
    original_price: { type: Number },
    product_type: { type: String }, //new //hot
    description: { type: String },
    imagechild1: { type: String },
    imagechild2: { type: String },
    imagechild3: { type: String },
    categories: { type: String, ref: 'Categories' },

    // slug dùng unique để khi trùng slug thì nó sẽ tự tạo thêm một chuỗi bất kì để không gây ra lỗi
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", Product);
