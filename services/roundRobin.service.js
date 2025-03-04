const Redis = require("ioredis");
const redis = new Redis();
const { Users } = require("../models");

class service {
    async getNextAgentIdRoundRobin() {
        const agents = await Users.query()
            .join("roles", "users.role_id", "roles.id")
            .where("roles.role_name", "agent")
            .select("users.id")
            .orderBy("users.id", "asc");

        if (!agents.length) {
            throw new Error("No available agents");
        }

        let lastAssigned = await redis.get("last_assigned_agent");
        lastAssigned = lastAssigned ? parseInt(lastAssigned, 10) : null;

        let nextAgent;
        if (!lastAssigned) {
            nextAgent = agents[0];
        } else {
            const lastIndex = agents.findIndex(agent => agent.id === lastAssigned);
            nextAgent = agents[(lastIndex + 1) % agents.length];
        }

        await redis.set("last_assigned_agent", nextAgent.id);

        return nextAgent.id;
    }
}
module.exports = new service();
