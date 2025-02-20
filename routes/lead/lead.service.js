const moment = require("moment");
const log = require("../../logger");
const { ErrorData } = require("../../errors");
const { Lead } = require("../../models");

class LeadService {
    async addLead(leadData) {
        const lead = await Lead.query().insert({
            ...leadData,
            createdAt: moment().format(),
            updatedAt: moment().format()
        });

        log.info({ lead }, "Successfully created new lead");

        return lead;
    }

    async getLeads() {
        const leads = await Lead.query();
        return leads;
    }

    async getLeadById(id) {
        const lead = await Lead.query().findById(id);
        if (!lead) {
            throw new ErrorData("Lead not found");
        }
        return lead;
    }

    async updateLead(id, updateData) {
        const lead = await Lead.query().findById(id);
        if (!lead) {
            throw new ErrorData("Lead not found");
        }

        const updatedLead = await Lead.query().patchAndFetchById(id, {
            ...updateData,
            updatedAt: moment().format()
        });

        log.info({ updatedLead }, "Successfully updated lead");
        return updatedLead;
    }

    async deleteLead(id) {
        const lead = await Lead.query().findById(id);
        if (!lead) {
            throw new ErrorData("Lead not found");
        }

        await Lead.query().deleteById(id);
        log.info({ id }, "Successfully deleted lead");
        return true;
    }
}

module.exports = new LeadService();
