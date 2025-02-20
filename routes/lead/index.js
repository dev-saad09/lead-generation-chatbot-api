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
        logger.info({
            user: req.user,
            body: req.body,
            method: "POST /leads"
        });

        const result = await routerController.addLead(req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route GET /leads
 * @desc Get all leads
 * @access Private
 */
router.get(
    "/",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            method: "GET /leads"
        });

        const result = await routerController.getLeads();

        return res.status(200).json(result);
    }
);

/**
 * @route GET /leads/:id
 * @desc Get lead by ID
 * @access Private
 */
router.get(
    "/:id",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            params: req.params,
            method: "GET /leads/:id"
        });

        const result = await routerController.getLeadById(req.params.id);

        return res.status(200).json(result);
    }
);

/**
 * @route PUT /leads/:id
 * @desc Update lead by ID
 * @access Private
 */
router.put(
    "/:id",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            params: req.params,
            body: req.body,
            method: "PUT /leads/:id"
        });

        const result = await routerController.updateLead(req.params.id, req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route DELETE /leads/:id
 * @desc Delete lead by ID
 * @access Private
 */
router.delete(
    "/:id",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            params: req.params,
            method: "DELETE /leads/:id"
        });

        const result = await routerController.deleteLead(req.params.id);

        return res.status(200).json(result);
    }
);

module.exports = router;
