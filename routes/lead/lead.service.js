const moment = require("moment");
const log = require("../../logger");
const { ErrorData } = require("../../errors");
const { Leads } = require("../../models");

class LeadService {
    async addLead(leadData) {
        const lead = await Leads.query().insert({
            ...leadData,
            createDt: moment().format(),
            updateDt: moment().format()
        });

        log.info({ lead }, "Successfully created new lead");

        return lead;
    }

    async getLeads() {
        const leads = await Leads.query();
        return leads;
    }

    async getLeadById(id) {
        const lead = await Leads.query().findById(id);
        if (!lead) {
            throw new ErrorData("Lead not found");
        }
        return lead;
    }

    async updateLead(id, updateData) {
        const lead = await Leads.query().findById(id);
        if (!lead) {
            throw new ErrorData("Lead not found");
        }

        const updatedLead = await Leads.query().patchAndFetchById(id, {
            ...updateData,
            updateDt: moment().format()
        });

        log.info({ updatedLead }, "Successfully updated lead");
        return updatedLead;
    }

    async deleteLead(id) {
        const lead = await Leads.query().findById(id);
        if (!lead) {
            throw new ErrorData("Lead not found");
        }

        await Leads.query().deleteById(id);
        log.info({ id }, "Successfully deleted lead");
        return true;
    }
}

module.exports = new LeadService();
