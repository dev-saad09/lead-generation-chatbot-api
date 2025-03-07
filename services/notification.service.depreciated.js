const { sendTemplateMessage } = require("./chatbot.service");

function sendNotification(status, client, agent, leadDetails) {
    let parameters = [];
    let templateName = "";

    switch (status) {
        case "meeting_scheduled_notification":
            templateName = "meeting_scheduled_notification";
            parameters = [
                { name: "1", value: client.name },
                { name: "2", value: agent.name },
                { name: "3", value: agent.phone },
                { name: "4", value: agent.calendlyLink }
            ];
            break;
        case "meeting_done_notification":
            templateName = "meeting_done_notification";
            parameters = [
                { name: "1", value: client.name },
                { name: "2", value: agent.name },
                { name: "3", value: agent.phone },
                { name: "4", value: agent.calendlyLink }
            ];
            break;
        case "proposal_shared_notification":
            templateName = "proposal_shared_notification";
            parameters = [
                { name: "1", value: client.name },
                { name: "2", value: agent.name },
                { name: "3", value: agent.phone },
                { name: "4", value: agent.calendlyLink }
            ];
            break;
        case "proposal_accepted_notification":
            templateName = "proposal_accepted_notification";
            parameters = [
                { name: "1", value: agent.name },
                { name: "2", value: leadDetails.name },
                { name: "3", value: leadDetails.cellno },
                { name: "4", value: leadDetails.city },
                { name: "5", value: leadDetails.systemType }
            ];
            break;
        case "proposal_rejected_notification":
            templateName = "proposal_rejected_notification";
            parameters = [
                { name: "1", value: agent.name },
                { name: "2", value: leadDetails.name },
                { name: "3", value: leadDetails.cellno },
                { name: "4", value: leadDetails.city },
                { name: "5", value: leadDetails.systemType }
            ];
            break;
        case "proposal_further_negotiation_notification":
            templateName = "proposal_further_negotiation_notification";
            parameters = [
                { name: "1", value: agent.name },
                { name: "5", value: leadDetails.systemType }
            ];
            break;
        case "design_shared_notification":
            templateName = "design_shared_notification";
            parameters = [
                { name: "1", value: agent.name },
                { name: "2", value: leadDetails.name },
                { name: "3", value: leadDetails.cellno },
                { name: "4", value: leadDetails.city },
                { name: "5", value: leadDetails.systemType }
            ];
            break;
        case "execution_phase_notification":
            templateName = "execution_phase_notification";
            parameters = [
                { name: "1", value: agent.name },
                { name: "4", value: leadDetails.city },
                { name: "5", value: leadDetails.systemType }
            ];
            break;
        case "system_installed_notification":
            templateName = "system_installed_notification";
            parameters = [
                { name: "1", value: agent.name },
                { name: "2", value: leadDetails.name }
            ];
            break;
        default:
            throw new Error("Unknown lead status");
    }

    return sendTemplateMessage(client.cellno, templateName, parameters);
}

module.exports = { sendNotification };
