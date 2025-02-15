"use strict";

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const expressErrorMiddleware = require("./middlewares/expressError.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const { engine: expressHandlebars } = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const responseTime = require("response-time");
const routes = require("./routes");
const { REQUEST_BODY_SIZE_LIMIT, API_NAME = "jazzcash-payment-api" } = process.env;

app

    .disable("x-powered-by")
    .engine("handlebars", expressHandlebars())
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "handlebars")
    .set("trust proxy", 1)
    .use(responseTime())
    .use((req, res, next) => { req.currentTime = Date.now(); next(); })
    .use(errorMiddleware())
    .use(helmet.frameguard())
    .use(helmet.hidePoweredBy())
    .use(helmet.noSniff())
    .use(helmet.referrerPolicy())
    .use(helmet.xssFilter())
    .use(helmet.dnsPrefetchControl())
    .use(cors({ origin: "*" }))
    .use(morgan("[:date] :remote-addr :method :url :response-time ms - :status"))
    .use(bodyParser.urlencoded({ limit: REQUEST_BODY_SIZE_LIMIT, extended: false }))
    .use(bodyParser.json({ limit: REQUEST_BODY_SIZE_LIMIT }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, "public")))
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
    .use("/", routes)
    .use(`/${API_NAME}`, routes)
    .use(expressErrorMiddleware());

module.exports = app;
