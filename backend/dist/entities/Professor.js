"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __importDefault(require("../dbConfig"));
var sequelize_1 = __importDefault(require("sequelize"));
var Professor = dbConfig_1.default.define("Professor", {
    ProfessorId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ProfessorName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    ProfessorEmail: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
});
exports.default = Professor;
