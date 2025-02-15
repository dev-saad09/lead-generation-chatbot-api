DROP TABLE IF EXISTS jazzcash_merchant_accounts;
CREATE TABLE IF NOT EXISTS jazzcash_merchant_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    salt VARCHAR(255),
    return_url VARCHAR(255),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP
);

DROP TABLE IF EXISTS jazzcash_user_wallets;
CREATE TABLE IF NOT EXISTS jazzcash_user_wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    msisdn VARCHAR(255) UNIQUE,
    request_id VARCHAR(255),
    payment_token VARCHAR(255),
    cnic VARCHAR(255),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP
);

DROP TABLE IF EXISTS jazzcash_user_wallet_transactions;
CREATE TABLE IF NOT EXISTS jazzcash_user_wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    msisdn VARCHAR(255),
    response_code VARCHAR(255),
    response_message VARCHAR(255),
    payment_token VARCHAR(255),
    merchant_id VARCHAR(255),
    secure_hash VARCHAR(255),
    request_id VARCHAR(255),
    return_url VARCHAR(255),
    cnic VARCHAR(255),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP
);

DROP TABLE IF EXISTS jazzcash_onetime_transactions;
CREATE TABLE IF NOT EXISTS jazzcash_onetime_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    txn_type VARCHAR(255),
    version VARCHAR(255),
    amount VARCHAR(255),
    auth_code VARCHAR(255),
    bill_reference VARCHAR(255),
    language VARCHAR(255),
    merchant_id VARCHAR(255),
    response_code VARCHAR(255),
    response_message VARCHAR(255),
    retreival_reference_no VARCHAR(255),
    sub_merchant_id VARCHAR(255),
    txn_currency VARCHAR(255),
    txn_date_time VARCHAR(255),
    txn_ref_no VARCHAR(255),
    mobile_number VARCHAR(255),
    cnic VARCHAR(255),
    discounted_amount VARCHAR(255),
    ppmpf1 VARCHAR(255),
    ppmpf2 VARCHAR(255),
    ppmpf3 VARCHAR(255),
    ppmpf4 VARCHAR(255),
    ppmpf5 VARCHAR(255),
    secure_hash VARCHAR(255),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP
);

DROP TABLE IF EXISTS jazzcash_recurring_transactions;
CREATE TABLE IF NOT EXISTS jazzcash_recurring_transactions ( 
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    response_code VARCHAR(255),
    response_message VARCHAR(255),
    amount VARCHAR(255),
    retreival_reference_no VARCHAR(255),
    txn_ref_no VARCHAR(255),
    payment_token VARCHAR(255),
    discounted_amount VARCHAR(255),
    secure_hash VARCHAR(255),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP
);
