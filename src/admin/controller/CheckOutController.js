import Checkout from "../../models/Checkout.js";
import { multipleMongooseToObject } from "../../util/mongoose.js";
import numbro from "numbro";
import exceljs from "exceljs";
class CheckOutController {
  // [GET] /admin/pages/order-cart
  index(req, res, next) {
    const page = req.query.p || 1;
    const showLimitCheckOut = 3;
    const searchs = req.query.search;
    if (searchs) {
      // console.log(searchs);
      Checkout.find({})
        .then((checkout) => {
          const data = checkout.filter((item) => {
            return (
              item.name.toLowerCase().indexOf(searchs.toLowerCase()) !== -1
            );
          });
          console.log(data);
          res.render("admin/pages/ordersCart/index", {
            layout: "admin.hbs",
            checkOut: multipleMongooseToObject(data),
          });
        })
        .catch(next);
      return;
    }
    Checkout.find({})
      .limit(showLimitCheckOut)
      .skip(page * showLimitCheckOut - showLimitCheckOut)
      .then((checkOut) => {
        // console.log(checkOut);
        res.render("admin/pages/ordersCart/index", {
          layout: "admin.hbs",
          checkOut: multipleMongooseToObject(checkOut),
        });
      })
      .catch(next);
  }
  async export(req, res, next) {
    try {
      const workBook = new exceljs.Workbook();
      const workSheet = workBook.addWorksheet("Order Cart");
      workSheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Name", key: "name" },
        { header: "Address", key: "address" },
        { header: "Phone", key: "phone" },
        { header: "Email", key: "email" },
        { header: "Note", key: "note" },
        { header: "Size", key: "size" },
        { header: "Product", key: "orderCart" },
        { header: "Total", key: "totalPrice" },
        { header: "Payment", key: "payment" },
        { header: "CreatedAt", key: "createdAt" },
      ];

      let counter = 1;
      const checkOutData = await Checkout.find({});
      checkOutData.forEach((check) => {
        check.s_no = counter;
        workSheet.addRow(check);
        counter++;
      });
      workSheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformata-offixedocument.spreadsheatml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=checks.xlsx`);

      return workBook.xlsx.write(res).then(() => {
        res.status(200);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
export default new CheckOutController();
