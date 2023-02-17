const router = require("express").Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

const {
    verifyUserAndAuthorization,
} = require("../Middlewere/Authenticate");
const UserModel = require("../Model/user.model");

router.get("/", verifyUserAndAuthorization, async (req, res) => {
  const limit = req.query.limit;

  try {
    const users = await UserModel.find().limit(limit);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);

  }
});

router.put("/:id", verifyUserAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 5);
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/:id",     verifyUserAndAuthorization, async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
