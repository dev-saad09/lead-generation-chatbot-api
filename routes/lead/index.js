const express = require("express");
const logger = require("../../logger");
const authenticate = require("../../middlewares/authenticate.middleware");
const router = express.Router();
const routerController = require("./lead.controller");

/**
 * @route POST /leads
 * @desc Add a new lead
 * @access Private
 */
router.post(
    "/",
    authenticate(),
    async (req, res, next) => {
        try {
            logger.info({
                user: req.user,
                body: req.body,
                method: "POST /leads"
            });

            const result = await routerController.addLead(req.body);

            return res.status(200).json(result);
        } catch (error) {
            logger.error({
                error,
                user: req.user,
                body: req.body,
                method: "POST /leads"
            });
            return next(error);
        }
    }
);

module.exports = router;
