// async initiatePayment(payload) {
//     const { totalAmount, cnic, account, orderId } = payload;

//     const startTime = moment().format("YYYYMMDDHHmmss");
//     const expireTime = moment().add(5, "minutes").format("YYYYMMDDHHmmss");

//     const formattedCnic = cnic.replace(/-/g, "");
//     const amountInPaisa = totalAmount * 100;

//     const data = {
//         pp_Version: "",
//         pp_TxnType: "",
//         pp_Language: "EN",
//         pp_BankID: "",
//         pp_MerchantID: JAZZCASH_MERCHANT_ID,
//         pp_Password: JAZZCASH_PASSWORD,
//         pp_ProductID: "",
//         pp_TxnRefNo: orderId,
//         pp_Amount: amountInPaisa,
//         pp_TxnCurrency: "PKR",
//         pp_TxnDateTime: startTime,
//         pp_BillReference: "billRef",
//         pp_Description: "Description",
//         pp_TxnExpiryDateTime: expireTime,
//         ppmpf_1: "",
//         ppmpf_2: "",
//         ppmpf_3: "",
//         ppmpf_4: "",
//         ppmpf_5: "",
//         pp_MobileNumber: account,
//         pp_CNIC: formattedCnic
//     };

//     const hashFields = [
//         "pp_Amount",
//         "pp_BankID",
//         "pp_BillReference",
//         "pp_CNIC",
//         "pp_Description",
//         "pp_Language",
//         "pp_MerchantID",
//         "pp_MobileNumber",
//         "pp_Password",
//         "pp_ProductID",
//         "pp_TxnCurrency",
//         "pp_TxnDateTime",
//         "pp_TxnExpiryDateTime",
//         "pp_TxnRefNo",
//         "ppmpf_1",
//         "ppmpf_2",
//         "ppmpf_3",
//         "ppmpf_4",
//         "ppmpf_5"
//     ];

//     data.pp_SecureHash = this.genSecureHash(data);
//     // const hashString = hashFields.reduce((acc, value) => {
//     //     if (!data[value]) return acc;
//     //     acc += "&" + data[value];
//     //     return acc;
//     // }, JAZZCASH_SALT);

//     // data.pp_SecureHash = crypto
//     //     .createHmac("SHA256", JAZZCASH_SALT)
//     //     .update(Buffer.from(hashString, "utf-8"))
//     //     .digest("hex");

//     const url = `${JAZZCASH_API_URL}/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction`;
//     const { data: response } = await axios.post(url, data, {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });

//     if (!(response.pp_ResponseCode == "000" || response.pp_ResponseCode == "124" || response.pp_ResponseCode == "157")) {
//         throw new ErrorData(response.pp_ResponseMessage, response);
//     }
//     return response;
// }
