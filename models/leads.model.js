const { Model } = require("objection");

class model extends Model {
    static get tableName() {
        return "leads";
    }
}

module.exports = model;
