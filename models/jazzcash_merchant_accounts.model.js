const { Model } = require("objection");

class jazzcashMerchantAccounts extends Model {
    static get tableName() {
        return "jazzcash_merchant_accounts";
    }
}

module.exports = jazzcashMerchantAccounts;
