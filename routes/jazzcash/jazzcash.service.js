const axios = require("axios").default;
const crypto = require("crypto");
const moment = require("moment");
const _ = require("lodash");
const {
    JazzcashRecurringTransactions,
    JazzcashOnetimeTransactions,
    JazzcashUserWallets,
    JazzcashUserWalletTransactions
} = require("../../models");
const {
    JAZZCASH_API_URL,
    JAZZCASH_MERCHANT_ID,
    JAZZCASH_PASSWORD,
    JAZZCASH_SALT,
    JAZZCASH_RETURN_URL,
    BKK_API_AUTH
} = process.env;
const log = require("../../logger");

const { ErrorData } = require("../../errors");
class service {
    genSecureHash(payload) {
        // !["pp_TxnType", "pp_Version"].includes(key)
        const hash = `${JAZZCASH_SALT}&${Object.keys(payload)
            .sort()
            .filter((key) => !!payload[key])
            .map((key) => payload[key])
            .join("&")}`;
        log.info({ hash }, "hash");
        const secureHash = crypto.createHmac("sha256", JAZZCASH_SALT).update(Buffer.from(hash, "utf-8")).digest("hex");
        log.info({ hash, secureHash }, "genSecureHash");
        return secureHash;
    }

    getCamelCase(payload) {
        return Object.entries(payload).reduce((acc, [key, value]) => {
            key = key.replace(/pp_/, "");
            acc[_.camelCase(key)] = value;
            return acc;
        }, {});
    }

