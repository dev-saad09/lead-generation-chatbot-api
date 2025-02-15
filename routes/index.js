const express = require("express");
const router = express.Router();

router.use("/jazzcash", require("./jazzcash"));

module.exports = router;
