const Joi = require("joi");
const log = require("../../logger");
const controllerService = require("./lead.service");
const { LEAD_STATUSES } = require("../../consts/leadStatus");
class LeadController {
    async addLead(payload) {
        try {
            // Validate request payload
            const schema = Joi.object({
                name: Joi.string().required().trim(),
                email: Joi.string().email().required(),
                cellno: Joi.string().required(),
                address: Joi.string().required().trim(),
                city: Joi.string().required().trim(),
                language: Joi.string().required().trim(),
                systemType: Joi.string().required().trim(),
                units: Joi.number().required(),
                billAmount: Joi.number().required(),
                totalArea: Joi.number().required(),
                billType: Joi.string().required().trim(),
                billImage: Joi.string().required().trim(),
                agentId: Joi.string().uuid().required(),
                status: Joi.string().valid(...LEAD_STATUSES).default("New Inquiry")
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
                error: error.message,
                payload,
                message: "Error adding lead",
                method: "POST /leads"
            });

            return {
                success: false,
                message: error.message || "Failed to add lead",
                data: error.data
            };
        }
    }

    async getLeads() {
        try {
            const response = await controllerService.getLeads();
            return {
                success: true,
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                message: "Error getting leads",
                method: "GET /leads"
            });
            return {
                success: false,
                message: error.message || "Failed to get leads",
                data: error.data
            };
        }
    }

    async getLeadById(id) {
        try {
            const response = await controllerService.getLeadById(id);
            return {
                success: true,
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                id,
                message: "Error getting lead",
                method: "GET /leads/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to get lead",
                data: error.data
            };
        }
    }

    async updateLead(id, payload) {
        try {
            const schema = Joi.object({
                name: Joi.string().trim(),
                email: Joi.string().email(),
                cellno: Joi.string(),
                address: Joi.string().trim(),
                city: Joi.string().trim(),
                language: Joi.string().trim(),
                systemType: Joi.string().trim(),
                units: Joi.number(),
                billAmount: Joi.number(),
                totalArea: Joi.number(),
                billType: Joi.string().trim(),
                billImage: Joi.string().trim(),
                agentId: Joi.string().uuid(),
                status: Joi.string().valid(...LEAD_STATUSES)
            });

            const { error } = schema.validate(payload);

            if (error) {
                return {
                    success: false,
                    message: error.details[0].message
                };
            }

            const response = await controllerService.updateLead(id, payload);
            return {
                success: true,
                message: "Lead updated successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                id,
                payload,
                message: "Error updating lead",
                method: "PUT /leads/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to update lead",
                data: error.data
            };
        }
    }

    async deleteLead(id) {
        try {
            const response = await controllerService.deleteLead(id);
            return {
                success: true,
                message: "Lead deleted successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                id,
                message: "Error deleting lead",
                method: "DELETE /leads/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to delete lead",
                data: error.data
            };
        }
    }
}

module.exports = new LeadController();