    async initiatePayment(payload) {
        const { amount, cnic, msisdn, trxId } = payload;

        log.info({ request: payload }, "[initiatePayment] api request");
        const startTime = moment().format("YYYYMMDDHHmmss");
        const expireTime = moment().add(5, "minutes").format("YYYYMMDDHHmmss");

        const formattedCnic = cnic;
        // const formattedCnic = cnic.replace(/-/g, "");
        const url = `${JAZZCASH_API_URL}/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction`;
        const amountInPaisa = amount * 100;
        const request = {
            pp_Language: "EN",
            pp_MobileNumber: msisdn,
            pp_CNIC: formattedCnic,
            pp_MerchantID: JAZZCASH_MERCHANT_ID,
            pp_Password: JAZZCASH_PASSWORD,
            pp_Amount: amountInPaisa,
            pp_BillReference: "billRef",
            pp_Description: "Description",
            pp_TxnCurrency: "PKR",
            pp_TxnRefNo: trxId,
            pp_TxnDateTime: startTime,
            pp_TxnExpiryDateTime: expireTime,
            ppmpf_1: "",
            ppmpf_2: "",
            ppmpf_3: "",
            ppmpf_4: "",
            ppmpf_5: ""
            // pp_TxnType: "MWALLET",
            // pp_Version: "2.0"
        };

        request.pp_SecureHash = this.genSecureHash(request);

        log.debug({ url, request }, "[initiatePayment] jazzcash api request");

        const { data: response } = await axios.post(url, request, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        log.debug({ url, request, response }, "[initiatePayment] jazzcash api raw response");

        const updatedCaseResponse = this.getCamelCase(response);

        log.debug({ url, request, response: updatedCaseResponse }, "[initiatePayment] jazzcash api formatted response");

        const jazzcashOnetimeTransactions = await JazzcashOnetimeTransactions.query().insertAndFetch(updatedCaseResponse);

        if (!(["000", "124", "157"].includes(updatedCaseResponse.responseCode))) {
            throw new ErrorData(updatedCaseResponse.responseMessage, updatedCaseResponse);
        }

        log.info({ response: jazzcashOnetimeTransactions }, "[initiatePayment] api response");
        return jazzcashOnetimeTransactions;
    }

    async paymentInquiry(payload) {
        const { trxId } = payload;

        log.info({ request: payload }, "[paymentInquiry] api request");

        const url = `${JAZZCASH_API_URL}/ApplicationAPI/API/PaymentInquiry/Inquire`;
        const request = {
            pp_MerchantID: JAZZCASH_MERCHANT_ID,
            pp_Password: JAZZCASH_PASSWORD,
            pp_TxnRefNo: trxId
        };

        request.pp_SecureHash = this.genSecureHash(request);

        log.debug({ url, request }, "[paymentInquiry] jazzcash api request");

        const { data: response } = await axios.post(url, request, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        log.debug({ url, request, response }, "[paymentInquiry] jazzcash api raw response");

        const updatedCaseResponse = this.getCamelCase(response);

        log.debug({ url, request, response: updatedCaseResponse }, "[paymentInquiry] jazzcash api formatted response");

        if (!(["000", "124", "157"].includes(updatedCaseResponse.responseCode))) {
            throw new ErrorData(updatedCaseResponse.responseMessage, updatedCaseResponse);
        }

        log.info({ response: updatedCaseResponse }, "[paymentInquiry] api response");
        return updatedCaseResponse;
    }

    async recurringPayment(payload) {
        const { paymentToken, amount, trxId } = payload;

        log.info({ request: payload }, "[recurringPayment] api request");

        const startTime = moment().format("YYYYMMDDHHmmss");
        const expireTime = moment().add(5, "minutes").format("YYYYMMDDHHmmss");

        const amountInPaisa = amount * 100;

        const url = `${JAZZCASH_API_URL}/ApplicationAPI/API/4.0/purchase/domwallettransactionviatoken`;

        const request = {
            pp_MerchantID: JAZZCASH_MERCHANT_ID,
            pp_SubMerchantID: "",
            pp_Password: JAZZCASH_PASSWORD,
            pp_PaymentToken: paymentToken,
            pp_TxnRefNo: trxId,
            pp_Amount: amountInPaisa,
            pp_TxnCurrency: "PKR",
            pp_TxnDateTime: startTime,
            pp_BillReference: "billRef",
            pp_Description: "Description",
            pp_TxnExpiryDateTime: expireTime,
            pp_DiscountedAmount: "",
            ppmpf_1: "",
            ppmpf_2: "",
            ppmpf_3: "",
            ppmpf_4: "",
            ppmpf_5: ""
        };

        request.pp_SecureHash = this.genSecureHash(request);

        log.debug({ url, request }, "[recurringPayment] recurringPayment api request");
        const { data: response } = await axios.post(url, request, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        log.debug({ url, request, response }, "[recurringPayment] jazzcash api raw response");

        const updatedCaseResponse = this.getCamelCase(response);

        log.debug({ url, request, response: updatedCaseResponse }, "[recurringPayment] recurringPayment api formatted response");

        const dbResponse = await JazzcashRecurringTransactions.query().insertAndFetch(updatedCaseResponse);

        log.debug({ response: dbResponse }, "[recurringPayment] recurringPayment db response");

        if (!(["000", "124", "157"].includes(updatedCaseResponse.responseCode))) {
            throw new ErrorData(updatedCaseResponse.responseMessage, updatedCaseResponse);
        }

        log.info({ url, request, response: dbResponse }, "[recurringPayment] api response");
        return dbResponse;
    }

    async paymentResponse(payload = {}) {
        const requestPayload = payload;

        log.info({ request: requestPayload }, "[paymentResponse] api request");

        payload = this.getCamelCase(payload);

        log.debug({ request: payload }, "[paymentResponse] api formatted request");

        const { msisdn, paymentToken, responseCode, responseMessage, requestId } = payload;

        if (!(["000", "124", "157"].includes(responseCode))) {
            throw new ErrorData(responseMessage, payload);
        }

        await JazzcashUserWalletTransactions.query().insertAndFetch(payload);

        const foundUserAccounts = await JazzcashUserWallets.query().where({ msisdn }).first();
        if (foundUserAccounts) {
            const data = await foundUserAccounts.$query().patchAndFetch({ msisdn, requestId, paymentToken });
            return data;
        }

        const data = await JazzcashUserWallets.query().insert({ msisdn, requestId, paymentToken });

        log.info({ response: data }, "[paymentResponse] api response");
        return data;
    }

    async requestLinkWallet(payload) {
        const { msisdn } = payload;

        log.info({ response: payload }, "[requestLinkWallet] api request");

        const response = {
            pp_MSISDN: msisdn,
            pp_MerchantID: JAZZCASH_MERCHANT_ID,
            pp_Password: JAZZCASH_PASSWORD,
            pp_RequestID: `T${moment().format("YYYYMMDDHHmmss")}`,
            pp_ReturnURL: JAZZCASH_RETURN_URL
        };

        response.pp_SecureHash = this.genSecureHash(response);

        log.info({ response }, "[requestLinkWallet] api response");

        return response;
    }
}

module.exports = new service();
