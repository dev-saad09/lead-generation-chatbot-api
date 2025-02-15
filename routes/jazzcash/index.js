const express = require("express");
const logger = require("../../logger");
const authenticate = require("../../middlewares/authenticate.middleware");
const { BKK_REDIRECT_URL } = process.env;
const router = express.Router();

const routerController = require("./jazzcash.controller");

router.post("/initiate-payment", authenticate(), async function (req, res) {
    logger.info({ user: req.user, data: req.params, method: "routerController : initiatePayment" });
    const result = await routerController.initiatePayment(req.body);
    res.send(result);
});

router.get("/payment-inquiry/:trxId", authenticate(), async function (req, res) {
    logger.info({ user: req.user, data: req.params, method: "routerController : paymentInquiry" });
    const result = await routerController.paymentInquiry(req.params);
    res.send(result);
});

router.post("/recurring-payment", authenticate(), async function (req, res) {
    logger.info({ user: req.user, data: req.body, query: req.query, method: "routerController : recurring-payment" });
    const result = await routerController.recurringPayment(req.body);
    res.send(result);
});

router.post("/response", async function (req, res) {
    logger.info({ user: req.user, data: req.body, query: req.query, method: "routerController : response" });
    const result = await routerController.paymentResponse(req.body);
    res.redirect(`${BKK_REDIRECT_URL}?ref=${JSON.stringify(result)}`);
});

router.get("/request-link-wallet/:msisdn", authenticate(), async function (req, res) {
    logger.info({ user: req.user, data: req.body, query: req.query, method: "routerController : request-link-wallet" });
    const result = await routerController.requestLinkWallet(req.params);
    res.send(result);
});

router.get("/redirect", async function (req, res) {
    logger.info({ user: req.user, data: req.body, query: req.query, method: "routerController : request-link-wallet" });
    if (req.query.ref) {
        return res.send(JSON.parse(req.query.ref));
    }
    res.send(req.query);
});

module.exports = router;
