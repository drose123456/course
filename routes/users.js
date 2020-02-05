const router = require("express").Router();
let userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/login", userController.index);
router.get("/register", userController.signup);

module.exports = router;
//these are routes fro user management 