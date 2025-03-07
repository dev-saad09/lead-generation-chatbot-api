const moment = require("moment");
const log = require("../../logger");
const { ErrorData } = require("../../errors");
const { Leads, TemplateMessages } = require("../../models");
const { getNextAgentIdRoundRobin } = require("../../services/roundRobin.service");
const { sendTemplateMessage } = require("../../services/chatbot.service");
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

        if (updateData.status) {
            const notification = await TemplateMessages.query()
                .where({ status: updateData.status })
                .first();

            if (!notification) {
                throw new ErrorData("Notification not found");
            }
            const templateName = notification.templateName;
            const parameters = [
                { name: "1", value: notification.message }
            ];
            await sendTemplateMessage(lead.cellno, templateName, parameters);
        }

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

    async assignAgentToLead(leadId) {
        const agentId = await getNextAgentIdRoundRobin();

        const updatedLead = await Leads.query()
            .patchAndFetchById(leadId, {
                agentId,
                updateDt: new Date().toISOString()
            })
            .withGraphFetched("agent");

        if (!updatedLead) {
            throw new Error("Lead not found");
        }

        return updatedLead;
    }
}

module.exports = new LeadService();
