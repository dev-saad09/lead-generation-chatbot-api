const axios = require("axios");
const log = require("../logger");
const {
    BKK_API_URL
} = process.env;

function middleware() {
    return async (req, res, next) => {
        try {
            const { token } = req.query;
            if (!(token || req.headers.authorization)) {
                return res.status(200).send({ success: false, message: "NO_CREDENTIALS_SENT!" });
            }

            const authorization = token ? `Basic ${token}` : req.headers.authorization;
            const config = {
                url: `${BKK_API_URL}/auth/verify-token`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorization
                }
            };

            const response = await axios(config);
            if (!response.data) {
                return res.status(200).send({ success: false, message: "Unauthorized" });
            }
            res.user = response.data;
            return next();
        } catch (error) {
            log.error({ error: error.message }, "error");
            res.send({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = middleware;
