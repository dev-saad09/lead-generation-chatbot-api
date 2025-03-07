const Joi = require("joi");
const log = require("../../logger");
const leadService = require("./lead.service");
const { LEAD_STATUSES } = require("../../consts/leadStatus");

class LeadController {
    async addLead(payload) {
        try {
            // Validate request payload
            const schema = Joi.object({
                name: Joi.string().trim().required(),
                email: Joi.string().email(),
                cellno: Joi.string().required(),
                address: Joi.string().trim(),
                city: Joi.string().trim(),
                language: Joi.string().trim(),
                systemType: Joi.string().trim(),
                consumptionType: Joi.string().trim(),
                consumptionValue: Joi.number(),
                calculatedKilowatt: Joi.number(),
                totalArea: Joi.string().trim(),
                billType: Joi.string().trim(),
                billImage: Joi.string().trim(),
                leadSource: Joi.string().trim(),
                agentId: Joi.string().uuid(),
                status: Joi.string().valid(...LEAD_STATUSES).default("New Inquiry")
            });

            const { error, value } = schema.validate(payload);

            if (error) {
                log.error({
                    error: error.details[0].message,
                    method: "POST /leads"
                });
                return {
                    success: false,
                    message: error.details[0].message,
                    error: error.details[0]
                };
            }

            const response = await leadService.addLead(value);

            log.info("Lead added successfully", {
                leadId: response.id,
                method: "POST /leads"
            });

            return {
                success: true,
                message: "Lead added successfully",
                data: response
            };
        } catch (error) {
            log.error("Error adding lead", {
                error: error.message,
                payload,
                method: "POST /leads"
            });

            return {
                success: false,
                message: error.message || "Failed to add lead",
                error: error.data || error
            };
        }
    }

    async getLeads() {
        try {
            const response = await leadService.getLeads();

            log.info("Leads retrieved successfully", {
                count: response.length,
                method: "GET /leads"
            });

            return {
                success: true,
                message: "Leads retrieved successfully",
                data: response,
                count: response.length
            };
        } catch (error) {
            log.error({
                error: error.message,
                method: "GET /leads"
            });
            return {
                success: false,
                message: error.message || "Failed to get leads",
                error: error.data || error
            };
        }
    }

    async getLeadById(id) {
        try {
            const response = await leadService.getLeadById(id);

            log.info("Lead retrieved successfully", {
                leadId: id,
                method: "GET /leads/:id"
            });

            return {
                success: true,
                message: "Lead retrieved successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                leadId: id,
                method: "GET /leads/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to get lead",
                error: error.data || error
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
                consumptionType: Joi.string().trim(),
                consumptionValue: Joi.number(),
                calculatedKilowatt: Joi.number(),
                totalArea: Joi.string().trim(),
                billType: Joi.string().trim(),
                billImage: Joi.string().trim(),
                leadSource: Joi.string().trim(),
                agentId: Joi.string().uuid(),
                status: Joi.string().valid(...LEAD_STATUSES)
            }).min(1);

            const { error, value } = schema.validate(payload);

            if (error) {
                log.error({
                    error: error.details[0].message,
                    leadId: id,
                    method: "PUT /leads/:id"
                });
                return {
                    success: false,
                    message: error.details[0].message,
                    error: error.details[0]
                };
            }

            const response = await leadService.updateLead(id, value);

            log.info("Lead updated successfully", {
                leadId: id,
                method: "PUT /leads/:id"
            });

            return {
                success: true,
                message: "Lead updated successfully",
                data: response
            };
        } catch (error) {
            log.error({
                error: error.message,
                leadId: id,
                payload,
                method: "PUT /leads/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to update lead",
                error: error.data || error
            };
        }
    }

    async deleteLead(id) {
        try {
            const response = await leadService.deleteLead(id);

            log.info("Lead deleted successfully", {
                leadId: id,
                method: "DELETE /leads/:id"
            });

            return {
                success: true,
                message: "Lead deleted successfully",
                data: { id, deleted: response }
            };
        } catch (error) {
            log.error({
                error: error.message,
                leadId: id,
                method: "DELETE /leads/:id"
            });
            return {
                success: false,
                message: error.message || "Failed to delete lead",
                error: error.data || error
            };
        }
    };

    async assignAgentToLead(leadId) {
        try {
            const result = await leadService.assignAgentToLead(leadId);
            return { success: true, data: result };
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

module.exports = new LeadController();
