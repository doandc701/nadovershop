class ContactController {
  index(req, res, next) {
    res.render("contacts/index");
  }
}

export default new ContactController();
