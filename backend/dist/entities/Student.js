"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_js_1 = __importDefault(require("../dbConfig.js"));
var sequelize_1 = __importDefault(require("sequelize"));
var Student = dbConfig_js_1.default.define("Student", {
    StudentId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StudentFirstName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    StudentLastName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    StudentYear: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
});
exports.default = Student;
