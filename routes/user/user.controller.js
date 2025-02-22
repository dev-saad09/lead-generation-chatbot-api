const Joi = require("joi");
const log = require("../../logger");
const controllerService = require("./user.service");

class UserController {
    async addUser(payload) {
        try {
            // Validate request payload
            const schema = Joi.object({
                name: Joi.string().required().trim(),
                email: Joi.string().email().required(),
                password: Joi.string().required().trim(),
                roleId: Joi.string().required()
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const user = await controllerService.addUser(payload);

            return {
                success: true,
                message: "User added successfully",
                data: user
            };
        } catch (error) {
            log.error({
                error: error.message,
                payload,
                message: "Error adding user",
                method: "POST /users"
            });
            return {
                success: false,
                message: error.message || "Failed to add user",
                data: error.data
            };
        }
    }

    async getUsers() {
        try {
            const users = await controllerService.getUsers();
            return {
                success: true,
                message: "Users retrieved successfully",
                data: users
            };
        } catch (error) {
            log.error({
                error: error.message,
                message: "Error retrieving users",
                method: "GET /users"
            });
            return {
                success: false,
                message: error.message || "Failed to retrieve users",
                data: error.data
            };
        }
    }

    async getUserById(id) {
        try {
            const user = await controllerService.getUserById(id);
            return {
                success: true,
                message: "User retrieved successfully",
                data: user
            };
        } catch (error) {
            log.error({
                error: error.message,
                id,
                message: "Error retrieving user",
                method: "GET /users/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to retrieve user",
                data: error.data
            };
        }
    }

    async updateUser(id, payload) {
        try {
            const schema = Joi.object({
                name: Joi.string().trim(),
                email: Joi.string().email(),
                password: Joi.string().trim(),
                role: Joi.string().valid("admin", "user")
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const user = await controllerService.updateUser(id, payload);
            return {
                success: true,
                message: "User updated successfully",
                data: user
            };
        } catch (error) {
            log.error({
                error: error.message,
                id,
                payload,
                message: "Error updating user",
                method: "PUT /users/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to update user",
                data: error.data
            };
        }
    }

    async deleteUser(id) {
        try {
            const response = await controllerService.deleteUser(id);
            return {
                success: true,
                message: "User deleted successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                id,
                message: "Error deleting user",
                method: "DELETE /users/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to delete user",
                data: error.data
            };
        }
    }

    async loginUser(payload) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required().trim()
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const response = await controllerService.loginUser(payload);
            return {
                success: true,
                message: "User logged in successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                payload,
                message: "Error logging in user",
                method: "POST /users/login"
            });
            return {
                success: false,
                message: error.message || "Failed to login",
                data: error.data
            };
        }
    }

    async forgotPassword(payload) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required()
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const response = await controllerService.forgotPassword(payload);
            return {
                success: true,
                message: "Password reset link sent successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                payload,
                message: "Error processing forgot password request",
                method: "POST /users/forgot-password"
            });
            return {
                success: false,
                message: error.message || "Failed to process forgot password request",
                data: error.data
            };
        }
    }

    async resetPassword(payload) {
        try {
            const schema = Joi.object({
                token: Joi.string().required(),
                password: Joi.string().required().trim()
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const response = await controllerService.resetPassword(payload);
            return {
                success: true,
                message: "Password reset successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                payload,
                message: "Error resetting password",
                method: "POST /users/reset-password"
            });
            return {
                success: false,
                message: error.message || "Failed to reset password",
                data: error.data
            };
        }
    }
}

module.exports = new UserController();
