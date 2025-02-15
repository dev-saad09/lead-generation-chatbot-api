const express = require("express");
const router = express.Router();

router.use("/leads", require("./lead"));

module.exports = router;
