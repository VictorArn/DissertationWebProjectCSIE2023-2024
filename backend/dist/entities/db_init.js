"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promise_js_1 = __importDefault(require("mysql2/promise.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var Professor_1 = __importDefault(require("./Professor"));
var Request_1 = __importDefault(require("./Request"));
var Session_1 = __importDefault(require("./Session"));
var Student_1 = __importDefault(require("./Student"));
dotenv_1.default.config();
function createDatabase() {
    promise_js_1.default.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    })
        .then(function (connection) {
        return connection.query("CREATE DATABASE IF NOT EXISTS ".concat(process.env.DB_DATABASE));
    })
        .catch(function (err) {
        console.warn(err.stack);
    });
}
function fkConfig() {
    //     Student.hasMany(Teacher, {as : Teacher, foreignKey: "StudentId"});
    //     Teacher.belongsTo(Student, { foreignKey: "StudentId"})    
    Professor_1.default.hasMany(Session_1.default, { as: "Sessions", foreignKey: "ProfessorId" });
    Session_1.default.belongsTo(Professor_1.default, { foreignKey: "ProfessorId" });
    Student_1.default.hasMany(Request_1.default, { as: "Requests", foreignKey: "StudentId" });
    Request_1.default.belongsTo(Student_1.default, { foreignKey: "StudentId" });
    Professor_1.default.hasMany(Request_1.default, { as: "Requests", foreignKey: "ProfessorId" });
    Request_1.default.belongsTo(Student_1.default, { foreignKey: "ProfessorId" });
}
function db_init() {
    createDatabase();
    fkConfig();
}
exports.default = db_init;
