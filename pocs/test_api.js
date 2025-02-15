const axios = require("axios");
const crypto = require("crypto");

// Configure your JazzCash parameters here
const CONFIG = {
    merchantId: "YOUR_MERCHANT_ID",
    password: "YOUR_PASSWORD",
    integritySalt: "YOUR_INTEGRITY_SALT",
    baseUrl: "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/TransactionRequest" // Use sandbox URL for testing
};

function generateSecureHash(params) {
    const sortedKeys = Object.keys(params).sort();
    let stringToHash = CONFIG.integritySalt;
    sortedKeys.forEach((key) => {
        stringToHash += `&${params[key]}`;
    });
    return crypto.createHash("sha256").update(stringToHash).digest("hex");
}

async function makePayment(paymentData) {
    // Prepare request payload
    const requestPayload = {
        merchantId: CONFIG.merchantId,
        password: CONFIG.password,
        // Add required parameters
        amount: paymentData.amount,
        pp_TxnDateTime: new Date().toISOString().replace(/[-:TZ]/g, "").substring(0, 14),
        pp_TxnRefNo: `T${Date.now()}`,
        pp_Language: "EN",
        pp_TxnType: "MWALLET", // Transaction type can vary; for example, 'MWALLET' (Mobile Wallet)
        pp_Version: "2.0",
        pp_ReturnURL: paymentData.returnUrl,
        pp_Subscription: "Y", // Use 'Y' for recurring subscriptions
        pp_BillReference: paymentData.billReference || "RecurringPayment",
        pp_Description: paymentData.description || "Recurring Charge"
    };

    // Generate secure hash
    requestPayload.pp_SecureHash = generateSecureHash(requestPayload);

    try {
        // Send payment request to JazzCash
        const response = await axios.post(CONFIG.baseUrl, requestPayload);
        return response.data;
    } catch (error) {
        console.error("Payment request failed:", error.message);
        throw error;
    }
}

// Example usage:
(async () => {
    try {
        const paymentResponse = await makePayment({
            amount: "1000", // Payment amount
            returnUrl: "https://yourdomain.com/payment-callback", // Your return/callback URL
            description: "Monthly Subscription"
        });
        console.log("Payment response:", paymentResponse);
    } catch (error) {
        console.error("Error in making payment:", error);
    }
})();
