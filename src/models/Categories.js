import mongoose from "mongoose";
//tạo slug tự động
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;

// add plugin
mongoose.plugin(slug);

const Categories = new Schema(
  {
    name: { type: String },
    // slug dùng unique để khi trùng slug thì nó sẽ tự tạo thêm một chuỗi bất kì để không gây ra lỗi
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Categories", Categories);
