const { Model } = require("objection");

class jazzcashRecurringTransactions extends Model {
    static get tableName() {
        return "jazzcash_recurring_transactions";
    }
}

module.exports = jazzcashRecurringTransactions;
