-- Create leads table
DROP TABLE IF EXISTS leads;
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    email VARCHAR(255),
    cellno VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    language VARCHAR(255),
    system_type VARCHAR(255),
    units INT,
    bill_amount INT,
    total_area INT,
    bill_type VARCHAR(255),
    bill_image VARCHAR(255),
    agent_id UUID REFERENCES users(id),
    status VARCHAR(255) CHECK (status IN ('New Inquiry', 'Qualified Prospect', 'Referral Lead', 'Meeting Scheduled', 'Proposal Sent', 'In Negotiation', 'Closed - Won', 'Closed - Lost')),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(255) UNIQUE NOT NULL
);

-- Insert predefined roles
INSERT INTO roles (role_name) VALUES ('agent'), ('admin');

-- Create users table
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id UUID REFERENCES roles(id),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
