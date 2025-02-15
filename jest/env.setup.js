process.env = {
    GLOBAL_CONFIG: "test",
    OAUTH_CONFIG: "test",
    GMLC_CONFIG: "test",
    NODE_ENV: "test",
    TENANT: "test"
};

const mockKnex = require("mock-knex");
const knex = require("knex");
const db = knex({ client: "pg" });

// mockKnex.mock(db);

const data = require("jest-extended");
expect.extend(data);
