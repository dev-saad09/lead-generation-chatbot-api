DROP TABLE IF EXISTS leads;
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    salt VARCHAR(255),
    return_url VARCHAR(255),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP
);
tables
leads
users
roles


cellno
name
email
address
city
language
system_type
units
bill_amount
total_area
agent_id
