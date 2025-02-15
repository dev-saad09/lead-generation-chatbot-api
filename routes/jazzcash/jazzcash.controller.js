const Joi = require("joi");
const log = require("../../logger");
const regexp = require("../../consts/regexp");
const controllerService = require("./jazzcash.service");
class controller {
    async initiatePayment(payload) {
        try {
            const schema = Joi.object({
                cnic: Joi.string().required(),
                amount: Joi.number().required(),
                msisdn: Joi.string().required(),
                trxId: Joi.string().required()
            });

            const isNotValid = schema.validate(payload).error;

            if (isNotValid) {
                return {
                    success: false,
                    message: isNotValid.message
                };
            }
            const response = await controllerService.initiatePayment(payload);
            return {
                success: true,
                message: "Success",
                data: response
            };
        } catch (error) {
            log.error(error, `${__file}:${__line} error: ${error.message}`);
            return {
                success: false,
                message: error.message,
                data: error.data
            };
        }
    }

    async paymentInquiry(payload) {
        try {
            const schema = Joi.object({
                trxId: Joi.string().required()
            });

            const isNotValid = schema.validate(payload).error;

            if (isNotValid) {
                return {
                    success: false,
                    message: isNotValid.message
                };
            }
            const response = await controllerService.paymentInquiry(payload);
            return {
                success: true,
                message: "Success",
                data: response
            };
        } catch (error) {
            log.error(error, `${__file}:${__line} error: ${error.message}`);
            return {
                success: false,
                message: error.message,
                data: error.data
            };
        }
    }

    async recurringPayment(payload) {
        try {
            const schema = Joi.object({
                paymentToken: Joi.string().required(),
                amount: Joi.string().required(),
                trxId: Joi.string().required()
            });

            const isNotValid = schema.validate(payload).error;

            if (isNotValid) {
                return {
                    success: false,
                    message: isNotValid.message
                };
            }
            const response = await controllerService.recurringPayment(payload);
            return {
                success: true,
                message: "Success",
                data: response
            };
        } catch (error) {
            log.error(error, `${__file}:${__line} error: ${error.message}`);
            return {
                success: false,
                message: error.message,
                data: error.data
            };
        }
    }

    async paymentResponse(payload) {
        try {
            const response = await controllerService.paymentResponse(payload);
            return {
                success: true,
                message: "Success",
                data: response
            };
        } catch (error) {
            log.error(error, `${__file}:${__line} error: ${error.message}`);
            return {
                success: false,
                message: error.message,
                data: error.data
            };
        }
    }

    async requestLinkWallet(payload) {
        try {
            const schema = Joi.object({
                msisdn: Joi.string().required()
            });

            const isNotValid = schema.validate(payload).error;

            if (isNotValid) {
                return {
                    success: false,
                    message: isNotValid.message
                };
            }
            const response = await controllerService.requestLinkWallet(payload);
            return {
                success: true,
                message: "Success",
                data: response
            };
        } catch (error) {
            log.error(error, `${__file}:${__line} error: ${error.message}`);
            return {
                success: false,
                message: error.message,
                data: error.data
            };
        }
    }
}

module.exports = new controller();
