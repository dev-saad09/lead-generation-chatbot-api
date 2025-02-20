const express = require("express");
const logger = require("../../logger");
const authenticate = require("../../middlewares/authenticate.middleware");
const router = express.Router();
const routerController = require("./user.controller");

/**
 * @route POST /users
 * @desc Add a new user
 * @access Private
 */
router.post(
    "/",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            body: req.body,
            method: "POST /users"
        });

        const result = await routerController.addUser(req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route GET /users
 * @desc Get all users
 * @access Private
 */
router.get(
    "/",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            method: "GET /users"
        });

        const result = await routerController.getUsers();

        return res.status(200).json(result);
    }
);

/**
 * @route GET /users/:id
 * @desc Get user by ID
 * @access Private
 */
router.get(
    "/:id",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            params: req.params,
            method: "GET /users/:id"
        });

        const result = await routerController.getUserById(req.params.id);

        return res.status(200).json(result);
    }
);

/**
 * @route PUT /users/:id
 * @desc Update user by ID
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
            method: "PUT /users/:id"
        });

        const result = await routerController.updateUser(req.params.id, req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route DELETE /users/:id
 * @desc Delete user by ID
 * @access Private
 */
router.delete(
    "/:id",
    authenticate(),
    async (req, res, next) => {
        logger.info({
            user: req.user,
            params: req.params,
            method: "DELETE /users/:id"
        });

        const result = await routerController.deleteUser(req.params.id);

        return res.status(200).json(result);
    }
);

/**
 * @route POST /users/login
 * @desc Login user
 * @access Public
 */
router.post(
    "/login",
    async (req, res, next) => {
        logger.info({
            body: req.body,
            method: "POST /users/login"
        });

        const result = await routerController.loginUser(req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route POST /users/forgot-password
 * @desc Request password reset
 * @access Public
 */
router.post(
    "/forgot-password",
    async (req, res, next) => {
        logger.info({
            body: req.body,
            method: "POST /users/forgot-password"
        });

        const result = await routerController.forgotPassword(req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route POST /users/reset-password
 * @desc Reset password with token
 * @access Public
 */
router.post(
    "/reset-password",
    async (req, res, next) => {
        logger.info({
            body: req.body,
            method: "POST /users/reset-password"
        });

        const result = await routerController.resetPassword(req.body);

        return res.status(200).json(result);
    }
);

module.exports = router;
