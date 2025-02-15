const moment = require("moment");
const log = require("../../logger");
const { ErrorData } = require("../../errors");

class LeadService {
    /**
     * Add a new lead
     * @param {Object} leadData - Lead information
     * @returns {Promise<Object>} Created lead
     * @throws {ErrorData} If lead creation fails
     */
    async addLead(leadData) {
        try {
            if (!leadData || typeof leadData !== "object") {
                throw new ErrorData("Invalid lead data provided");
            }

            // Validate required fields
            const requiredFields = ["name", "email", "phone"];
            const missingFields = requiredFields.filter(field => !leadData[field]);

            if (missingFields.length > 0) {
                throw new ErrorData(
                    `Missing required fields: ${missingFields.join(", ")}`
                );
            }

            // Add timestamp
            const lead = {
                ...leadData,
                created_at: moment().format(),
                updated_at: moment().format()
            };

            // TODO: Add database insertion logic here

            log.info({ lead }, "Successfully created new lead");

            return lead;
        } catch (error) {
            log.error({ error, leadData }, "Error creating lead");
            throw new ErrorData(
                "Failed to create lead",
                { originalError: error.message }
            );
        }
    }
}

module.exports = new LeadService();
