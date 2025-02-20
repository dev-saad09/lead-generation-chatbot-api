const express = require("express");
const router = express.Router();

router.use("/leads", require("./lead"));
router.use("/users", require("./user"));
module.exports = router;
