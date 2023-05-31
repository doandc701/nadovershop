// import express from "express";
// import multer from "multer";
// const router = express.Router();

// router.post("/upload", (req, res) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, "../../uploads");
//     },
//     filename: (req, file, callback) => {
//       const temp_file = file.originalname.split(".");
//       const temp_file_name = temp_file[0];
//       const temp_file_extension = temp_file[1];
//       callback(
//         null,
//         temp_file_name + "-" + Date.now() + "." + temp_file_extension
//       );
//     },
//   });
//   const upload = multer({ storage: storage }).single("images");
//   upload(req, res, function (err, result) {
//     if (err) {
//       console.log("Loi");
//       return res.end("Loi");
//     } else {
//       console.log(result);
//       console.log("File is uploaded successfully");
//       // return res.end("File is uploaded successfully");
//     }
//   });
// });
// export default router;
