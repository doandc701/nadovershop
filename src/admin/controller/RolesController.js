import Role from "../../models/Role.js";

async function getRoles(req, res) {
  const page = req.query.p || 0;
  const showLimitRoles = 3;
  Role.find({})
    .sort({ name: 1 })
    .limit(showLimitRoles)
    .skip(Number(page) * showLimitRoles)
    .then((role) => {
      res.status(200).json(role);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
}

async function postRoles(req, res) {
  console.log(req.body.name);
  const psRole = new Role(req.body);
  await psRole
    .save()
    .then((add) => {
      res.json(add);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}
export { getRoles, postRoles };
