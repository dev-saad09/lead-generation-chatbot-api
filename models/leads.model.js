const { Model } = require("objection");

class model extends Model {
    static get tableName() {
        return "leads";
    }

    static get relationMappings() {
        const Users = require("./users.model");

        return {
            agent: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: "leads.agentId",
                    to: "users.id"
                }
            }
        };
    }
}

module.exports = model;
