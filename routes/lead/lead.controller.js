const Joi = require("joi");
const log = require("../../logger");
const regexp = require("../../consts/regexp");
const controllerService = require("./lead.service");

class LeadController {
    async addLead(payload) {
        try {
            // Validate request payload
            const schema = Joi.object({
                firstName: Joi.string().required().trim(),
                lastName: Joi.string().required().trim(),
                email: Joi.string().email().required(),
                phone: Joi.string().required().pattern(regexp.msisdn),
                cnic: Joi.string().required().pattern(regexp.cnic),
                address: Joi.string().required().trim(),
                city: Joi.string().required().trim(),
                state: Joi.string().required().trim(),
                zipCode: Joi.string().required().trim(),
                source: Joi.string().required().trim(),
                status: Joi.string().valid("new", "contacted", "qualified", "lost").default("new"),
                notes: Joi.string().allow("").trim()
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const response = await controllerService.addLead(payload);

            return {
                success: true,
                message: "Lead added successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error,
                payload,
                message: "Error adding lead"
            });

            return {
                success: false,
                message: error.message || "Failed to add lead",
                data: error.data
            };
        }
    }
}

module.exports = new LeadController();
