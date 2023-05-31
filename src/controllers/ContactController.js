import nodemailer from "nodemailer";
class ContactController {
  index(req, res, next) {
    res.render("contacts/index");
  }
  async send(req, res, next) {
    const transporter = nodemailer.createTransport({
      // config mail server
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      // service: "gmail",
      auth: {
        user: "pemper61@gmail.com",
        pass: "ucwodmkklyawdalc",
      },
    });
    const mainOptions = {
      // thiết lập đối tượng , nội dung mail
      from: "contactdonastore68@gmail.com",
      to: "donashopcontact8888@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html:
        "<p>You have got a new message</b><ul><li>Username:" +
        req.body.name +
        "</li><li>Email:" +
        req.body.email +
        "</li><li>Content:" +
        req.body.message +
        "</li></ul>",
    };
    await transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.redirect("/");
      } else {
        console.log("Messeage sent : " + info.messageId);
        res.redirect("/");
      }
    });
    // res.send("mail")
  }
}

export default new ContactController();
