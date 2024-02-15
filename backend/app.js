"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv_1 = require("dotenv");
var connection_1 = require("./utils/connection");
var express_graphql_1 = require("express-graphql");
var handlers_1 = require("./handlers/handlers");
(0, dotenv_1.config)();
var app = express();
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({ schema: handlers_1.default, graphiql: true }));
(0, connection_1.connectToDatabase)().then(function () {
    app.listen(process.env.PORT, function () { return console.log("Server open on port : ".concat(process.env.PORT)); });
}).catch(function (err) { return console.log(err); });
