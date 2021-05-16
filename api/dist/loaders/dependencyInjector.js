"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const db_1 = require("./db");
const dbConnection = typedi_1.Container.get(db_1.DbConnection);
exports.default = () => {
    const connection = dbConnection.getConnection();
    typedi_1.Container.set("dbConnection", connection);
};
//# sourceMappingURL=dependencyInjector.js.map