const { Model } = require("objection");

class model extends Model {
    static get tableName() {
        return "jazzcash_user_wallet_transactions";
    }
}

module.exports = model;
