const axios = require("axios");
const log = require("../logger");
const { compose } = require("objection");

const WATI_API_URL = process.env.WATI_API_URL;
const WATI_API_SECRET = process.env.WATI_API_SECRET;

async function sendTemplateMessage(to, templateName, parameters) {
    console.log("Sending template message via WATI", parameters);
    log.info(`Sending template message ${to} via WATI: ${templateName} with these parameters: ${parameters}`);

    const url = `${WATI_API_URL}/api/v1/sendTemplateMessage?whatsappNumber=${to}`;
    const payload = {
        template_name: templateName,
        broadcast_name: "Automated Message",
        parameters
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Authorization": `Bearer ${WATI_API_SECRET}`,
                "Content-Type": "application/json"
            }
        });

        log.info(`Template message sent to ${to} via WATI: ${templateName}`);
        return response.data;
    } catch (error) {
        log.error(`WATI API Error:", ${error.response?.data || error.message}`);
        throw new Error(error.response?.data || error?.message || "Failed to send template message via WATI");
    }
}

module.exports = { sendTemplateMessage };
