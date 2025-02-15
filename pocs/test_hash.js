const crypto = require("crypto");
const salt = "0F5DD14AE2";

const payload = {
    pp_MerchantID: "MER123",
    pp_OrderInfo: "A48cvE28",
    pp_Amount: 2995
};
function genSecureHash(payload) {
    // !["pp_TxnType", "pp_Version"].includes(key)
    const hash = `${salt}&${Object.keys(payload)
        .sort()
        .filter((key) => !!payload[key])
        .map((key) => payload[key])
        .join("&")}`;
    console.log({ hash }, "hash");
    const secureHash = crypto.createHmac("sha256", salt).update(Buffer.from(hash, "utf-8")).digest("hex");
    console.log({ hash, secureHash }, "genSecureHash");
    return secureHash;
}

console.log(genSecureHash(payload));

// hash ust be c7689cda7474eb1adcd343fd0c0b676bad0ba66361cc46db589bdb0da4c1c867
