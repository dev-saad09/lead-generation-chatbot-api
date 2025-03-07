const { Model } = require("objection");

class model extends Model {
    static get tableName() {
        return "templateMessages";
    }
}

module.exports = model;
