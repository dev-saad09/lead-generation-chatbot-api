const { Model } = require("objection");
class jazzcashOnetimeTransactions extends Model {
    static get tableName() {
        return "jazzcash_onetime_transactions";
    }
}
module.exports = jazzcashOnetimeTransactions;
