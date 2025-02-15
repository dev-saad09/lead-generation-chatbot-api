const { Model } = require("objection");

class model extends Model {
    static get tableName() {
        return "users";
    }
}

module.exports = model;
