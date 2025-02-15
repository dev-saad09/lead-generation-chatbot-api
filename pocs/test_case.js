const _ = require("lodash");

const response = {
    pp_Version: "",
    pp_TxnType: "",
    pp_Language: "EN",
    pp_BankID: "",
    pp_MerchantID: "1",
    pp_Password: "2",
    pp_ProductID: "",
    pp_TxnRefNo: "3",
    pp_Amount: "123",
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: "123",
    pp_BillReference: "billRef",
    pp_Description: "Description",
    pp_TxnExpiryDateTime: "123",
    ppmpf_1: "",
    ppmpf_2: "",
    ppmpf_3: "",
    ppmpf_4: "",
    ppmpf_5: "",
    pp_MobileNumber: "123",
    pp_CNIC: "123"
};
// const updateResponseCase = _.mapKeys(response, (key) => {
//     return _.camelCase(key);
// });

const data = Object.entries(response).reduce((acc, [key, value]) => {
    acc[_.camelCase(key)] = value;
    return acc;
}, {});

console.log(data);
