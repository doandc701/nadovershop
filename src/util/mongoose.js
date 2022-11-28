// lí do lỗi bảo mật nên sẽ phải chuyển json thành object literal

export const multipleMongooseToObject = (mongoose) => {
  return mongoose.map((mongoose) => mongoose.toObject());
};
export const mongooseToObject = (mongoose) => {
  return mongoose ? mongoose.toObject() : mongoose;
};
