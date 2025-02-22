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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Add a new user.'
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          name: { type: 'string' },
                          email: { type: 'string', format: 'email' },
                          password: { type: 'string' },
                          roleId: { type: 'string' }
                      },
                      required: ['name', 'email', 'password', 'role']
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'User created successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Get all users.'
      #swagger.responses[200] = {
          description: 'Users retrieved successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseArray' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Get user by ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID',
          required: true,
          type: 'string',
          format: 'uuid'
      }
      #swagger.responses[200] = {
          description: 'User retrieved successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Update user by ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID',
          required: true,
          type: 'string',
          format: 'uuid'
      }
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          name: { type: 'string' },
                          email: { type: 'string', format: 'email' },
                          role: { type: 'string', enum: ['admin', 'agent'] }
                      }
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'User updated successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Delete user by ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID',
          required: true,
          type: 'string',
          format: 'uuid'
      }
      #swagger.responses[200] = {
          description: 'User deleted successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Login user.'
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          email: { type: 'string', format: 'email' },
                          password: { type: 'string' }
                      },
                      required: ['email', 'password']
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'User logged in successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Request password reset.'
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          email: { type: 'string', format: 'email' }
                      },
                      required: ['email']
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'Password reset email sent successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
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
    /*
      #swagger.tags = ['Users']
      #swagger.description = 'Reset password with token.'
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          token: { type: 'string' },
                          password: { type: 'string' }
                      },
                      required: ['token', 'password']
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'Password reset successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
        logger.info({
            body: req.body,
            method: "POST /users/reset-password"
        });

        const result = await routerController.resetPassword(req.body);

        return res.status(200).json(result);
    }
);

module.exports = router;
